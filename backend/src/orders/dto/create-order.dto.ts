import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ShippingAddressDto {
  @IsString()
  fullName!: string;

  @IsString()
  phone!: string;

  @IsString()
  address_line_1!: string;

  @IsString()
  address_line_2?: string;

  @IsString()
  city!: string;

  @IsString()
  district!: string;

  @IsString()
  postalCode!: string;
}

export class CreateOrderDto {
  @ValidateNested()
  @Type(() => ShippingAddressDto)
  shippingAddress!: ShippingAddressDto;
}
