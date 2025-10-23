import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { WalletRepository } from './wallet.repository';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [WalletController],
  providers: [WalletService, WalletRepository],
})
export class WalletModule {}
