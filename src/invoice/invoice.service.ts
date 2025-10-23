import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InvoiceRepository } from './invoice.repository';

@Injectable()
export class InvoiceService {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}
  async create(createInvoiceDto: CreateInvoiceDto) {
    createInvoiceDto.status = 'open';
    return await this.invoiceRepository.create(createInvoiceDto);
  }

  async findAll() {
    return await this.invoiceRepository.findAll() 
  }

  async findOne(id: number) {
    return await this.invoiceRepository.findById(id);
  }

  async updateStatus(id: number, newStatus: string, txHash: string) {
    return await this.invoiceRepository.updateStatus(id, newStatus, txHash);
  }

  remove(id: number) {
    return `This action removes a #${id} invoice`;
  }
}
