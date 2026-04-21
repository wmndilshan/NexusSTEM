import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getOrCreateCart(userId: string) {
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
        include: {
          items: {
            include: { product: true },
          },
        },
      });
    }

    return this.calculateCartTotals(cart);
  }

  async getCart(userId: string) {
    const cart = await this.getOrCreateCart(userId);
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  async addItem(userId: string, dto: AddToCartDto) {
    const cart = await this.getOrCreateCart(userId);
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.stockQty <= 0 && !product.preorderEnabled) {
      throw new BadRequestException('Product is out of stock');
    }

    let unitPrice = product.basePriceLkr;
    if (dto.pricingType === 'B2B') {
      if (!product.b2bPriceLkr) {
        throw new BadRequestException('B2B pricing not available for this product');
      }
      unitPrice = product.b2bPriceLkr;
    }

    const existingItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: dto.productId,
        },
      },
    });

    if (existingItem) {
      return this.updateItem(userId, existingItem.id, {
        quantity: existingItem.quantity + dto.quantity,
      });
    }

    const newItem = await this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: dto.productId,
        quantity: dto.quantity,
        unitPriceLkr: unitPrice,
        pricingType: dto.pricingType || 'RETAIL',
      },
      include: { product: true },
    });

    return newItem;
  }

  async updateItem(userId: string, itemId: string, dto: UpdateCartItemDto) {
    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { cart: true, product: true },
    });

    if (!cartItem || cartItem.cart.userId !== userId) {
      throw new NotFoundException('Cart item not found');
    }

    if (dto.quantity <= 0) {
      return this.removeItem(userId, itemId);
    }

    return this.prisma.cartItem.update({
      where: { id: itemId },
      data: {
        quantity: dto.quantity,
      },
      include: { product: true },
    });
  }

  async removeItem(userId: string, itemId: string) {
    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { cart: true },
    });

    if (!cartItem || cartItem.cart.userId !== userId) {
      throw new NotFoundException('Cart item not found');
    }

    await this.prisma.cartItem.delete({
      where: { id: itemId },
    });

    return { success: true };
  }

  async clearCart(userId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return { success: true };
  }

  private calculateCartTotals(cart: any) {
    const subtotal = cart.items.reduce(
      (sum: number, item: any) => sum + item.unitPriceLkr * item.quantity,
      0,
    );

    return {
      ...cart,
      subtotal,
      tax: Math.round(subtotal * 0.05), // 5% VAT
      total: Math.round(subtotal * 1.05),
      itemCount: cart.items.length,
    };
  }
}
