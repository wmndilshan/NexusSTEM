import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  MinLength,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsString()
  @MinLength(3)
  sku!: string;

  @IsString()
  description!: string;

  @IsString()
  categoryId!: string;

  @IsNumber()
  @Min(0)
  basePriceLkr!: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  b2bPriceLkr?: number;

  @IsNumber()
  @Min(0)
  stockQty!: number;

  @IsOptional()
  @IsBoolean()
  preorderEnabled?: boolean;
}
