import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { PrivyAuthGuard } from 'src/auth/jwt-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { CurrentUser } from 'src/decorators';
import { MarketService } from './market.service';
import { CreateMarketDto } from './dto/create-market.dto';

@Controller('agent')
export class MarketController {

    constructor(private marketService: MarketService, private prismaService: PrismaService) {}

    @Post("create-market")
    @UseGuards(PrivyAuthGuard)
    @ApiBearerAuth()
    @ApiSecurity('bearer')
    async createToken(@Body() createMarketDto: CreateMarketDto, @CurrentUser() user) {

        return this.marketService.createMarket(
            createMarketDto.description,
            createMarketDto.question,
            createMarketDto.expiry_date,
            createMarketDto.image,
            user.userId as number
        )

    }

    
}
