import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { InvoiceRepository } from './invoice.repository';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [InvoiceController],
  providers: [InvoiceService, InvoiceRepository],
})
export class InvoiceModule {}
