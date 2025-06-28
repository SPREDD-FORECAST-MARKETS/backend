import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { PrivyAuthGuard } from 'src/auth/jwt-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { CurrentUser } from 'src/decorators';
import { TradeService } from './trade.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { CreateOrUpdateTokenAllocationDto } from './dto/trade-allocation';
import { PaginatedTradeResponseDto, TradeQueryDto, TradeResponseDto } from './dto/trade-query.dto';

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

}
