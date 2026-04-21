import { IsOptional, IsEnum } from 'class-validator';
import { PaymentStatus, FulfillmentStatus } from '@prisma/client';

export class UpdateOrderStatusDto {
  @IsOptional()
  @IsEnum(PaymentStatus)
  paymentStatus?: Exclude<PaymentStatus, 'PENDING'>;

  @IsOptional()
  @IsEnum(FulfillmentStatus)
  fulfillmentStatus?: Exclude<FulfillmentStatus, 'PENDING'>;
}
