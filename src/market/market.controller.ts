import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  BadRequestException,
  Logger,
  Res,
  Header,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiSecurity, ApiTags, ApiResponse } from '@nestjs/swagger';
import { PrivyAuthGuard } from 'src/auth/jwt-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { CurrentUser } from 'src/decorators';
import { MarketService } from './market.service';
import { CreateMarketDto } from './dto/create-market.dto';
import { CreateAgentMarketDto } from './dto/create-agent-market.dto';
import { GetMarketDto } from './dto/get-market.dto';
import { ResolveMarketByIdDto } from './dto/resolve-market.dto';
import { GetMarketChartDto } from './dto/get-market-chart.dto';
import { AgentMarketService } from '../agent/agent-market.service';

@ApiTags('Markets')
@Controller('market')
export class MarketController {
  private readonly logger = new Logger(MarketController.name);

  constructor(
    private marketService: MarketService,
    private prismaService: PrismaService,
    private agentMarketService: AgentMarketService,
  ) { }

  @Post('create-market')
  @UseGuards(PrivyAuthGuard)
  @ApiBearerAuth()
  @ApiSecurity('bearer')
  @ApiOperation({ summary: 'Create new prediction market', description: 'Create a new prediction market with question, description, and expiry date' })
  @ApiResponse({ status: 201, description: 'Market created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid market data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
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

  // Helper function to normalize tags to match frontend categories
  private normalizeTags(tags?: string[]): string[] {
    if (!tags) return [];
    
    const tagMap: { [key: string]: string } = {
      'crypto': 'Crypto',
      'bitcoin': 'Bitcoin',
      'ethereum': 'Crypto',
      'tech': 'Technology',
      'technology': 'Technology',
      'ai': 'AI',
      'sports': 'Sports',
      'nba': 'NBA',
      'business': 'Business',
      'stocks': 'Business',
      'entertainment': 'Entertainment',
      'health': 'Health',
      'environment': 'Environment',
      'politics': 'Politics',
      'political': 'Politics',
      'election': 'Politics',
      'government': 'Politics',
      'price': 'Crypto', // Price predictions are usually crypto
      'prediction': 'Business' // Generic prediction tag
    };

    return tags.map(tag => tagMap[tag.toLowerCase()] || tag).filter((tag, index, arr) => arr.indexOf(tag) === index);
  }

  @Post('agent/create-market')
  @ApiOperation({ summary: 'Create market via agent' })
  async createMarketAgent(
    @Body() createAgentMarketDto: CreateAgentMarketDto,
  ) {
    try {
      const blockchainResult = await this.agentMarketService.createMarketOnBlockchain(
        createAgentMarketDto.question,
        new Date(createAgentMarketDto.expiry_date)
      );
      
      if (!blockchainResult.success) {
        throw new BadRequestException(`Blockchain deployment failed: ${blockchainResult.error}`);
      }
      
      if (!blockchainResult.marketId || !blockchainResult.contractAddress) {
        throw new BadRequestException('Blockchain deployment failed: Missing marketId or contractAddress');
      }

      const marketData = await this.marketService.createAgentMarket(
        createAgentMarketDto.description,
        createAgentMarketDto.resolution_criteria,
        createAgentMarketDto.question,
        blockchainResult.marketId,        // marketId (bytes32)
        createAgentMarketDto.expiry_date,
        createAgentMarketDto.image,
        blockchainResult.contractAddress, // contract_address (20-byte address)
        2, // SpreddAgent user ID
        this.normalizeTags(createAgentMarketDto.tags),
      );
      
      return {
        success: true,
        market: marketData,
        blockchain: {
          contractAddress: blockchainResult.contractAddress,
          marketId: blockchainResult.marketId,
          transactionHash: blockchainResult.transactionHash,
        },
      };
      
    } catch (error) {
      throw new BadRequestException(`Market creation failed: ${error.message}`);
    }
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
    try {
      const result = await this.marketService.getMarketChartData(dto);
      return result;
    } catch (error) {
      this.logger.error('Failed to fetch market chart data', error);
      throw new BadRequestException(`Failed to fetch chart data: ${error.message}`);
    }
  }

  @Get(':id/twitter-card')
  @Header('Content-Type', 'text/html')
  async getMarketTwitterCard(@Param('id') id: number, @Res() res: Response) {
    try {
      const marketData = await this.marketService.getMarket(id);
      if (!marketData) {
        return res.status(404).send('<html><body>Market not found</body></html>');
      }
      
      const twitterCardHtml = await this.marketService.generateTwitterCardHtml(marketData);
      return res.send(twitterCardHtml);
    } catch (error) {
      this.logger.error('Failed to generate Twitter Card', error);
      return res.status(500).send('<html><body>Error generating Twitter Card</body></html>');
    }
  }

  @Get('share/:id')
  @Header('Content-Type', 'text/html')
  async getMarketShare(@Param('id') id: number, @Res() res: Response) {
    try {
      const marketData = await this.marketService.getMarket(id);
      if (!marketData) {
        return res.status(404).send('<html><body>Market not found</body></html>');
      }
      
      const twitterCardHtml = await this.marketService.generateTwitterCardHtml(marketData);
      return res.send(twitterCardHtml);
    } catch (error) {
      this.logger.error('Failed to generate market share page', error);
      return res.status(500).send('<html><body>Error loading market</body></html>');
    }
  }

  @Get(':id')
  async getMarket(@Param('id') id: number) {
    return this.marketService.getMarket(id);
  }

}
