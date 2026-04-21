import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.category.findUnique({
      where: { slug },
      include: {
        products: {
          where: { status: 'ACTIVE' },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async create(dto: CreateCategoryDto) {
    const slug = dto.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');

    return this.prisma.category.create({
      data: {
        name: dto.name,
        slug,
        description: dto.description,
      },
    });
  }

  async update(id: string, dto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string) {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
