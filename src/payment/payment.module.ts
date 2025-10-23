import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PrismaModule } from 'src/prisma.module';
import { PaymentRepository } from './payment.repository';
import { InvoiceModule } from 'src/invoice/invoice.module';
import { InvoiceService } from 'src/invoice/invoice.service';
import { InvoiceRepository } from 'src/invoice/invoice.repository';

@Module({
  imports: [PrismaModule, InvoiceModule],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    PaymentRepository,
    InvoiceService,
    InvoiceRepository,
  ],
})
export class PaymentModule {}
