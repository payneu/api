import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SafeLogger } from 'src/utils/logger';
import { CreateTokenDto } from './dto/create-token.dto';

@Injectable()
export class TokenRepository {
  private readonly logger = new SafeLogger(TokenRepository.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateTokenDto) {
    return await this.prismaService.token.create({
      data: data,
    });
  }
}
