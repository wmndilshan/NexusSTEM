import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from '@/database/prisma.service';
import { AuthModule } from '@/auth/auth.module';
import { SupabaseStorageService } from '@/storage/supabase-storage.service';

@Module({
  imports: [AuthModule],
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, SupabaseStorageService],
  exports: [ProductsService],
})
export class ProductsModule {}
