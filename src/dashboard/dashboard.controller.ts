import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam
} from '@nestjs/swagger';
import { PointType } from 'generated/prisma';
import { DashboardService } from './dashboard.service';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly leaderboardService: DashboardService) { }

  @Get("leaderboard")
  @ApiOperation({ summary: 'Get leaderboard by point type' })
  @ApiQuery({
    name: 'pointType',
    enum: PointType,
    required: true,
    description: 'Point type to filter leaderboard (TRADER or CREATOR)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Limit number of results (default: 10)',
  })
  @ApiResponse({
    status: 200,
    description: 'Leaderboard entries fetched',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          userID: { type: 'number' },
          pointType: { type: 'string' },
          points: { type: 'number' },
          user: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              address: { type: 'string' },
              name: { type: 'string' },
            },
          },
        },
      },
    },
  })
  async getLeaderboard(
    @Query('pointType') pointType: PointType,
    @Query('limit') limit?: number,
  ) {
    return this.leaderboardService.getLeaderboard(pointType, limit);
  }


  @Get('most-traded')
  @ApiOperation({ summary: 'Get most traded markets in last 24 hours' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'How many top markets to return (default: 10)',
  })
  @ApiResponse({
    status: 200,
    description: 'Markets sorted by trade count',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          question: { type: 'string' },
          tradeCount: { type: 'number' },
          creator: {
            type: 'object',
            properties: {
              username: { type: 'string' },
              wallet_address: { type: 'string' },
            },
          },
        },
      },
    },
  })
  async getMostTradedMarkets(@Query('limit') limit?: number) {
    return this.leaderboardService.getMostTradedMarketsIn24Hours(limit);
  }


  @Get(':id/volume')
  @ApiOperation({
    summary: 'Get total volume of a market',
    description: 'Returns the total trading volume (sum of all buy and sell trades) for a specific market'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Market ID'
  })
  @ApiResponse({
    status: 200,
    description: 'Market volume retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        marketId: { type: 'number' },
        marketQuestion: { type: 'string' },
        totalVolume: { type: 'string' },
        totalTrades: { type: 'number' },
        buyVolume: { type: 'string' },
        sellVolume: { type: 'string' },
        buyTradesCount: { type: 'number' },
        sellTradesCount: { type: 'number' }
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Market not found'
  })
  async getMarketVolume(@Param('id', ParseIntPipe) marketId: number) {
    try {
      return await this.leaderboardService.getMarketVolume(marketId);
    } catch (error) {
      if (error.message === 'Market not found') {
        throw new HttpException('Market not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id/volume/detailed')
  @ApiOperation({
    summary: 'Get detailed volume breakdown by outcome',
    description: 'Returns volume breakdown for each outcome in the market'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Market ID'
  })
  @ApiResponse({
    status: 200,
    description: 'Detailed market volume retrieved successfully'
  })
  async getDetailedMarketVolume(@Param('id', ParseIntPipe) marketId: number) {
    try {
      return await this.leaderboardService.getDetailedMarketVolume(marketId);
    } catch (error) {
      if (error.message === 'Market not found') {
        throw new HttpException('Market not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Get('news')
  @ApiOperation({
    summary: 'Get detailed volume breakdown by outcome',
    description: 'Returns volume breakdown for each outcome in the market'
  })
  async getRandomUnreadNews() {
    try {
      return await this.leaderboardService.getRandomUnreadNews();
    } catch (error) {
      throw new HttpException('Market not found', HttpStatus.NOT_FOUND);
    }
  }
}
