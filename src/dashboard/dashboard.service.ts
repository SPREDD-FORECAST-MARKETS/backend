import { Injectable, NotFoundException } from '@nestjs/common';
import { Express } from 'express';
import { PointType } from 'generated/prisma';
import { Decimal } from 'generated/prisma/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';



export interface MarketVolumeResponse {
  marketId: number;
  marketQuestion: string;
  totalVolume: string;
  totalTrades: number;
  buyVolume: string;
  sellVolume: string;
  buyTradesCount: number;
  sellTradesCount: number;
}

export interface DetailedMarketVolumeResponse {
  marketId: number;
  marketQuestion: string;
  totalVolume: string;
  totalTrades: number;
  outcomes: Array<{
    outcomeId: number;
    outcomeTitle: string;
    buyVolume: string;
    sellVolume: string;
    totalOutcomeVolume: string;
    tradesCount: number;
  }>;
}

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) { }

  async getLeaderboard(pointType: PointType, limit = 10) {
    return this.prisma.leaderBoard.findMany({
      where: { pointType },
      orderBy: { points: 'desc' },
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            wallet_address: true,
            profile_pic: true
          }
        },
      },
    });
  }

  async getMostTradedMarketsIn24Hours(limit = 10) {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    // Gets trade counts and volume aggregated by market
    const groupedTrades = await this.prisma.trade.groupBy({
      by: ['marketID'],
      where: {
        createdAt: { gte: oneWeekAgo },
        marketID: { not: null }
      },
      _count: {
        marketID: true,
      },
      _sum: {
        amount: true,
      },
      orderBy: {
        _count: {
          marketID: 'desc',
        },
      },
      take: limit * 2, // Get more initially to ensure we have enough after filtering
    });

    const marketIds = groupedTrades.map((t) => t.marketID).filter((id): id is number => id !== null);

    const markets = await this.prisma.market.findMany({
      where: { id: { in: marketIds }, isResolved: false },
      include: {
        creator: {
          select: {
            username: true,
            wallet_address: true,
          },
        },
      },
    });

    // Calculate hot scores and add volume data
    const marketsWithHotScore = markets
      .map((market) => {
        const tradeData = groupedTrades.find((t) => t.marketID === market.id);
        const tradeCount = tradeData?._count.marketID || 0;
        const totalVolume = tradeData?._sum.amount || new Decimal(0);
        
        // Convert volume to number for hot score calculation
        const volumeNumber = Number(totalVolume);
        
        // Hot score: 60% volume weight + 40% trade count weight
        // Normalize volume by dividing by 1M (1e6) and trade count by multiplying by 40
        const hotScore = (volumeNumber * 0.6) + (tradeCount * 40 * 0.4);
        
        return {
          ...market,
          tradeCount,
          totalVolume: totalVolume.toString(),
          hotScore,
        };
      })
      .sort((a, b) => b.hotScore - a.hotScore)
      .slice(0, limit); // Take only the requested limit

    return marketsWithHotScore;
  }


  async getMarketVolume(marketId: number): Promise<MarketVolumeResponse> {
    // First check if market exists
    const market = await this.prisma.market.findUnique({
      where: { id: marketId },
      select: { id: true, question: true }
    });

    if (!market) {
      throw new Error('Market not found');
    }

    // Get all trades for this market with aggregation
    const tradeStats = await this.prisma.trade.groupBy({
      by: ['order_type'],
      where: {
        marketID: marketId
      },
      _sum: {
        amount: true
      },
      _count: {
        id: true
      }
    });

    // Initialize volumes
    let buyVolume = new Decimal(0);
    let sellVolume = new Decimal(0);
    let buyTradesCount = 0;
    let sellTradesCount = 0;

    // Process aggregated results
    tradeStats.forEach(stat => {
      if (stat.order_type === 'BUY') {
        buyVolume = stat._sum.amount || new Decimal(0);
        buyTradesCount = stat._count.id;
      } else if (stat.order_type === 'SELL') {
        sellVolume = stat._sum.amount || new Decimal(0);
        sellTradesCount = stat._count.id;
      }
    });

    const totalVolume = buyVolume.add(sellVolume);
    const totalTrades = buyTradesCount + sellTradesCount;

    return {
      marketId: market.id,
      marketQuestion: market.question,
      totalVolume: totalVolume.toString(),
      totalTrades,
      buyVolume: buyVolume.toString(),
      sellVolume: sellVolume.toString(),
      buyTradesCount,
      sellTradesCount
    };
  }

  async getDetailedMarketVolume(marketId: number): Promise<DetailedMarketVolumeResponse> {
    // Check if market exists and get outcomes
    const market = await this.prisma.market.findUnique({
      where: { id: marketId },
      include: {
        outcome: {
          select: {
            id: true,
            outcome_title: true
          }
        }
      }
    });

    if (!market) {
      throw new Error('Market not found');
    }

    // Get trade stats grouped by outcome and order type
    const tradeStatsByOutcome = await this.prisma.trade.groupBy({
      by: ['outcomeId', 'order_type'],
      where: {
        marketID: marketId,
        outcomeId: { not: null }
      },
      _sum: {
        amount: true
      },
      _count: {
        id: true
      }
    });

    // Process outcomes
    const outcomes = market.outcome.map(outcome => {
      const outcomeStats = tradeStatsByOutcome.filter(stat => stat.outcomeId === outcome.id);

      let buyVolume = new Decimal(0);
      let sellVolume = new Decimal(0);
      let tradesCount = 0;

      outcomeStats.forEach(stat => {
        if (stat.order_type === 'BUY') {
          buyVolume = stat._sum.amount || new Decimal(0);
        } else if (stat.order_type === 'SELL') {
          sellVolume = stat._sum.amount || new Decimal(0);
        }
        tradesCount += stat._count.id;
      });

      const totalOutcomeVolume = buyVolume.add(sellVolume);

      return {
        outcomeId: outcome.id,
        outcomeTitle: outcome.outcome_title,
        buyVolume: buyVolume.toString(),
        sellVolume: sellVolume.toString(),
        totalOutcomeVolume: totalOutcomeVolume.toString(),
        tradesCount
      };
    });

    // Calculate totals
    const totalVolume = outcomes.reduce((sum, outcome) =>
      sum.add(new Decimal(outcome.totalOutcomeVolume)), new Decimal(0)
    );
    const totalTrades = outcomes.reduce((sum, outcome) => sum + outcome.tradesCount, 0);

    return {
      marketId: market.id,
      marketQuestion: market.question,
      totalVolume: totalVolume.toString(),
      totalTrades,
      outcomes
    };
  }


  async getRandomUnreadNews() {
    try {
      // First, get count of unread news
      const unreadCount = await this.prisma.news.count({
        where: { isRead: false }
      });

      if (unreadCount === 0) {
        throw new NotFoundException('No unread news available');
      }

      const randomOffset = Math.floor(Math.random() * unreadCount);

      const randomNews = await this.prisma.news.findFirst({
        where: { isRead: false },
        skip: randomOffset,
        orderBy: { createdAt: 'desc' }
      });

      if (!randomNews) {
        throw new NotFoundException('No unread news found');
      }

      // Mark the news as read
      const updatedNews = await this.prisma.news.update({
        where: { id: randomNews.id },
        data: { isRead: true }
      });

      return {
        success: true,
        data: updatedNews,
        message: 'Random news retrieved and marked as read'
      };

    } catch (error) {
      console.log('Failed to get random unread news:', error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new Error('Failed to retrieve news');
    }
  }


}