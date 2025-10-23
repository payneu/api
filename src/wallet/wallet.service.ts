import { Injectable } from '@nestjs/common';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';

import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WalletRepository } from './wallet.repository';

@Injectable()
export class WalletService {
  constructor(private readonly walletRepository: WalletRepository) {}
  async create(createWalletDto: { owner_id: number }) {
    const privateKey = generatePrivateKey();
    const account = privateKeyToAccount(privateKey);

    await this.walletRepository.create({
      privateKey,
      publicKey: account.address,
      owner_id: createWalletDto.owner_id,
    });

    return 'This action adds a new wallet';
  }

  findAll() {
    return `This action returns all wallet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
