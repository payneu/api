import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  @ApiOperation({ operationId: 'createInvoice' })
  createInvoice(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(createInvoiceDto);
  }

  @Get()
  @ApiOperation({ operationId: 'findAllInvoice' })
  async findAll() {
    return await this.invoiceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ operationId: 'findInvoiceById' })
  findInvoiceById(@Param('id') id: string) {
    return this.invoiceService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
  //   return this.invoiceService.update(+id, updateInvoiceDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.invoiceService.remove(+id);
  // }
}
