import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { CurrentUser } from '@/common/decorators/current-user.decorator';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active products with pagination' })
  @ApiQuery({ name: 'categoryId', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'take', required: false })
  async findAll(
    @Query('categoryId') categoryId?: string,
    @Query('skip') skip = 0,
    @Query('take') take = 20,
  ) {
    return this.productsService.findAll(categoryId, Number(skip), Number(take));
  }

  @Get('search')
  @ApiOperation({ summary: 'Search products by name, SKU, or description' })
  @ApiQuery({ name: 'q', required: true })
  async search(@Query('q') query: string) {
    return this.productsService.search(query);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get product by slug' })
  async findBySlug(
    @Param('slug') slug: string,
    @CurrentUser() user?: any,
  ) {
    return this.productsService.findBySlug(slug, user?.role);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'STAFF')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new product (admin/staff only)' })
  async create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Post(':id/images')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'STAFF')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Upload product image to Supabase Storage' })
  async uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('sortOrder') sortOrder?: string,
    @Body('setAsFeatured') setAsFeatured?: string,
  ) {
    return this.productsService.uploadProductImage(
      id,
      file,
      Number(sortOrder || 0),
      setAsFeatured === 'true',
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'STAFF')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update product (admin/staff only)' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete product (admin only)' })
  async delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
