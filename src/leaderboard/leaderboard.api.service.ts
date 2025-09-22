// leaderboard-api.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export interface LeaderboardResponse {
  week: number;
  status: string;
  startTime: string;
  endTime: string;
  rewardPool: string;
  traders: {
    walletAddress: string;
    fpPoints: string;
    rank: number;
    isTopK: boolean;
  }[];
  creators: {
    walletAddress: string;
    fpPoints: string;
    rank: number;
    isTopK: boolean;
  }[];
}

@Injectable()
export class LeaderboardApiService {
  constructor(private prisma: PrismaService) {}

  async getCurrentWeekLeaderboard(): Promise<LeaderboardResponse | null> {
    const currentWeek = await this.prisma.weeklyLeaderboard.findFirst({
      orderBy: { weekNumber: 'desc' },
      include: {
        traders: {
          orderBy: { rank: 'asc' },
        },
        creators: {
          orderBy: { rank: 'asc' },
        },
      },
    });

    if (!currentWeek) return null;

    return {
      week: currentWeek.weekNumber,
      status: currentWeek.status,
      startTime: currentWeek.startTime.toString(),
      endTime: currentWeek.endTime.toString(),
      rewardPool: currentWeek.rewardPool,
      traders: currentWeek.traders.map(trader => ({
        walletAddress: trader.walletAddress,
        fpPoints: trader.fpPoints,
        rank: trader.rank ?? 0, // Handle null rank
        isTopK: trader.isTopK,
      })),
      creators: currentWeek.creators.map(creator => ({
        walletAddress: creator.walletAddress,
        fpPoints: creator.fpPoints,
        rank: creator.rank ?? 0, // Handle null rank
        isTopK: creator.isTopK,
      })),
    };
  }

  async getWeekLeaderboard(weekNumber: number): Promise<LeaderboardResponse | null> {
    const week = await this.prisma.weeklyLeaderboard.findUnique({
      where: { weekNumber },
      include: {
        traders: {
          orderBy: { rank: 'asc' },
        },
        creators: {
          orderBy: { rank: 'asc' },
        },
      },
    });

    if (!week) return null;

    return {
      week: week.weekNumber,
      status: week.status,
      startTime: week.startTime.toString(),
      endTime: week.endTime.toString(),
      rewardPool: week.rewardPool,
      traders: week.traders.map(trader => ({
        walletAddress: trader.walletAddress,
        fpPoints: trader.fpPoints,
        rank: trader.rank ?? 0, // Handle null rank
        isTopK: trader.isTopK,
      })),
      creators: week.creators.map(creator => ({
        walletAddress: creator.walletAddress,
        fpPoints: creator.fpPoints,
        rank: creator.rank ?? 0, // Handle null rank
        isTopK: creator.isTopK,
      })),
    };
  }

  async getAllWeeks(): Promise<{
    weekNumber: number;
    status: string;
    startTime: string;
    endTime: string;
    rewardPool: string;
    tradersCount: number;
    creatorsCount: number;
  }[]> {
    const weeks = await this.prisma.weeklyLeaderboard.findMany({
      orderBy: { weekNumber: 'desc' },
      include: {
        _count: {
          select: {
            traders: true,
            creators: true,
          },
        },
      },
    });

    return weeks.map(week => ({
      weekNumber: week.weekNumber,
      status: week.status,
      startTime: week.startTime.toString(),
      endTime: week.endTime.toString(),
      rewardPool: week.rewardPool,
      tradersCount: week._count.traders,
      creatorsCount: week._count.creators,
    }));
  }

  async getTraderHistory(walletAddress: string): Promise<{
    weekNumber: number;
    fpPoints: string;
    rank: number;
    isTopK: boolean;
    weekStatus: string;
  }[]> {
    const traderHistory = await this.prisma.weeklyTrader.findMany({
      where: { walletAddress },
      include: {
        weeklyLeaderboard: {
          select: {
            status: true,
          },
        },
      },
      orderBy: { weekNumber: 'desc' },
    });

    return traderHistory.map(entry => ({
      weekNumber: entry.weekNumber,
      fpPoints: entry.fpPoints,
      rank: entry.rank ?? 0, // Handle null rank
      isTopK: entry.isTopK,
      weekStatus: entry.weeklyLeaderboard.status, // Enum will be converted to string
    }));
  }

