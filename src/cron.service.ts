import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { createPublicClient, http, parseAbi } from 'viem';
import { baseSepolia, CONTRACT_ADDRESSES } from './utils/chain-config';
import { PrismaService } from './prisma/prisma.service';
import { FP_MANAGER_ABI } from './abi/FPManager';
import { PointType } from 'generated/prisma';

interface TopPerformersResult {
  topTraders: `0x${string}`[];
  traderFP: bigint[];
  topCreators: `0x${string}`[];
  creatorFP: bigint[];
}

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private prisma: PrismaService) { }


  private client = createPublicClient({
    chain: baseSepolia,
    transport: http(`https://base-sepolia.infura.io/v3/${process.env.INFURA_KEY}`),
  });

  private async getUserIdByAddress(wallet_address: string): Promise<number | null> {
    const user = await this.prisma.user.findFirst({
      where: { wallet_address },
    });
    return user?.id ?? null;
  }


  @Cron('0 */2 * * *') // Every 2 hours 
  async handleNews() {
    this.logger.log('🔁 Task 2: Logging News..');

    const crypto_coins_resp = await fetch(`https://newsdata.io/api/1/latest?apikey=${process.env.NEWS_DATA_API_KEY}&q=crypto%20coins&language=en`);
    const crypto_resp = await fetch(`https://newsdata.io/api/1/latest?apikey=${process.env.NEWS_DATA_API_KEY}&q=crypto&language=en`);
    const blockchain_resp = await fetch(`https://newsdata.io/api/1/latest?apikey=${process.env.NEWS_DATA_API_KEY}&q=blockchain&language=en`);

    if (crypto_coins_resp.status !== 200 || crypto_resp.status !== 200 || blockchain_resp.status !== 200) {
      this.logger.log('🔁 Task 2: News Data api returned error, status: ', crypto_resp);
      return;
    }

    const crypto_coins_data = await crypto_coins_resp.json();
    const crypto_resp_data = await crypto_resp.json();
    const blockchain_resp_data = await blockchain_resp.json();

    let news_data: {
      title: string;
      description: string;
      source: string;
      image: string;
    }[] = [];

    // Helper function to safely extract news data
    const extractNewsData = (news: any) => ({
      title: news.title || "No News for now lets talk about Spredd Markets",
      description: news.description || "No News for now lets talk about Spredd Markets",
      source: news.source_name || "No News for now lets talk about Spredd Markets",
      image: news.image_url || "https://spredd.markets/logo.jpg"
    });

    // Apply consistent null handling to all API responses
    crypto_coins_data.results?.forEach(news => {
      news_data.push(extractNewsData(news));
    });

    crypto_resp_data.results?.forEach(news => {
      news_data.push(extractNewsData(news));
    });

    blockchain_resp_data.results?.forEach(news => {
      news_data.push(extractNewsData(news));
    });

    // Shuffle the news data
    news_data = news_data.sort(() => Math.random() - 0.5);

    // Filter out any potential duplicates or invalid entries
    const validNewsData = news_data.filter(item =>
      item.title && item.description && item.source
    );

    if (validNewsData.length === 0) {
      this.logger.log('🔁 Task 2: No valid news data to insert');
      return;
    }

    try {
      await this.prisma.news.createMany({
        data: validNewsData,
        skipDuplicates: true // This prevents errors if you have unique constraints
      });

      this.logger.log(`🔁 Task 2: ${validNewsData.length} News items logged successfully`);
    } catch (error) {
      this.logger.error('🔁 Task 2: Failed to insert news data:', error);
    }
  }

  @Cron('0 0 * * *') // At 00:00 (midnight) every day
  async deleteOldNews() {
    this.logger.log('🗑️ Task: Deleting all news from database...');

    await this.prisma.news.deleteMany({});

    this.logger.log('✅ Task: All news deleted successfully.');
  }


  @Cron('*/100 * * * * *') // Every 10 seconds
  async handleTaskOne() {
    this.logger.log('🔁 Task 1: Run every minute');

    // Sync top traders
    const currentWeekTopPerformers = await this.client.readContract({
      address: CONTRACT_ADDRESSES.fpManager as `0x${string}`,
      abi: FP_MANAGER_ABI,
      functionName: 'getCurrentWeekTopPerformers',
      args: [10n], // BigInt for uint256 _count parameter
    });


    const [topTraders, traderFP, topCreators, creatorFP] = currentWeekTopPerformers as [
      `0x${string}`[],
      bigint[],
      `0x${string}`[],
      bigint[]
    ];

    // set tranders leaderboard
    for (let i = 0; i < topTraders.length; i++) {
      const userAddress = topTraders[i];
      const points = Number(traderFP[i]);

      const userId = await this.getUserIdByAddress(userAddress);
      if (!userId) return;

      await this.prisma.leaderBoard.upsert({
        where: {
          userID_pointType: {
            userID: userId,
            pointType: PointType.TRADER,
          },
        },
        create: {
          userID: userId,
          pointType: PointType.TRADER,
          points,
        },
        update: {
          points,
        },
      });
    }


    // Upsert CREATOR leaderboard
    for (let i = 0; i < topCreators.length; i++) {
      const userAddress = topCreators[i];
      const points = Number(creatorFP[i]);

      const userId = await this.getUserIdByAddress(userAddress);
      if (!userId) continue;

      await this.prisma.leaderBoard.upsert({
        where: {
          userID_pointType: {
            userID: userId,
            pointType: PointType.CREATOR,
          },
        },
        create: {
          userID: userId,
          pointType: PointType.CREATOR,
          points,
        },
        update: {
          points,
        },
      });
    }

    this.logger.log('LeaderBoard Updated');

  }
}
