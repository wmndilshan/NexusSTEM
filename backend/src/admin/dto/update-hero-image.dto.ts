import { IsString, IsUrl } from 'class-validator';

export class UpdateHeroImageDto {
  @IsString()
  @IsUrl()
  heroImageUrl!: string;
}
