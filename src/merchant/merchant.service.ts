import { Injectable } from '@nestjs/common';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { MerchantRepository } from './merchant.repository';
import { WalletService } from 'src/wallet/wallet.service';

@Injectable()
export class MerchantService {
  constructor(
    private readonly merchantRepository: MerchantRepository,
    private readonly walletService: WalletService,
  ) {}
  async create(data: CreateMerchantDto) {
    const newMerchant = await this.merchantRepository.create(data);

    // create wallet for merchant
    await this.walletService.create({ owner_id: newMerchant.id });
    return newMerchant;
  }

  findAll() {
    return `This action returns all merchant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} merchant`;
  }

  update(id: number, updateMerchantDto: UpdateMerchantDto) {
    return `This action updates a #${id} merchant`;
  }

  remove(id: number) {
    return `This action removes a #${id} merchant`;
  }
}
