import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PaymentMethod } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
import { SubmitBankTransferDto } from './dto/submit-bank-transfer.dto';
import { VerifyBankTransferDto } from './dto/verify-bank-transfer.dto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async submitBankTransfer(userId: string, dto: SubmitBankTransferDto) {
    // Verify order exists and belongs to user
    const order = await this.prisma.order.findUnique({
      where: { id: dto.orderId },
    });

    if (!order || order.userId !== userId) {
      throw new NotFoundException('Order not found');
    }

    if (order.paymentMethod !== 'BANK_TRANSFER') {
      throw new BadRequestException(
        'Order payment method is not bank transfer',
      );
    }

    if (order.paymentStatus !== 'PENDING') {
      throw new BadRequestException('Order payment is already being processed');
    }

    // Check if submission already exists
    const existing = await this.prisma.bankTransferSubmission.findUnique({
      where: { orderId: dto.orderId },
    });

    if (existing) {
      throw new BadRequestException('Bank transfer already submitted for this order');
    }

    // Create submission
    const submission = await this.prisma.bankTransferSubmission.create({
      data: {
        orderId: dto.orderId,
        bankName: dto.bankName,
        transferReference: dto.transferReference,
        proofFileUrl: dto.proofFileUrl,
        verificationStatus: 'PENDING',
      },
    });

    // Update order to AWAITING_VERIFICATION
    await this.prisma.order.update({
      where: { id: dto.orderId },
      data: { paymentStatus: 'AWAITING_VERIFICATION' },
    });

    return submission;
  }

  async verifyBankTransfer(
    submissionId: string,
    dto: VerifyBankTransferDto,
    adminId: string,
  ) {
    const submission = await this.prisma.bankTransferSubmission.findUnique({
      where: { id: submissionId },
      include: { order: true },
    });

    if (!submission) {
      throw new NotFoundException('Bank transfer submission not found');
    }

    if (submission.verificationStatus !== 'PENDING') {
      throw new BadRequestException(
        'Bank transfer already verified or rejected',
      );
    }

    let verificationStatus: 'APPROVED' | 'REJECTED';
    let paymentStatus: 'PAID' | 'FAILED';

    if (dto.approved) {
      verificationStatus = 'APPROVED';
      paymentStatus = 'PAID';
    } else {
      verificationStatus = 'REJECTED';
      paymentStatus = 'FAILED';
    }

    // Update submission
    const updated = await this.prisma.bankTransferSubmission.update({
      where: { id: submissionId },
      data: {
        verificationStatus,
        verifiedBy: adminId,
        verifiedAt: new Date(),
      },
    });

    // Update order payment status
    const order = await this.prisma.order.update({
      where: { id: submission.orderId },
      data: { paymentStatus },
    });

    // If approved, process inventory deduction
    if (dto.approved) {
      const orderItems = await this.prisma.orderItem.findMany({
        where: { orderId: submission.orderId },
      });

      for (const item of orderItems) {
        await this.prisma.inventoryAdjustment.create({
          data: {
            productId: item.productId,
            adjustmentType: 'ORDER',
            quantityDelta: -item.quantity,
            createdBy: adminId,
          },
        });

        await this.prisma.product.update({
          where: { id: item.productId },
          data: {
            stockQty: {
              decrement: item.quantity,
            },
          },
        });
      }
    }

    return { submission: updated, order };
  }

  async getPendingVerifications() {
    return this.prisma.bankTransferSubmission.findMany({
      where: { verificationStatus: 'PENDING' },
      include: {
        order: {
          include: {
            user: true,
            shippingAddress: true,
            items: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async recordPaymentTransaction(
    orderId: string,
    paymentMethod: PaymentMethod,
    providerReference: string,
    transactionStatus: string,
    amountLkr: number,
    providerPayload?: any,
  ) {
    return this.prisma.paymentTransaction.create({
      data: {
        orderId,
        paymentMethod,
        providerReference,
        providerPayload: providerPayload || {},
        transactionStatus,
        amountLkr,
      },
    });
  }
}
