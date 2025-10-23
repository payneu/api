import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { PrismaModule } from 'src/prisma.module';
import { TokenRepository } from './token.repository';

@Module({
  imports: [PrismaModule],
  controllers: [TokenController],
  providers: [TokenService, TokenRepository],
})
export class TokenModule {}
