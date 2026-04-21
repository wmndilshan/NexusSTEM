import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseStorageService {
  private client: SupabaseClient | null = null;
  private bucket: string;
  private missingConfig = false;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    this.bucket = process.env.SUPABASE_STORAGE_BUCKET || 'uploads';

    if (!supabaseUrl || !serviceRoleKey) {
      this.missingConfig = true;
      return;
    }

    this.client = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  async uploadFile(
    filePath: string,
    fileBuffer: Buffer,
    contentType: string,
  ): Promise<{ path: string; publicUrl: string }> {
    if (this.missingConfig || !this.client) {
      throw new BadRequestException(
        'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variable',
      );
    }

    const { data, error } = await this.client.storage
      .from(this.bucket)
      .upload(filePath, fileBuffer, {
        contentType,
        upsert: false,
      });

    if (error || !data) {
      throw new InternalServerErrorException(
        `Failed to upload file to storage: ${error?.message || 'Unknown error'}`,
      );
    }

    const { data: publicData } = this.client.storage
      .from(this.bucket)
      .getPublicUrl(data.path);

    return {
      path: data.path,
      publicUrl: publicData.publicUrl,
    };
  }
}
