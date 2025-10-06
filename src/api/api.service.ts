import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetMarketsQueryDto } from './dto/get-markets-query.dto';

@Injectable()
export class ApiService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMarkets(query: GetMarketsQueryDto) {
    const {
      page = 1,
      limit = 20,
      status,
      resolved,
      tags,
      search,
      creator
    } = query;

    // Validate and sanitize inputs
    const pageNum = Math.max(1, parseInt(String(page), 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(String(limit), 10)));
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (typeof resolved === 'boolean') {
      where.isResolved = resolved;
    }

    if (tags && Array.isArray(tags)) {
      where.tags = {
        hasSome: tags
      };
    }

    if (search) {
      where.OR = [
        {
          question: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          description: {
            contains: search,
            mode: 'insensitive'
          }
        }
      ];
    }

    if (creator) {
      where.creator = {
        wallet_address: creator
      };
    }

    const [markets, total] = await Promise.all([
      this.prismaService.market.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: {
          createdAt: 'desc'
        },
        select: {
          id: true,
          question: true,
          description: true,
          status: true,
          isResolved: true,
          winningOutcome: true,
          expiry_date: true,
          createdAt: true,
          contract_address: true,
          marketId: true,
          tags: true,
          image: true,
          creator: {
            select: {
              username: true,
              wallet_address: true
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
      this.prismaService.market.count({ where })
    ]);

    return {
      success: true,
      data: markets.map(market => ({
        ...market,
        outcomes: market.outcome
      })),
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      }
    };
  }

  async getMarket(id: number) {
    const market = await this.prismaService.market.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            wallet_address: true
          }
        },
        outcome: {
          select: {
            id: true,
            outcome_title: true,
            current_supply: true,
            total_liquidity: true
          }
        }
      }
    });

    if (!market) {
      throw new NotFoundException('Market not found');
    }

    return {
      success: true,
      data: {
        ...market,
        outcomes: market.outcome,
        outcome: undefined // Remove the original outcome field
      }
    };
  }

  async getMarketTrades(marketId: number, page: number = 1, limit: number = 20) {
    const pageNum = Math.max(1, page);
    const limitNum = Math.min(100, Math.max(1, limit));
    const skip = (pageNum - 1) * limitNum;

    // Verify market exists
    const market = await this.prismaService.market.findUnique({
      where: { id: marketId },
      select: { id: true }
    });

    if (!market) {
      throw new NotFoundException('Market not found');
    }

    const [trades, total] = await Promise.all([
      this.prismaService.trade.findMany({
        where: { marketID: marketId },
        skip,
        take: limitNum,
        orderBy: {
          createdAt: 'desc'
        },
        select: {
          id: true,
          unique_id: true,
          order_type: true,
          order_size: true,
          amount: true,
          afterPrice: true,
          createdAt: true,
          user: {
            select: {
              username: true,
              wallet_address: true
            }
          },
          outcome: {
            select: {
              outcome_title: true
            }
          }
        }
      }),
      this.prismaService.trade.count({
        where: { marketID: marketId }
      })
    ]);

    return {
      success: true,
      data: trades,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      }
    };
  }

  async getMarketChart(marketId: number, interval?: string, from?: string, to?: string) {
    // Verify market exists
    const market = await this.prismaService.market.findUnique({
      where: { id: marketId },
      select: { id: true }
    });

    if (!market) {
      throw new NotFoundException('Market not found');
    }

    const where: any = { marketId };

    if (from) {
      where.timestamp = { ...where.timestamp, gte: new Date(from) };
    }

    if (to) {
      where.timestamp = { ...where.timestamp, lte: new Date(to) };
    }

    // If no specific interval, get last 100 data points
    if (!interval) {
      const chartData = await this.prismaService.marketPriceSnapshot.findMany({
        where,
        orderBy: { timestamp: 'asc' },
        take: 100,
        select: {
          timestamp: true,
          noOdds: true,
          yesOdds: true,
          totalVolume: true
        }
      });

      return {
        success: true,
        data: chartData.map(point => ({
          timestamp: point.timestamp,
          noOdds: point.noOdds.toString(),
          yesOdds: point.yesOdds.toString(),
          totalVolume: point.totalVolume.toString()
        }))
      };
    }

    // Handle interval-based aggregation
    const intervalToSeconds = {
      '10s': 10,
      '1m': 60,
      '5m': 300,
      '1h': 3600,
      '1d': 86400,
      '1mo': 2592000
    };

    const intervalSeconds = intervalToSeconds[interval];
    if (!intervalSeconds) {
      throw new Error(`Invalid interval: ${interval}`);
    }

    const rawData = await this.prismaService.marketPriceSnapshot.findMany({
      where,
      orderBy: { timestamp: 'asc' },
      select: {
        timestamp: true,
        noOdds: true,
        yesOdds: true,
        totalVolume: true
      }
    });

    // Group by interval
    const groups = new Map<string, any[]>();
    
    rawData.forEach(item => {
      const timestamp = new Date(item.timestamp);
      const intervalStart = new Date(
        Math.floor(timestamp.getTime() / (intervalSeconds * 1000)) * intervalSeconds * 1000
      );
      const key = intervalStart.toISOString();
      
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key)!.push(item);
    });

    // Calculate averages for each group
    const result: Array<{
      timestamp: string;
      noOdds: string;
      yesOdds: string;
      totalVolume: string;
    }> = [];
    for (const [key, items] of groups.entries()) {
      const avgNoOdds = items.reduce((sum, item) => sum + Number(item.noOdds), 0) / items.length;
      const avgYesOdds = items.reduce((sum, item) => sum + Number(item.yesOdds), 0) / items.length;
      const avgTotalVolume = items.reduce((sum, item) => sum + Number(item.totalVolume), 0) / items.length;

      result.push({
        timestamp: key,
        noOdds: Math.round(avgNoOdds).toString(),
        yesOdds: Math.round(avgYesOdds).toString(),
        totalVolume: Math.round(avgTotalVolume).toString(),
      });
    }

    return {
      success: true,
      data: result.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    };
  }

  async getResolvedMarkets(page: number = 1, limit: number = 20, outcome?: string) {
    const pageNum = Math.max(1, page);
    const limitNum = Math.min(100, Math.max(1, limit));
    const skip = (pageNum - 1) * limitNum;

    const where: any = { isResolved: true };

    if (outcome) {
      where.winningOutcome = outcome;
    }

    const [markets, total] = await Promise.all([
      this.prismaService.market.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: {
          updatedAt: 'desc'
        },
        select: {
          id: true,
          question: true,
          description: true,
          winningOutcome: true,
          expiry_date: true,
          createdAt: true,
          updatedAt: true,
          contract_address: true,
          marketId: true,
          tags: true,
          image: true,
          creator: {
            select: {
              username: true,
              wallet_address: true
            }
          }
        }
      }),
      this.prismaService.market.count({ where })
    ]);

    return {
      success: true,
      data: markets,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      }
    };
  }

  async getStats() {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const [
      totalMarkets,
      activeMarkets,
      resolvedMarkets,
      totalTrades,
      totalUsers,
      totalVolumeResult,
      last24hVolumeResult,
      last24hTrades
    ] = await Promise.all([
      this.prismaService.market.count(),
      this.prismaService.market.count({ where: { status: 'ACTIVE' } }),
      this.prismaService.market.count({ where: { isResolved: true } }),
      this.prismaService.trade.count(),
      this.prismaService.user.count(),
      this.prismaService.trade.aggregate({
        _sum: { amount: true }
      }),
      this.prismaService.trade.aggregate({
        where: { createdAt: { gte: oneDayAgo } },
        _sum: { amount: true }
      }),
      this.prismaService.trade.count({
        where: { createdAt: { gte: oneDayAgo } }
      })
    ]);

    return {
      success: true,
      data: {
        totalMarkets,
        activeMarkets,
        resolvedMarkets,
        totalTrades,
        totalUsers,
        totalVolume: totalVolumeResult._sum.amount?.toString() || '0',
        last24hVolume: last24hVolumeResult._sum.amount?.toString() || '0',
        last24hTrades
      }
    };
  }

  async getMarketStats(marketId: number) {
    const market = await this.prismaService.market.findUnique({
      where: { id: marketId },
      select: { id: true }
    });

    if (!market) {
      throw new NotFoundException('Market not found');
    }

    const [
      totalTrades,
      totalVolume,
      uniqueTraders,
      yesOutcome,
      noOutcome,
      recentTrades
    ] = await Promise.all([
      this.prismaService.trade.count({
        where: { marketID: marketId }
      }),
      this.prismaService.trade.aggregate({
        where: { marketID: marketId },
        _sum: { amount: true }
      }),
      this.prismaService.trade.findMany({
        where: { marketID: marketId },
        select: { userID: true },
        distinct: ['userID']
      }),
      this.prismaService.outcome.findFirst({
        where: { 
          marketID: marketId,
          outcome_title: 'YES'
        },
        select: {
          current_supply: true,
          total_liquidity: true
        }
      }),
      this.prismaService.outcome.findFirst({
        where: { 
          marketID: marketId,
          outcome_title: 'NO'
        },
        select: {
          current_supply: true,
          total_liquidity: true
        }
      }),
      this.prismaService.trade.findMany({
        where: { marketID: marketId },
        take: 10,
        orderBy: { createdAt: 'desc' },
        select: {
          order_type: true,
          amount: true,
          createdAt: true,
          outcome: {
            select: { outcome_title: true }
          }
        }
      })
    ]);

    return {
      success: true,
      data: {
        marketId,
        totalTrades,
        totalVolume: totalVolume._sum.amount?.toString() || '0',
        uniqueTraders: uniqueTraders.length,
        outcomes: {
          yes: {
            supply: yesOutcome?.current_supply?.toString() || '0',
            liquidity: yesOutcome?.total_liquidity?.toString() || '0'
          },
          no: {
            supply: noOutcome?.current_supply?.toString() || '0',
            liquidity: noOutcome?.total_liquidity?.toString() || '0'
          }
        },
        recentTrades
      }
    };
  }

  async getCreators(page: number = 1, limit: number = 20, sortBy: string = 'markets') {
    const pageNum = Math.max(1, page);
    const limitNum = Math.min(100, Math.max(1, limit));
    const skip = (pageNum - 1) * limitNum;

    // Get creators with their market counts
    const creators = await this.prismaService.user.findMany({
      where: {
        markets: {
          some: {}
        }
      },
      skip,
      take: limitNum,
      select: {
        id: true,
        username: true,
        wallet_address: true,
        profile_pic: true,
        createdAt: true,
        _count: {
          select: {
            markets: true
          }
        },
        markets: {
          select: {
            isResolved: true,
            winningOutcome: true,
            trades: {
              select: {
                amount: true
              }
            }
          }
        }
      }
    });

    const enrichedCreators = creators.map(creator => {
      const resolvedMarkets = creator.markets.filter(m => m.isResolved).length;
      const totalVolume = creator.markets.reduce((acc, market) => {
        const marketVolume = market.trades.reduce((sum, trade) => sum + Number(trade.amount), 0);
        return acc + marketVolume;
      }, 0);

      return {
        id: creator.id,
        username: creator.username,
        wallet_address: creator.wallet_address,
        profile_pic: creator.profile_pic,
        createdAt: creator.createdAt,
        stats: {
          totalMarkets: creator._count.markets,
          resolvedMarkets,
          totalVolume: totalVolume.toString()
        }
      };
    });

    // Sort based on sortBy parameter
    if (sortBy === 'volume') {
      enrichedCreators.sort((a, b) => Number(b.stats.totalVolume) - Number(a.stats.totalVolume));
    } else if (sortBy === 'accuracy') {
      enrichedCreators.sort((a, b) => {
        const accuracyA = a.stats.resolvedMarkets / Math.max(a.stats.totalMarkets, 1);
        const accuracyB = b.stats.resolvedMarkets / Math.max(b.stats.totalMarkets, 1);
        return accuracyB - accuracyA;
      });
    }

    const total = await this.prismaService.user.count({
      where: {
        markets: {
          some: {}
        }
      }
    });

    return {
      success: true,
      data: enrichedCreators,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      }
    };
  }

  async getLeaderboard(type: string = 'TRADER', limit: number = 50) {
    const limitNum = Math.min(100, Math.max(1, limit));
    const pointType = type === 'CREATOR' ? 'CREATOR' : 'TRADER';

    const leaderboard = await this.prismaService.leaderBoard.findMany({
      where: { pointType },
      take: limitNum,
      orderBy: { points: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            wallet_address: true,
            profile_pic: true
          }
        }
      }
    });

    return {
      success: true,
      data: leaderboard.map((entry, index) => ({
        rank: index + 1,
        user: entry.user,
        points: entry.points,
        pointType: entry.pointType
      }))
    };
  }

  async getNews(page: number = 1, limit: number = 20) {
    const pageNum = Math.max(1, page);
    const limitNum = Math.min(100, Math.max(1, limit));
    const skip = (pageNum - 1) * limitNum;

    const [news, total] = await Promise.all([
      this.prismaService.news.findMany({
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          description: true,
          source: true,
          image: true,
          createdAt: true,
          updatedAt: true
        }
      }),
      this.prismaService.news.count()
    ]);

    return {
      success: true,
      data: news,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      }
    };
  }

  async getHealth() {
    const startTime = Date.now();
    
    try {
      // Test database connection
      await this.prismaService.$queryRaw`SELECT 1`;
      const dbStatus = 'connected';
      
      // Get basic stats to verify API functionality
      const marketCount = await this.prismaService.market.count();
      
      const responseTime = Date.now() - startTime;
      
      return {
        success: true,
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        uptime: process.uptime(),
        database: dbStatus,
        responseTime: `${responseTime}ms`,
        checks: {
          database: 'ok',
          api: 'ok',
          marketCount
        }
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;
      
      return {
        success: false,
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        uptime: process.uptime(),
        database: 'disconnected',
        responseTime: `${responseTime}ms`,
        error: error.message,
        checks: {
          database: 'failed',
          api: 'degraded'
        }
      };
    }
  }
}