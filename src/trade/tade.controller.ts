import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { PrivyAuthGuard } from 'src/auth/jwt-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { CurrentUser } from 'src/decorators';
import { TradeService } from './trade.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { CreateOrUpdateTokenAllocationDto } from './dto/trade-allocation';

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

}
