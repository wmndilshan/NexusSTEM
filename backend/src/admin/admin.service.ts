import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { SupabaseStorageService } from '@/storage/supabase-storage.service';

const HERO_IMAGE_KEY = 'homepage.hero.image_url';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: SupabaseStorageService,
  ) {}

  async getHeroImageSetting() {
    const setting = await this.prisma.siteSetting.findUnique({
      where: { key: HERO_IMAGE_KEY },
    });

    return {
      heroImageUrl: setting?.value || null,
    };
  }

  async updateHeroImageUrl(heroImageUrl: string) {
    const setting = await this.prisma.siteSetting.upsert({
      where: { key: HERO_IMAGE_KEY },
      create: {
        key: HERO_IMAGE_KEY,
        value: heroImageUrl,
      },
      update: {
        value: heroImageUrl,
      },
    });

    return {
      heroImageUrl: setting.value,
      updatedAt: setting.updatedAt,
    };
  }

  async uploadHeroImage(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }

    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Only image files are allowed');
    }

    const safeName = file.originalname
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, '-');
    const filePath = `site/hero/${Date.now()}-${safeName}`;

    const uploaded = await this.storage.uploadFile(
      filePath,
      file.buffer,
      file.mimetype,
    );

    return this.updateHeroImageUrl(uploaded.publicUrl);
  }
}
