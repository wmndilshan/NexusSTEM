import { BadRequestException } from '@nestjs/common';

export class BusinessException extends BadRequestException {
  constructor(message: string, code?: string) {
    super({
      message,
      code,
      timestamp: new Date().toISOString(),
    });
  }
}
