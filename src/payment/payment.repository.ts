import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SafeLogger } from 'src/utils/logger';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentRepository {
  private readonly logger = new SafeLogger(PaymentRepository.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreatePaymentDto) {
    return await this.prismaService.payment.create({
      data: data,
    });
  }
}
