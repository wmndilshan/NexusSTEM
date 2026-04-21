import { IsString, IsUrl } from 'class-validator';

export class SubmitBankTransferDto {
  @IsString()
  orderId!: string;

  @IsString()
  bankName!: string;

  @IsString()
  transferReference!: string;

  @IsUrl()
  proofFileUrl!: string;
}
