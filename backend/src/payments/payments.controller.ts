import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { SubmitBankTransferDto } from './dto/submit-bank-transfer.dto';
import { VerifyBankTransferDto } from './dto/verify-bank-transfer.dto';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { CurrentUser } from '@/common/decorators/current-user.decorator';

@ApiTags('payments')
@Controller('payments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('bank-transfer/submit')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Submit bank transfer proof for order verification',
  })
  async submitBankTransfer(
    @CurrentUser() user: any,
    @Body() dto: SubmitBankTransferDto,
  ) {
    return this.paymentsService.submitBankTransfer(user.sub, dto);
  }

  @Get('bank-transfer/pending')
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'STAFF')
  @ApiOperation({ summary: 'Get pending bank transfer verifications (admin/staff only)' })
  async getPendingVerifications() {
    return this.paymentsService.getPendingVerifications();
  }

  @Patch('bank-transfer/:submissionId/verify')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Verify/reject bank transfer (admin only)' })
  async verifyBankTransfer(
    @Param('submissionId') submissionId: string,
    @Body() dto: VerifyBankTransferDto,
    @CurrentUser() user: any,
  ) {
    return this.paymentsService.verifyBankTransfer(submissionId, dto, user.sub);
  }
}
