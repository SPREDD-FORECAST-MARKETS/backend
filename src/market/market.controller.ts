import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { PrivyAuthGuard } from 'src/auth/jwt-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { CurrentUser } from 'src/decorators';
import { MarketService } from './market.service';
import { CreateMarketDto } from './dto/create-market.dto';
import { GetMarketDto } from './dto/get-market.dto';

@Controller('market')
export class MarketController {
  constructor(
    private marketService: MarketService,
    private prismaService: PrismaService,
  ) {}

  @Post('create-market')
  @UseGuards(PrivyAuthGuard)
  @ApiBearerAuth()
  @ApiSecurity('bearer')
  async createMarket(
    @Body() createMarketDto: CreateMarketDto,
    @CurrentUser() user,
  ) {
    return this.marketService.createMarket(
      createMarketDto.description,
      createMarketDto.resolution_criteria,
      createMarketDto.question,
      createMarketDto.expiry_date,
      createMarketDto.image,
      createMarketDto.contract_address,
      user.id as number,
      createMarketDto.tags,
    );
  }

  @Post('markets')
  async getMarkets(@Body() getMarketDto: GetMarketDto) {
    return this.marketService.getMarkets(getMarketDto);
  }

  @Get(':id')
  async getMarket(@Param('id') id: number) {
    return this.marketService.getMarket(id);
  }

  @Get('user/:wallet_address')
  async getUserMarkets(
    @Param('wallet_address') wallet_address: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    return this.marketService.getUserMarkets(wallet_address, pageNum, limitNum);
  }
}
