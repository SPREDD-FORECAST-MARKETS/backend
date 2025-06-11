import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTradeDto } from "./dto/create-trade.dto";
import { CreateOrUpdateTokenAllocationDto } from "./dto/trade-allocation";


@Injectable()
export class TradeService {
  constructor(private prismaService: PrismaService) { }

  async createTrade(userID: number, createTradeDto: CreateTradeDto) {
    const { order_type, order_size, amount, afterPrice, marketID, outcomeId } = createTradeDto;

    const trade = await this.prismaService.trade.create({
      data: {
        order_type,
        order_size,
        amount,
        afterPrice,
        market: {
          connect: { id: marketID },
        },
        outcome: {
          connect: { id: outcomeId },
        },
        user: {
          connect: { id: userID },
        }
      },
      include: {
        market: true,
        outcome: true,
      },
    });

    return trade;
  }


  async createOrUpdateAllocation(
    userId: number,
    dto: CreateOrUpdateTokenAllocationDto,
  ) {
    const { amount, outcomeId } = dto;

    const allocation = await this.prismaService.tokenAllocation.upsert({
      where: {
        userId_outcomeId: {
          userId,
          outcomeId,
        },
      },
      create: {
        amount,
        outcome: { connect: { id: outcomeId } },
        user: { connect: { id: userId } },
      },
      update: {
        amount,
      },
      include: {
        user: true,
        outcome: true,
      },
    });

    return allocation;
  }

}