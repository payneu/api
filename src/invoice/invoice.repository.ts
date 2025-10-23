import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SafeLogger } from 'src/utils/logger';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Injectable()
export class InvoiceRepository {
  private readonly logger = new SafeLogger(InvoiceRepository.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateInvoiceDto) {
    return await this.prismaService.invoice.create({
      data: { ...data, paymentTxHash: '' },
    });
  }

  async findAll() {
    return await this.prismaService.invoice.findMany({});
  }

  async findById(id: number) {
    return await this.prismaService.invoice.findFirst({
      where: {
        id,
      },
      include: {
        token: true,
        merchant: {
          include: {
            Wallet: true,
          },
        },
      },
    });
  }

  async updateStatus(id: number, newStatus: string, txHash: string) {
    return await this.prismaService.invoice.update({
      where: {
        id,
      },
      data: {
        status: newStatus,
        paymentTxHash: txHash,
      },
    });
  }
}
