import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { TokenRepository } from './token.repository';
import { parseEther } from 'viem';
import { publicClient } from 'src/utils/rpc-client/public-client';
import { erc20ABI } from 'src/utils/erc20/erc20-abi';
import { walletClient } from 'src/utils/rpc-client/wallet-client';
const { PAYMENT_CONTRACT, WALLET_ADMIN, PUBKEY_ADMIN, TOKEN_BAZED } =
  process.env;
@Injectable()
export class TokenService {
  constructor(private readonly tokenRepository: TokenRepository) {}
  async create(createTokenDto: CreateTokenDto) {
    return await this.tokenRepository.create(createTokenDto);
    // return 'This action adds a new token';
  }

  async mintTokens(
    to: `0x${string}`,
    amount: number,
    tokenAddress: `0x${string}`,
  ) {
    const pubClient = publicClient('https://sepolia.base.org');
    const adminSigner = walletClient(
      'https://sepolia.base.org',
      WALLET_ADMIN as `0x${string}`,
    );
    const args = [to, parseEther(`${amount}`)];

    const { result, request } = await pubClient.simulateContract({
      address: tokenAddress,
      abi: erc20ABI,
      functionName: 'mint',
      args,
      account: adminSigner.account,
    });
    console.log('simulate', { result })
    const hash = await adminSigner.writeContract(request);
    console.log(hash);
    return hash;
  }

  findAll() {
    return `This action returns all token`;
  }

  findOne(id: number) {
    return `This action returns a #${id} token`;
  }

  update(id: number, updateTokenDto: UpdateTokenDto) {
    return `This action updates a #${id} token`;
  }

  remove(id: number) {
    return `This action removes a #${id} token`;
  }
}
