import { IsBoolean } from 'class-validator';

export class VerifyBankTransferDto {
  @IsBoolean()
  approved!: boolean;
}
