import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SafeLogger } from 'src/utils/logger';
import { CreateWalletDto } from './dto/create-wallet.dto';

@Injectable()
export class WalletRepository {
  private readonly logger = new SafeLogger(WalletRepository.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateWalletDto) {
    return await this.prismaService.wallet.create({
      data: data,
    });
  }
}
