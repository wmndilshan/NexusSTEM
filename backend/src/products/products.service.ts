import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma, ProductStatus } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BusinessException } from '@/common/exceptions/business.exception';
import { SupabaseStorageService } from '@/storage/supabase-storage.service';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private storage: SupabaseStorageService,
  ) {}

  async findAll(categoryId?: string, skip = 0, take = 20) {
    const where: Prisma.ProductWhereInput = {
      status: ProductStatus.ACTIVE,
      ...(categoryId && { categoryId }),
    };

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take,
        include: {
          category: true,
          images: { orderBy: { sortOrder: 'asc' } },
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data: products,
      pagination: {
        total,
        skip,
        take,
        hasMore: skip + take < total,
      },
    };
  }

  async findBySlug(slug: string, userRole?: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        images: { orderBy: { sortOrder: 'asc' } },
      },
    });

    if (!product || product.status !== ProductStatus.ACTIVE) {
      throw new NotFoundException('Product not found');
    }

    // Hide B2B pricing from non-B2B users
    if (userRole !== 'B2B_CUSTOMER' && userRole !== 'ADMIN') {
      product.b2bPriceLkr = null;
    }

    return product;
  }

  async findById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: { orderBy: { sortOrder: 'asc' } },
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async create(dto: CreateProductDto) {
    const category = await this.prisma.category.findUnique({
      where: { id: dto.categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const slug = dto.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');

    const existingProduct = await this.prisma.product.findUnique({
      where: { slug },
    });

    if (existingProduct) {
      throw new BusinessException('Product with this slug already exists', 'PRODUCT_SLUG_EXISTS');
    }

    return this.prisma.product.create({
      data: {
        name: dto.name,
        slug,
        description: dto.description,
        sku: dto.sku,
        categoryId: dto.categoryId,
        basePriceLkr: dto.basePriceLkr,
        b2bPriceLkr: dto.b2bPriceLkr,
        stockQty: dto.stockQty,
        preorderEnabled: dto.preorderEnabled || false,
        status: ProductStatus.ACTIVE,
      },
    });
  }

  async update(id: string, dto: UpdateProductDto) {
    const product = await this.findById(id);

    let slug = product.slug;
    if (dto.name && dto.name !== product.name) {
      slug = dto.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '');
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        ...dto,
        slug,
      },
    });
  }

  async updateStock(id: string, quantity: number) {
    return this.prisma.product.update({
      where: { id },
      data: {
        stockQty: {
          increment: quantity,
        },
      },
    });
  }

  async delete(id: string) {
    return this.prisma.product.update({
      where: { id },
      data: { status: ProductStatus.ARCHIVED },
    });
  }

  async uploadProductImage(
    productId: string,
    file: Express.Multer.File,
    sortOrder = 0,
    setAsFeatured = false,
  ) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      include: { images: true },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (!file) {
      throw new BadRequestException('Image file is required');
    }

    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Only image files are allowed');
    }

    const safeName = file.originalname
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, '-');
    const filePath = `products/${productId}/${Date.now()}-${safeName}`;

    const uploadResult = await this.storage.uploadFile(
      filePath,
      file.buffer,
      file.mimetype,
    );

    const image = await this.prisma.productImage.create({
      data: {
        productId,
        imageUrl: uploadResult.publicUrl,
        sortOrder,
      },
    });

    if (setAsFeatured || !product.featuredImageUrl) {
      await this.prisma.product.update({
        where: { id: productId },
        data: { featuredImageUrl: uploadResult.publicUrl },
      });
    }

    return image;
  }

  async search(query: string, take = 10) {
    return this.prisma.product.findMany({
      where: {
        status: ProductStatus.ACTIVE,
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { sku: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
      take,
      include: { category: true },
    });
  }
}
