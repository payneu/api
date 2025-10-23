import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('/status')
  @ApiOperation({ operationId: 'checkPayerStatus' })
  async checkPayerStatus(
    @Query('address') address: string,
    @Query('invoiceId') invoiceId: number,
  ) {
    return await this.paymentService.checkPayerStatus(address, invoiceId);
  }

  @Post('/invoice')
  @ApiOperation({ operationId: 'sendInvoicePayment' })
  async sendInvoicePayment(
    @Query('payer') payer: `0x${string}`,
    @Query('invoiceId') invoiceId: number,
  ) {
    return await this.paymentService.sendInvoicePayment(payer, invoiceId);
  }

  @Post('/asset')
  @ApiOperation({ operationId: 'convertThenSendStable' })
  async convertThenSendStable(
    @Query('payer') payer: `0x${string}`,
    @Query('invoiceId') invoiceId: number,
    @Query('assetAddress') assetAddress: `0x${string}`,
  ) {
    return await this.paymentService.convertThenSendStable(
      payer,
      invoiceId,
      assetAddress,
    );
  }

  // @Post()
  // create(@Body() createPaymentDto: CreatePaymentDto) {
  //   return this.paymentService.create(createPaymentDto);
  // }

  // @Get()
  // findAll() {
  //   return this.paymentService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.paymentService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
  //   return this.paymentService.update(+id, updatePaymentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.paymentService.remove(+id);
  // }
}
