import { Module } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { SupabaseStorageService } from '@/storage/supabase-storage.service';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AuthModule } from '@/auth/auth.module';

// Placeholder: Admin module for administrative operations
// Implementation includes:
// - Product management
// - Order management
// - User management
// - System settings

@Module({
  imports: [AuthModule],
  controllers: [AdminController],
  providers: [AdminService, PrismaService, SupabaseStorageService],
})
export class AdminModule {}
