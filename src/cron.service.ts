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
    const user = await this.prisma.user.findUnique({
      where: { wallet_address },
    });
    return user?.id ?? null;
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
      if (!userId) continue;

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
