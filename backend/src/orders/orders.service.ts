import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma, PaymentStatus, FulfillmentStatus, PaymentMethod } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { BusinessException } from '@/common/exceptions/business.exception';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId?: string, skip = 0, take = 20) {
    const where = userId ? { userId } : {};

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        include: {
          items: { include: { product: true } },
          shippingAddress: true,
          paymentTransactions: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      this.prisma.order.count({ where }),
    ]);

    return {
      data: orders,
      pagination: {
        total,
        skip,
        take,
        hasMore: skip + take < total,
      },
    };
  }

  async findById(id: string, userId?: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: { include: { product: true } },
        shippingAddress: true,
        paymentTransactions: true,
        bankTransferSubmission: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (userId && order.userId !== userId) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async createOrderFromCart(userId: string, dto: CreateOrderDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { b2bAccount: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Get cart
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    // Calculate totals
    const subtotal = cart.items.reduce(
      (sum, item) => sum + item.unitPriceLkr * item.quantity,
      0,
    );

    const deliveryFeeLkr = 400;
    const total = subtotal + deliveryFeeLkr;

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create order with items
    const order = await this.prisma.order.create({
      data: {
        orderNumber,
        userId,
        customerType: user.b2bAccount ? 'B2B' : 'RETAIL',
        ...(user.b2bAccount ? { b2bAccountId: user.b2bAccount.id } : {}),
        paymentMethod: PaymentMethod.BANK_TRANSFER,
        paymentStatus: 'PENDING',
        fulfillmentStatus: 'PENDING',
        subtotalLkr: subtotal,
        deliveryFeeLkr,
        totalLkr: total,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            productNameSnapshot: item.product.name,
            skuSnapshot: item.product.sku,
            quantity: item.quantity,
            unitPriceLkr: item.unitPriceLkr,
            lineTotalLkr: item.unitPriceLkr * item.quantity,
          })),
        },
        shippingAddress: {
          create: {
            fullName: dto.shippingAddress.fullName,
            phone: dto.shippingAddress.phone,
            addressLine1: dto.shippingAddress.address_line_1,
            addressLine2: dto.shippingAddress.address_line_2,
            city: dto.shippingAddress.city,
            district: dto.shippingAddress.district,
            postalCode: dto.shippingAddress.postalCode,
          },
        },
      },
      include: {
        items: true,
        shippingAddress: true,
      },
    });

    // Clear cart
    await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return order;
  }

  async updatePaymentStatus(
    orderId: string,
    paymentStatus: Exclude<PaymentStatus, 'PENDING'>,
  ) {
    const order = await this.findById(orderId);

    const updated = await this.prisma.order.update({
      where: { id: orderId },
      data: { paymentStatus },
      include: {
        items: true,
        shippingAddress: true,
      },
    });

    // If payment is confirmed (PAID), decrement inventory
    if (paymentStatus === 'PAID') {
      for (const item of order.items) {
        await this.prisma.inventoryAdjustment.create({
          data: {
            productId: item.productId,
            adjustmentType: 'ORDER',
            quantityDelta: -item.quantity,
            createdBy: 'SYSTEM',
          },
        });

        await this.prisma.product.update({
          where: { id: item.productId },
          data: {
            stockQty: {
              decrement: item.quantity,
            },
          },
        });
      }
    }

    return updated;
  }

  async updateFulfillmentStatus(
    orderId: string,
    fulfillmentStatus: Exclude<FulfillmentStatus, 'PENDING'>,
  ) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { fulfillmentStatus },
      include: {
        items: true,
        shippingAddress: true,
      },
    });
  }

  async updateOrderStatus(orderId: string, dto: UpdateOrderStatusDto) {
    if (dto.paymentStatus) {
      return this.updatePaymentStatus(orderId, dto.paymentStatus);
    }

    if (dto.fulfillmentStatus) {
      return this.updateFulfillmentStatus(orderId, dto.fulfillmentStatus);
    }

    throw new BadRequestException('No status provided');
  }

  async getOrdersByStatus(status: string) {
    return this.prisma.order.findMany({
      where: {
        OR: [
          { paymentStatus: status as any },
          { fulfillmentStatus: status as any },
        ],
      },
      include: {
        items: true,
        shippingAddress: true,
      },
    });
  }
}