  async getCreatorHistory(walletAddress: string): Promise<{
    weekNumber: number;
    fpPoints: string;
    rank: number;
    isTopK: boolean;
    weekStatus: string;
  }[]> {
    const creatorHistory = await this.prisma.weeklyCreator.findMany({
      where: { walletAddress },
      include: {
        weeklyLeaderboard: {
          select: {
            status: true,
          },
        },
      },
      orderBy: { weekNumber: 'desc' },
    });

    return creatorHistory.map(entry => ({
      weekNumber: entry.weekNumber,
      fpPoints: entry.fpPoints,
      rank: entry.rank ?? 0, // Handle null rank
      isTopK: entry.isTopK,
      weekStatus: entry.weeklyLeaderboard.status, // Enum will be converted to string
    }));
  }

  async getTopKTraders(weekNumber?: number): Promise<{
    walletAddress: string;
    fpPoints: string;
    rank: number;
    weekNumber: number;
  }[]> {
    const whereClause = weekNumber 
      ? { weekNumber, isTopK: true }
      : { isTopK: true };

    const topTraders = await this.prisma.weeklyTrader.findMany({
      where: whereClause,
      orderBy: weekNumber ? { rank: 'asc' } : [{ weekNumber: 'desc' }, { rank: 'asc' }],
      take: weekNumber ? undefined : 50, // Limit to 50 for all-time query
    });

    return topTraders.map(trader => ({
      walletAddress: trader.walletAddress,
      fpPoints: trader.fpPoints,
      rank: trader.rank ?? 0, // Handle null rank
      weekNumber: trader.weekNumber,
    }));
  }

  async getTopKCreators(weekNumber?: number): Promise<{
    walletAddress: string;
    fpPoints: string;
    rank: number;
    weekNumber: number;
  }[]> {
    const whereClause = weekNumber 
      ? { weekNumber, isTopK: true }
      : { isTopK: true };

    const topCreators = await this.prisma.weeklyCreator.findMany({
      where: whereClause,
      orderBy: weekNumber ? { rank: 'asc' } : [{ weekNumber: 'desc' }, { rank: 'asc' }],
      take: weekNumber ? undefined : 50, // Limit to 50 for all-time query
    });

    return topCreators.map(creator => ({
      walletAddress: creator.walletAddress,
      fpPoints: creator.fpPoints,
      rank: creator.rank ?? 0, // Handle null rank
      weekNumber: creator.weekNumber,
    }));
  }

  async getLeaderboardStats(): Promise<{
    totalWeeks: number;
    totalTraders: number;
    totalCreators: number;
    totalRewardPool: string;
    currentWeek: number | null;
  }> {
    const [
      totalWeeks,
      uniqueTraders,
      uniqueCreators,
      currentWeek
    ] = await Promise.all([
      this.prisma.weeklyLeaderboard.count(),
      this.prisma.weeklyTrader.findMany({ distinct: ['walletAddress'] }),
      this.prisma.weeklyCreator.findMany({ distinct: ['walletAddress'] }),
      this.prisma.weeklyLeaderboard.findFirst({
        orderBy: { weekNumber: 'desc' },
        select: { weekNumber: true }
      })
    ]);

    // Calculate total reward pool manually since rewardPool is a string
    const allWeeks = await this.prisma.weeklyLeaderboard.findMany({
      select: { rewardPool: true }
    });
    
    const totalRewardPool = allWeeks.reduce((sum, week) => {
      return sum + BigInt(week.rewardPool || '0');
    }, BigInt(0));

    return {
      totalWeeks,
      totalTraders: uniqueTraders.length,
      totalCreators: uniqueCreators.length,
      totalRewardPool: totalRewardPool.toString(),
      currentWeek: currentWeek?.weekNumber || null,
    };
  }
}