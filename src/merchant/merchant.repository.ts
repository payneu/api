import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SafeLogger } from 'src/utils/logger';
import { CreateMerchantDto } from './dto/create-merchant.dto';

@Injectable()
export class MerchantRepository {
  private readonly logger = new SafeLogger(MerchantRepository.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateMerchantDto) {
    return await this.prismaService.merchant.create({
      data: data,
    });
  }
}
