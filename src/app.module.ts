import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MerchantModule } from './merchant/merchant.module';
import { PaymentModule } from './payment/payment.module';
import { WalletModule } from './wallet/wallet.module';
import { TokenModule } from './token/token.module';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [
    MerchantModule,
    PaymentModule,
    WalletModule,
    InvoiceModule,
    TokenModule,
    InvoiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
