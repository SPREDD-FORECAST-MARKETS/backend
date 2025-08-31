import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTradeDto } from "./dto/create-trade.dto";
import { CreateOrUpdateTokenAllocationDto } from "./dto/trade-allocation";
import { Prisma } from "generated/prisma";
import { PaginatedTradeResponseDto, TradeQueryDto, TradeResponseDto } from "./dto/trade-query.dto";
import { GetLatestTradesDto, LatestTradeResponseDto } from "./dto/latest-trades.dto";

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

    await this.createMarketPriceSnapshot(marketID);

    return trade;
  }

  private async createMarketPriceSnapshot(marketID: number) {
    try {
      const outcomes = await this.prismaService.outcome.findMany({
        where: { marketID },
        include: { trades: true }
      });

      const yesOutcome = outcomes.find(o => o.outcome_title.toUpperCase() === 'YES');
      const noOutcome = outcomes.find(o => o.outcome_title.toUpperCase() === 'NO');

      const getLatestPrice = async (outcomeId: number | undefined): Promise<number> => {
        if (!outcomeId) return 0.5;
        
        const latestTrade = await this.prismaService.trade.findFirst({
          where: { outcomeId },
          orderBy: { createdAt: 'desc' }
        });
        
        return latestTrade ? Number(latestTrade.afterPrice) : 0.5;
      };

      const yesPrice = await getLatestPrice(yesOutcome?.id);
      const noPrice = await getLatestPrice(noOutcome?.id);

      const totalVolumeResult = await this.prismaService.trade.aggregate({
        where: { marketID },
        _sum: { amount: true }
      });

      const totalVolume = totalVolumeResult._sum.amount || 0;

      const yesOddsBigInt = BigInt(Math.round(yesPrice * 1_000_000));
      const noOddsBigInt = BigInt(Math.round(noPrice * 1_000_000));
      const totalVolumeBigInt = BigInt(Math.round(Number(totalVolume) * 1_000_000));

      await this.prismaService.marketPriceSnapshot.create({
        data: {
          marketId: marketID,
          yesOdds: yesOddsBigInt,
          noOdds: noOddsBigInt,
          totalVolume: totalVolumeBigInt,
          timestamp: new Date()
        }
      });

    } catch (error) {
      console.error('Failed to create market price snapshot:', error);
    }
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

  async findAllTrades(queryDto: TradeQueryDto): Promise<PaginatedTradeResponseDto> {
    const {
      userWalletAddress,
      marketContractAddress,
      orderType,
      sortOrder = 'desc',
      sortBy = 'createdAt',
      page = 1,
      limit = 20,
      startDate,
      endDate
    } = queryDto;

    // Build where clause with null safety
    const where: Prisma.TradeWhereInput = {};

    // Filter by user wallet address with null safety
    if (userWalletAddress?.trim()) {
      where.user = {
        wallet_address: {
          equals: userWalletAddress.trim(),
          mode: 'insensitive'
        }
      };
    }

    // Filter by market contract address with null safety  
    if (marketContractAddress?.trim()) {
      where.market = {
        contract_address: {
          equals: marketContractAddress.trim(),
          mode: 'insensitive'
        }
      };
    }

    // Filter by order type with null safety
    if (orderType && (orderType === 'BUY' || orderType === 'SELL')) {
      where.order_type = orderType;
    }

    // Filter by date range with null safety
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        where.createdAt.lte = new Date(endDate);
      }
    }

    // Calculate pagination with null safety
    const currentPage = Math.max(1, page ?? 1);
    const currentLimit = Math.min(100, Math.max(1, limit ?? 20));
    const skip = (currentPage - 1) * currentLimit;

    // Build order by clause with null safety
    const orderBy: Prisma.TradeOrderByWithRelationInput = {
      [sortBy ?? 'createdAt']: sortOrder ?? 'desc'
    };

    try {
      // Execute queries in parallel
      const [trades, totalCount] = await Promise.all([
        this.prismaService.trade.findMany({
          where,
          orderBy,
          skip,
          take: currentLimit,
          include: {
            user: {
              select: {
                id: true,
                username: true,
                wallet_address: true,
                profile_pic: true
              }
            },
            market: {
              select: {
                id: true,
                question: true,
                contract_address: true,
                creator: {
                  select: {
                    id: true,
                    username: true,
                    wallet_address: true,
                    profile_pic: true
                  }
                }
              }
            },
            outcome: {
              select: {
                id: true,
                outcome_title: true
              }
            }
          }
        }),
        this.prismaService.trade.count({ where })
      ]);

      // Calculate pagination metadata with null safety
      const totalPages = Math.ceil(totalCount / currentLimit);
      const hasNext = currentPage < totalPages;
      const hasPrev = currentPage > 1;

      // Transform data to response format with null safety
      const transformedTrades: TradeResponseDto[] = trades.map(trade => ({
        id: trade.id,
        unique_id: trade.unique_id,
        order_type: trade.order_type,
        order_size: trade.order_size?.toString() ?? '0',
        amount: trade.amount?.toString() ?? '0',
        afterPrice: trade.afterPrice?.toString() ?? '0',
        createdAt: trade.createdAt,
        updatedAt: trade.updatedAt,
        market: trade.market
          ? {
            id: trade.market.id,
            question: trade.market.question,
            contract_address: trade.market.contract_address,
            creator: {
              id: trade.market.creator.id,
              username: trade.market.creator.username,
              wallet_address: trade.market.creator.wallet_address,
              ...(trade.market.creator.profile_pic !== null && {
                profile_pic: trade.market.creator.profile_pic,
              }),
            },
          }
          : undefined,
        outcome: trade.outcome ?? undefined,
        user: trade.user
          ? {
            id: trade.user.id,
            username: trade.user.username,
            wallet_address: trade.user.wallet_address,
            ...(trade.user.profile_pic !== null && {
              profile_pic: trade.user.profile_pic,
            }),
          }
          : undefined,
      }));

      return {
        data: transformedTrades,
        pagination: {
          page: currentPage,
          limit: currentLimit,
          total: totalCount,
          totalPages,
          hasNext,
          hasPrev
        }
      };

    } catch (error: any) {
      throw new Error(`Failed to fetch trades: ${error?.message ?? 'Unknown error'}`);
    }
  }

  async findTradeById(id: number): Promise<TradeResponseDto> {
    const trade = await this.prismaService.trade.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            wallet_address: true,
            profile_pic: true,
          },
        },
        market: {
          select: {
            id: true,
            question: true,
            contract_address: true,
            creator: {
              select: {
                id: true,
                username: true,
                wallet_address: true,
                profile_pic: true,
              },
            },
          },
        },
        outcome: {
          select: {
            id: true,
            outcome_title: true,
          },
        },
      },
    });

    if (!trade) {
      throw new NotFoundException(`Trade with ID ${id} not found`);
    }

    return {
      id: trade.id,
      unique_id: trade.unique_id,
      order_type: trade.order_type,
      order_size: trade.order_size?.toString() ?? '0',
      amount: trade.amount?.toString() ?? '0',
      afterPrice: trade.afterPrice?.toString() ?? '0',
      createdAt: trade.createdAt,
      updatedAt: trade.updatedAt,
      market: trade.market
        ? {
          id: trade.market.id,
          question: trade.market.question,
          contract_address: trade.market.contract_address,
          creator: {
            id: trade.market.creator.id,
            username: trade.market.creator.username,
            wallet_address: trade.market.creator.wallet_address,
            ...(trade.market.creator.profile_pic !== null && {
              profile_pic: trade.market.creator.profile_pic,
            }),
          },
        }
        : undefined,
      outcome: trade.outcome ?? undefined,
      user: trade.user
        ? {
          id: trade.user.id,
          username: trade.user.username,
          wallet_address: trade.user.wallet_address,
          ...(trade.user.profile_pic !== null && {
            profile_pic: trade.user.profile_pic,
          }),
        }
        : undefined,
    };
  }

  // Additional utility methods
  async getTradeStatistics(queryDto: Partial<TradeQueryDto>) {
    const where: Prisma.TradeWhereInput = {};

    // Filter by user wallet address with null safety
    if (queryDto.userWalletAddress?.trim()) {
      where.user = {
        wallet_address: {
          equals: queryDto.userWalletAddress.trim(),
          mode: 'insensitive'
        }
      };
    }

    // Filter by market contract address with null safety
    if (queryDto.marketContractAddress?.trim()) {
      where.market = {
        contract_address: {
          equals: queryDto.marketContractAddress.trim(),
          mode: 'insensitive'
        }
      };
    }

    // Add date range filtering with null safety
    if (queryDto.startDate || queryDto.endDate) {
      where.createdAt = {};
      if (queryDto.startDate) {
        where.createdAt.gte = new Date(queryDto.startDate);
      }
      if (queryDto.endDate) {
        where.createdAt.lte = new Date(queryDto.endDate);
      }
    }

    try {
      const [totalTrades, totalVolume, buyTrades, sellTrades] = await Promise.all([
        this.prismaService.trade.count({ where }),
        this.prismaService.trade.aggregate({
          where,
          _sum: { amount: true }
        }),
        this.prismaService.trade.count({
          where: { ...where, order_type: 'BUY' }
        }),
        this.prismaService.trade.count({
          where: { ...where, order_type: 'SELL' }
        })
      ]);

      const totalTradesCount = totalTrades ?? 0;
      const volumeSum = totalVolume._sum.amount;

      return {
        totalTrades: totalTradesCount,
        totalVolume: volumeSum?.toString() ?? '0',
        buyTrades: buyTrades ?? 0,
        sellTrades: sellTrades ?? 0,
        buyPercentage: totalTradesCount > 0 ? ((buyTrades ?? 0) / totalTradesCount) * 100 : 0,
        sellPercentage: totalTradesCount > 0 ? ((sellTrades ?? 0) / totalTradesCount) * 100 : 0
      };
    } catch (error: any) {
      throw new Error(`Failed to fetch trade statistics: ${error?.message ?? 'Unknown error'}`);
    }
  }


  async getLatestTradesByMarketId(
    marketId: string,
    query: GetLatestTradesDto,
  ): Promise<LatestTradeResponseDto[]> {
    // First, check if market exists
    const market = await this.prismaService.market.findFirst({
      where: {
        OR: [
          { id: isNaN(Number(marketId)) ? undefined : Number(marketId) },
          { contract_address: marketId },
          { marketId: marketId },
        ],
      },
    });

    if (!market) {
      throw new NotFoundException(`Market with ID/address ${marketId} not found`);
    }

    // Fetch latest trades for the market
    const trades = await this.prismaService.trade.findMany({
      where: {
        marketID: market.id,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        outcome: {
          select: {
            id: true,
            outcome_title: true,
          },
        },
        market: {
          select: {
            id: true,
            marketId: true,
            contract_address: true,
          },
        },
      },
      orderBy: {
        createdAt: query.sort === 'asc' ? 'asc' : 'desc',
      },
      take: query.limit,
    });

    return trades.map((trade): LatestTradeResponseDto => {
      const shares = Number(trade.afterPrice) > 0
        ? Number(trade.amount) / Number(trade.afterPrice)
        : Number(trade.order_size);

      return {
        id: trade.unique_id,
        marketId: trade.market?.marketId || trade.market?.contract_address || String(trade.marketID),
        userId: String(trade.userID),
        username: trade.user?.username || 'Anonymous',
        outcome: trade.outcome?.outcome_title || 'Unknown',
        type: trade.order_type,
        amount: Number(trade.amount),
        price: Number(trade.afterPrice),
        timestamp: trade.createdAt.toISOString(),
        shares: Math.round(shares),
      };
    });
  }

  async getLatestTradesByContractAddress(
    contractAddress: string,
    query: GetLatestTradesDto,
  ): Promise<LatestTradeResponseDto[]> {
    return this.getLatestTradesByMarketId(contractAddress, query);
  }

}