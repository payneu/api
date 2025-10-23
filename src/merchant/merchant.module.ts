import { Module } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { MerchantController } from './merchant.controller';
import { PrismaModule } from 'src/prisma.module';
import { MerchantRepository } from './merchant.repository';
import { WalletModule } from 'src/wallet/wallet.module';
import { WalletService } from 'src/wallet/wallet.service';
import { WalletRepository } from 'src/wallet/wallet.repository';

@Module({
  imports: [PrismaModule, WalletModule],
  controllers: [MerchantController],
  providers: [
    MerchantService,
    MerchantRepository,
    WalletService,
    WalletRepository,
  ],
})
export class MerchantModule {}
