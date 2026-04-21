import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminService } from './admin.service';
import { UpdateHeroImageDto } from './dto/update-hero-image.dto';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';

@ApiTags('site-settings')
@Controller('site-settings')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('hero')
  @ApiOperation({ summary: 'Get homepage hero image setting (public)' })
  async getHeroSetting() {
    return this.adminService.getHeroImageSetting();
  }

  @Put('hero')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'STAFF')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update homepage hero image URL (admin/staff)' })
  async updateHeroSetting(@Body() dto: UpdateHeroImageDto) {
    return this.adminService.updateHeroImageUrl(dto.heroImageUrl);
  }

  @Post('hero/upload')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'STAFF')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 8 * 1024 * 1024 },
    }),
  )
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Upload hero image to Supabase Storage (admin/staff)' })
  async uploadHeroImage(@UploadedFile() file: Express.Multer.File) {
    return this.adminService.uploadHeroImage(file);
  }
}
