import { Module } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';

// Placeholder: Admin module for administrative operations
// Implementation includes:
// - Product management
// - Order management
// - User management
// - System settings

@Module({
  providers: [PrismaService],
})
export class AdminModule {}
