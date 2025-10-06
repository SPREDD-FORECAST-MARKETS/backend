import {
  Controller,
  Get,
  Query,
  Param,
  ParseIntPipe,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery, ApiParam } from '@nestjs/swagger';
import { ApiService } from './api.service';
import { GetMarketsQueryDto } from './dto/get-markets-query.dto';
import { GetMarketStatsDto } from './dto/get-market-stats.dto';

@ApiTags('Public API')
@Controller('api/v1')
export class ApiController {
  private readonly logger = new Logger(ApiController.name);

  constructor(private readonly apiService: ApiService) {}

  @Get('markets')
  @ApiOperation({
    summary: 'Get all markets',
    description: 'Retrieve a paginated list of all prediction markets with optional filtering'
  })
  @ApiResponse({
    status: 200,
    description: 'Markets retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              question: { type: 'string' },
              description: { type: 'string' },
              status: { type: 'string', enum: ['ACTIVE', 'EXPIRED', 'CLOSED'] },
              isResolved: { type: 'boolean' },
              winningOutcome: { type: 'string', nullable: true },
              expiry_date: { type: 'string', format: 'date-time' },
              createdAt: { type: 'string', format: 'date-time' },
              contract_address: { type: 'string' },
              marketId: { type: 'string' },
              tags: { type: 'array', items: { type: 'string' } },
              image: { type: 'string', nullable: true },
              creator: {
                type: 'object',
                properties: {
                  username: { type: 'string' },
                  wallet_address: { type: 'string' }
                }
              },
              outcomes: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    outcome_title: { type: 'string' }
                  }
                }
              }
            }
          }
        },
        pagination: {
          type: 'object',
          properties: {
            total: { type: 'number' },
            page: { type: 'number' },
            limit: { type: 'number' },
            totalPages: { type: 'number' }
          }
        }
      }
    }
  })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 20, max: 100)' })
  @ApiQuery({ name: 'status', required: false, enum: ['ACTIVE', 'EXPIRED', 'CLOSED'], description: 'Filter by market status' })
  @ApiQuery({ name: 'resolved', required: false, type: Boolean, description: 'Filter by resolution status' })
  @ApiQuery({ name: 'tags', required: false, type: String, description: 'Comma-separated list of tags to filter by' })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search in question and description' })
  @ApiQuery({ name: 'creator', required: false, type: String, description: 'Filter by creator wallet address' })
  async getMarkets(@Query() query: GetMarketsQueryDto) {
    try {
      return await this.apiService.getMarkets(query);
    } catch (error) {
      this.logger.error('Failed to fetch markets', error);
      throw new BadRequestException(`Failed to fetch markets: ${error.message}`);
    }
  }

  @Get('markets/:id')
  @ApiOperation({
    summary: 'Get market by ID',
    description: 'Retrieve detailed information about a specific market'
  })
  @ApiParam({ name: 'id', type: Number, description: 'Market ID' })
  @ApiResponse({
    status: 200,
    description: 'Market retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            question: { type: 'string' },
            description: { type: 'string' },
            resolution_criteria: { type: 'string' },
            status: { type: 'string' },
            isResolved: { type: 'boolean' },
            winningOutcome: { type: 'string', nullable: true },
            expiry_date: { type: 'string', format: 'date-time' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            contract_address: { type: 'string' },
            marketId: { type: 'string' },
            tags: { type: 'array', items: { type: 'string' } },
            image: { type: 'string', nullable: true },
            creator: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                username: { type: 'string' },
                wallet_address: { type: 'string' }
              }
            },
            outcomes: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  outcome_title: { type: 'string' },
                  current_supply: { type: 'string' },
                  total_liquidity: { type: 'string' }
                }
              }
            }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Market not found' })
  async getMarket(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.apiService.getMarket(id);
    } catch (error) {
      this.logger.error(`Failed to fetch market ${id}`, error);
      throw new BadRequestException(`Failed to fetch market: ${error.message}`);
    }
  }

  @Get('markets/:id/trades')
  @ApiOperation({
    summary: 'Get market trades',
    description: 'Retrieve recent trades for a specific market'
  })
  @ApiParam({ name: 'id', type: Number, description: 'Market ID' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 20, max: 100)' })
  @ApiResponse({
    status: 200,
    description: 'Market trades retrieved successfully'
  })
  async getMarketTrades(
    @Param('id', ParseIntPipe) id: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20
  ) {
    try {
      return await this.apiService.getMarketTrades(id, page, limit);
    } catch (error) {
      this.logger.error(`Failed to fetch trades for market ${id}`, error);
      throw new BadRequestException(`Failed to fetch market trades: ${error.message}`);
    }
  }

  @Get('markets/:id/chart')
  @ApiOperation({
    summary: 'Get market price chart data',
    description: 'Retrieve price chart data for a specific market'
  })
  @ApiParam({ name: 'id', type: Number, description: 'Market ID' })
  @ApiQuery({ name: 'interval', required: false, enum: ['10s', '1m', '5m', '1h', '1d', '1mo'], description: 'Chart interval' })
  @ApiQuery({ name: 'from', required: false, type: String, description: 'Start date (ISO string)' })
  @ApiQuery({ name: 'to', required: false, type: String, description: 'End date (ISO string)' })
  @ApiResponse({
    status: 200,
    description: 'Market chart data retrieved successfully'
  })
  async getMarketChart(
    @Param('id', ParseIntPipe) id: number,
    @Query('interval') interval?: string,
    @Query('from') from?: string,
    @Query('to') to?: string
  ) {
    try {
      return await this.apiService.getMarketChart(id, interval, from, to);
    } catch (error) {
      this.logger.error(`Failed to fetch chart data for market ${id}`, error);
      throw new BadRequestException(`Failed to fetch market chart: ${error.message}`);
    }
  }

  @Get('resolved-markets')
  @ApiOperation({
    summary: 'Get resolved markets',
    description: 'Retrieve all resolved prediction markets'
  })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 20, max: 100)' })
  @ApiQuery({ name: 'outcome', required: false, enum: ['YES', 'NO'], description: 'Filter by winning outcome' })
  @ApiResponse({
    status: 200,
    description: 'Resolved markets retrieved successfully'
  })
  async getResolvedMarkets(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
    @Query('outcome') outcome?: string
  ) {
    try {
      return await this.apiService.getResolvedMarkets(page, limit, outcome);
    } catch (error) {
      this.logger.error('Failed to fetch resolved markets', error);
      throw new BadRequestException(`Failed to fetch resolved markets: ${error.message}`);
    }
  }

  @Get('stats')
  @ApiOperation({
    summary: 'Get platform statistics',
    description: 'Retrieve overall platform statistics'
  })
  @ApiResponse({
    status: 200,
    description: 'Platform statistics retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'object',
          properties: {
            totalMarkets: { type: 'number' },
            activeMarkets: { type: 'number' },
            resolvedMarkets: { type: 'number' },
            totalTrades: { type: 'number' },
            totalUsers: { type: 'number' },
            totalVolume: { type: 'string' },
            last24hVolume: { type: 'string' },
            last24hTrades: { type: 'number' }
          }
        }
      }
    }
  })
  async getStats() {
    try {
      return await this.apiService.getStats();
    } catch (error) {
      this.logger.error('Failed to fetch platform stats', error);
      throw new BadRequestException(`Failed to fetch platform stats: ${error.message}`);
    }
  }

  @Get('market-stats/:id')
  @ApiOperation({
    summary: 'Get market statistics',
    description: 'Retrieve detailed statistics for a specific market'
  })
  @ApiParam({ name: 'id', type: Number, description: 'Market ID' })
  @ApiResponse({
    status: 200,
    description: 'Market statistics retrieved successfully'
  })
  async getMarketStats(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.apiService.getMarketStats(id);
    } catch (error) {
      this.logger.error(`Failed to fetch stats for market ${id}`, error);
      throw new BadRequestException(`Failed to fetch market stats: ${error.message}`);
    }
  }

  @Get('creators')
  @ApiOperation({
    summary: 'Get market creators',
    description: 'Retrieve list of market creators with their statistics'
  })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 20, max: 100)' })
  @ApiQuery({ name: 'sortBy', required: false, enum: ['markets', 'volume', 'accuracy'], description: 'Sort by metric' })
  @ApiResponse({
    status: 200,
    description: 'Market creators retrieved successfully'
  })
  async getCreators(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
    @Query('sortBy') sortBy: string = 'markets'
  ) {
    try {
      return await this.apiService.getCreators(page, limit, sortBy);
    } catch (error) {
      this.logger.error('Failed to fetch creators', error);
      throw new BadRequestException(`Failed to fetch creators: ${error.message}`);
    }
  }

  @Get('leaderboard')
  @ApiOperation({
    summary: 'Get platform leaderboard',
    description: 'Retrieve platform leaderboard data'
  })
  @ApiQuery({ name: 'type', required: false, enum: ['TRADER', 'CREATOR'], description: 'Leaderboard type' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of entries (default: 50, max: 100)' })
  @ApiResponse({
    status: 200,
    description: 'Leaderboard retrieved successfully'
  })
  async getLeaderboard(
    @Query('type') type: string = 'TRADER',
    @Query('limit') limit: number = 50
  ) {
    try {
      return await this.apiService.getLeaderboard(type, limit);
    } catch (error) {
      this.logger.error('Failed to fetch leaderboard', error);
      throw new BadRequestException(`Failed to fetch leaderboard: ${error.message}`);
    }
  }

  @Get('news')
  @ApiOperation({
    summary: 'Get platform news',
    description: 'Retrieve latest platform news and updates'
  })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 20, max: 100)' })
  @ApiResponse({
    status: 200,
    description: 'News retrieved successfully'
  })
  async getNews(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20
  ) {
    try {
      return await this.apiService.getNews(page, limit);
    } catch (error) {
      this.logger.error('Failed to fetch news', error);
      throw new BadRequestException(`Failed to fetch news: ${error.message}`);
    }
  }

  @Get('health')
  @ApiOperation({
    summary: 'API health check',
    description: 'Check API health and status for monitoring purposes'
  })
  @ApiResponse({
    status: 200,
    description: 'API is healthy',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        status: { type: 'string' },
        timestamp: { type: 'string' },
        version: { type: 'string' },
        uptime: { type: 'number' },
        database: { type: 'string' }
      }
    }
  })
  async getHealth() {
    try {
      return await this.apiService.getHealth();
    } catch (error) {
      this.logger.error('Health check failed', error);
      throw new BadRequestException(`Health check failed: ${error.message}`);
    }
  }
}