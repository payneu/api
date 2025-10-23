import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post()
  @ApiOperation({ operationId: 'createToken' })
  async createToken(@Body() createTokenDto: CreateTokenDto) {
    return await this.tokenService.create(createTokenDto);
  }

  @Post('/faucet')
  @ApiOperation({ operationId: 'mintToken' })
  async mintToken(
    @Query('to') to: `0x${string}`,
    @Query('amount') amount: number,
    @Query('tokenAddress') tokenAddress: `0x${string}`,
  ) {
    return await this.tokenService.mintTokens(to, amount, tokenAddress);
  }

  // @Get()
  // findAll() {
  //   return this.tokenService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tokenService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTokenDto: UpdateTokenDto) {
  //   return this.tokenService.update(+id, updateTokenDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tokenService.remove(+id);
  // }
}
