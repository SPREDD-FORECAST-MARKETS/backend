import { Body, Controller, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { PrivyAuthGuard } from 'src/auth/jwt-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { CurrentUser } from 'src/decorators';
import { TradeService } from './trade.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { CreateOrUpdateTokenAllocationDto } from './dto/trade-allocation';
import { PaginatedTradeResponseDto, TradeQueryDto, TradeResponseDto } from './dto/trade-query.dto';
import { GetLatestTradesDto, LatestTradeResponseDto } from './dto/latest-trades.dto';

@Controller('trade')
export class TradeController {

    constructor(private tradeService: TradeService, private prismaService: PrismaService) { }

    @Post('create')
    @UseGuards(PrivyAuthGuard)
    @ApiBearerAuth()
    @ApiSecurity('bearer')
    async createTrade(
        @Body() createTradeDto: CreateTradeDto,
        @CurrentUser() user,
    ) {
        return this.tradeService.createTrade(user.id as number, createTradeDto);
    }

    @Post('allocate')
    @UseGuards(PrivyAuthGuard)
    @ApiBearerAuth()
    @ApiSecurity('bearer')
    async createOrUpdateAllocation(
        @Body() dto: CreateOrUpdateTokenAllocationDto,
        @CurrentUser() user,
    ) {
        return this.tradeService.createOrUpdateAllocation(user.id as number, dto);
    }

    @Get()
    @ApiOperation({
        summary: 'Get all trades with filtering and pagination',
        description: 'Retrieve trades with various filtering options including user wallet, market contract, creator address, and more'
    })
    @ApiResponse({
        status: 200,
        description: 'Trades retrieved successfully',
        type: PaginatedTradeResponseDto
    })
    async getAllTrades(@Query() queryDto: TradeQueryDto): Promise<PaginatedTradeResponseDto> {
        return this.tradeService.findAllTrades(queryDto);
    }

    @Get('statistics')
    @ApiOperation({
        summary: 'Get trade statistics',
        description: 'Get aggregated statistics for trades based on filters'
    })
    async getTradeStatistics(@Query() queryDto: TradeQueryDto) {
        return this.tradeService.getTradeStatistics(queryDto);
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get trade by ID',
        description: 'Retrieve a specific trade by its ID'
    })
    @ApiResponse({
        status: 200,
        description: 'Trade retrieved successfully',
        type: TradeResponseDto
    })
    @ApiResponse({
        status: 404,
        description: 'Trade not found'
    })
    async getTradeById(@Param('id', ParseIntPipe) id: number): Promise<TradeResponseDto> {
        return this.tradeService.findTradeById(id);
    }


    @Get('market/:marketId/trades')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Get latest trades for a market',
        description: 'Fetch the latest trades for a specific market by ID, contract address, or marketId'
    })
    @ApiParam({
        name: 'marketId',
        description: 'Market ID, contract address, or marketId',
        example: '123 or 0x1234...abcd or market_abc_123'
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        description: 'Number of trades to fetch (max 50)',
        example: 10
    })
    @ApiQuery({
        name: 'sort',
        required: false,
        description: 'Sort order by creation time',
        enum: ['asc', 'desc'],
        example: 'desc'
    })
    @ApiResponse({
        status: 200,
        description: 'Latest trades retrieved successfully',
        type: [LatestTradeResponseDto],
    })
    @ApiResponse({
        status: 404,
        description: 'Market not found',
    })
    async getLatestTradesByMarketId(
        @Param('marketId') marketId: string,
        @Query() query: GetLatestTradesDto,
    ): Promise<LatestTradeResponseDto[]> {
        return this.tradeService.getLatestTradesByMarketId(marketId, query);
    }

    @Get('contract/:contractAddress/trades')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Get latest trades for a contract',
        description: 'Fetch the latest trades for a specific contract address'
    })
    @ApiParam({
        name: 'contractAddress',
        description: 'Smart contract address',
        example: '0x1234567890abcdef1234567890abcdef12345678'
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        description: 'Number of trades to fetch (max 50)',
        example: 10
    })
    @ApiQuery({
        name: 'sort',
        required: false,
        description: 'Sort order by creation time',
        enum: ['asc', 'desc'],
        example: 'desc'
    })
    @ApiResponse({
        status: 200,
        description: 'Latest trades retrieved successfully',
        type: [LatestTradeResponseDto],
    })
    @ApiResponse({
        status: 404,
        description: 'Contract not found',
    })
    async getLatestTradesByContractAddress(
        @Param('contractAddress') contractAddress: string,
        @Query() query: GetLatestTradesDto,
    ): Promise<LatestTradeResponseDto[]> {
        return this.tradeService.getLatestTradesByContractAddress(contractAddress, query);
    }

}
