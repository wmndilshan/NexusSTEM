import { IsString, IsNumber, IsEnum, Min } from 'class-validator';
import { PricingType } from '@prisma/client';

export class AddToCartDto {
  @IsString()
  productId!: string;

  @IsNumber()
  @Min(1)
  quantity!: number;

  @IsEnum(PricingType)
  pricingType?: PricingType;
}
