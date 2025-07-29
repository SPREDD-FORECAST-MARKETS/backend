import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiSecurity } from '@nestjs/swagger';
import { PrivyAuthGuard } from 'src/auth/jwt-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { CurrentUser } from 'src/decorators';
import { MarketService } from './market.service';
import { CreateMarketDto } from './dto/create-market.dto';
import { GetMarketDto } from './dto/get-market.dto';
import { ResolveMarketByIdDto } from './dto/resolve-market.dto';
import { GetMarketChartDto } from './dto/get-market-chart.dto';

@Controller('market')
export class MarketController {
  constructor(
    private marketService: MarketService,
    private prismaService: PrismaService,
  ) { }

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
      createMarketDto.contract_address,
      createMarketDto.expiry_date,
      createMarketDto.image,
      createMarketDto.marketId,
      user.id as number,
      createMarketDto.tags,
    );
  }

  @Post('markets')
  async getMarkets(@Body() getMarketDto: GetMarketDto) {
    return this.marketService.getMarkets(getMarketDto);
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

  @Patch('resolve-market')
  async resolveMarket(@Body() ResolveMarketByIdDto: ResolveMarketByIdDto) {
    return this.marketService.resolveMarket(
      ResolveMarketByIdDto.marketId,
      ResolveMarketByIdDto.outcomeWon,
    );
  }

  @Get('chart')
  async getMarketChart(@Query() dto: GetMarketChartDto) {
    return this.marketService.getMarketChartData(dto);
  }

  @Get(':id')
  async getMarket(@Param('id') id: number) {
    return this.marketService.getMarket(id);
  }

}
