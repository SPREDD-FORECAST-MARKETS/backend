import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  createPublicClient,
  createWalletClient,
  http,
  parseAbi,
  Address,
} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { base } from 'viem/chains';

interface TraderData {
  address: Address;
  fpPoints: bigint;
}

interface CreatorData {
  address: Address;
  fpPoints: bigint;
}

@Injectable()
export class LeaderboardService {
  private readonly logger = new Logger(LeaderboardService.name);
  private publicClient: any;
  private walletClient: any;
  private account: any;
  private fpManagerAddress: Address;
  private isProcessing = false;
  private lastProcessingTime = 0;
  private readonly PROCESSING_TIMEOUT = 5 * 60 * 1000; // 5 minutes

  // Updated ABI with necessary functions
  private readonly fpManagerAbi = parseAbi([
    'function getCurrentWeekInfo() view returns (uint256 week, uint256 startTime, uint256 endTime, uint256 tradersCount, uint256 creatorsCount, uint256 topKSetting, uint256 currentRewardPool)',
    'function weekStatus(uint256) view returns (uint8)',
    'function currentTraders(uint256) view returns (address)',
    'function currentCreators(uint256) view returns (address)',
    'function weeklyTraderFP(address) view returns (uint256)',
    'function weeklyCreatorFP(address) view returns (uint256)',
    'function historicalTraderFP(uint256, address) view returns (uint256)',
    'function historicalCreatorFP(uint256, address) view returns (uint256)',
    'function getPendingWeeks() view returns (uint256[] pendingWeeks, uint256[] rewardPools)',
    'function forceWeeklyReset()',
    'function getWeekEndTime(uint256 _week) view returns (uint256)',
    'function submitWeeklyLeaderboard(uint256 _week, address[] _topTraders, uint256[] _traderFP, address[] _topCreators, uint256[] _creatorFP)',
    'function currentWeek() view returns (uint256)',
    'function WEEK_DURATION() view returns (uint256)',
    'function weekStartTime() view returns (uint256)',
    'event WeeklyLeaderboardSubmitted(uint256 indexed week, address[] topTraders, uint256[] traderFP, address[] topCreators, uint256[] creatorFP, address submitter)',
    'event WeekEnded(uint256 indexed week, uint256 endTime, uint256 participantCount)',
  ]);

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService, // Add PrismaService
  ) {
    this.initializeClients();
  }

  private async initializeClients() {
    this.logger.log('Initializing Viem clients...');

    const rpcUrl =
      this.configService.get<string>('RPC_URL') || 'https://mainnet.base.org';
    const privateKey = this.configService.get<string>(
      'LEADERBOARD_PRIVATE_KEY',
    ) as `0x${string}`;
    const fpManagerAddress =
      this.configService.get<string>('FP_MANAGER_ADDRESS') ||
      '0xCEa0cE3d2A9284F416a856deE008280fC7BE2fdC';
    const chainName = this.configService.get<string>('CHAIN_NAME') || 'base';

    if (!rpcUrl || !privateKey || !fpManagerAddress) {
      throw new Error(
        'Missing required environment variables: RPC_URL, LEADERBOARD_PRIVATE_KEY, FP_MANAGER_ADDRESS',
      );
    }

    const selectedChain = chainName === 'base' ? base : base;
    this.account = privateKeyToAccount(privateKey);

    this.publicClient = createPublicClient({
      chain: selectedChain,
      transport: http(rpcUrl),
    });

    this.walletClient = createWalletClient({
      account: this.account,
      chain: selectedChain,
      transport: http(rpcUrl),
    });

    this.fpManagerAddress = fpManagerAddress as Address;

    this.logger.log('Connected to RPC:', rpcUrl);
    this.logger.log('Using chain:', chainName);
    this.logger.log('Using FP Manager Address:', fpManagerAddress);
    this.logger.log('Wallet Address:', this.account.address);
    this.logger.log('Leaderboard service initialized with Viem');
  }

  private isStuckProcessing(): boolean {
    const now = Date.now();
    return (
      this.isProcessing &&
      now - this.lastProcessingTime > this.PROCESSING_TIMEOUT
    );
  }

  private resetProcessingIfStuck(): void {
    if (this.isStuckProcessing()) {
      this.logger.warn('Processing appears stuck, resetting state...');
      this.isProcessing = false;
      this.lastProcessingTime = 0;
    }
  }

  /**
   * Force week transition when there's no user activity
   */
  async forceWeekTransition() {
    try {
      this.logger.log('Forcing week transition due to inactivity...');

      const { request } = await this.publicClient.simulateContract({
        address: this.fpManagerAddress,
        abi: this.fpManagerAbi,
        functionName: 'forceWeeklyReset',
        account: this.account,
      });

      const txHash = await this.walletClient.writeContract(request);
      const receipt = await this.publicClient.waitForTransactionReceipt({
        hash: txHash,
      });

      this.logger.log(
        `Week transition forced successfully! Tx: ${txHash}, Gas used: ${receipt.gasUsed.toString()}`,
      );

      return txHash;
    } catch (error) {
      this.logger.error('Error forcing week transition:', error);
      throw error;
    }
  }

  /**
   * Check if week needs manual transition due to inactivity
   */
  async checkForInactiveWeekTransition() {
    try {
      const currentWeekInfo = await this.publicClient.readContract({
        address: this.fpManagerAddress,
        abi: this.fpManagerAbi,
        functionName: 'getCurrentWeekInfo',
      });

      const currentWeek = Number(currentWeekInfo[0]);
      const endTime = Number(currentWeekInfo[2]);
      const tradersCount = Number(currentWeekInfo[3]);
      const creatorsCount = Number(currentWeekInfo[4]);

      const currentStatus = Number(
        await this.publicClient.readContract({
          address: this.fpManagerAddress,
          abi: this.fpManagerAbi,
          functionName: 'weekStatus',
          args: [BigInt(currentWeek)],
        }),
      );

      const now = Math.floor(Date.now() / 1000);
      const weekExpired = now >= endTime;
      const noActivity = tradersCount === 0 && creatorsCount === 0;

      this.logger.log(`Week ${currentWeek} status check:`, {
        weekExpired,
        noActivity,
        currentStatus: ['ACTIVE', 'PENDING_FINALIZE', 'FINALIZED'][
          currentStatus
        ],
        secondsPastEnd: now - endTime,
      });

      // If week is expired, still active, and has no activity, force transition
      if (weekExpired && currentStatus === 0 && noActivity) {
        this.logger.log(
          `Week ${currentWeek} expired with no activity. Forcing transition...`,
        );
        await this.forceWeekTransition();
        return true;
      }

      return false;
    } catch (error) {
      this.logger.error('Error checking for inactive week transition:', error);
      return false;
    }
  }

  @Cron('*/5 * * * *') // Every 5 minutes
  async checkPendingWeeks() {
    this.resetProcessingIfStuck();

    if (this.isProcessing) {
      this.logger.log('Already processing, skipping...');
      return;
    }

    try {
      this.isProcessing = true;
      this.lastProcessingTime = Date.now();
      this.logger.log('Checking for pending weeks...');

      const forcedTransition = await this.checkForInactiveWeekTransition();
      if (forcedTransition) {
        this.logger.log(
          'Week transition was forced, waiting for confirmation...',
        );
        // Wait for the transaction to be mined
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }

      // Get current week info
      const currentWeekInfo = await this.publicClient.readContract({
        address: this.fpManagerAddress,
        abi: this.fpManagerAbi,
        functionName: 'getCurrentWeekInfo',
      });

      const currentWeek = Number(currentWeekInfo[0]);
      const startTime = Number(currentWeekInfo[1]);
      const endTime = Number(currentWeekInfo[2]);
      const rewardPool = currentWeekInfo[6].toString();

      // Store/update current week info in database
      await this.upsertWeeklyLeaderboard(
        currentWeek,
        startTime,
        endTime,
        rewardPool,
      );

      const currentStatus = Number(
        await this.publicClient.readContract({
          address: this.fpManagerAddress,
          abi: this.fpManagerAbi,
          functionName: 'weekStatus',
          args: [BigInt(currentWeek)],
        }),
      );

      const now = Math.floor(Date.now() / 1000);

      // Update week status in database
      await this.updateWeekStatus(currentWeek, currentStatus);

      // Store current participants data
      await this.storeCurrentParticipants(currentWeek);

      // Check current week status
      if (currentStatus === 0 && now >= endTime) {
        this.logger.log(
          `Week ${currentWeek} is ACTIVE but past end time. Waiting for contract interaction to set PENDING_FINALIZE.`,
        );
      } else if (currentStatus === 1) {
        this.logger.log(
          `Week ${currentWeek} is PENDING_FINALIZE. Processing leaderboard.`,
        );
        await this.processWeekLeaderboard(currentWeek);
      } else if (currentStatus === 0) {
        this.logger.log(`Week ${currentWeek} is ACTIVE. No action needed.`);
      } else {
        this.logger.log(`Week ${currentWeek} is FINALIZED.`);
      }

      // Check past pending weeks
      const pendingResult = await this.publicClient.readContract({
        address: this.fpManagerAddress,
        abi: this.fpManagerAbi,
        functionName: 'getPendingWeeks',
      });

      const pendingWeeks = Array.isArray(pendingResult[0])
        ? (pendingResult[0] as bigint[]).map(Number)
        : [];

      if (pendingWeeks.length === 0) {
        this.logger.log('No past pending weeks found.');
      } else {
        this.logger.log(
          `Found ${pendingWeeks.length} pending weeks: ${pendingWeeks.join(', ')}`,
        );
        for (const week of pendingWeeks) {
          if (week !== currentWeek) {
            await this.processWeekLeaderboard(week);
          }
        }
      }
    } catch (error) {
      this.logger.error('Error checking pending weeks:', error);
    } finally {
      this.isProcessing = false;
      this.lastProcessingTime = 0;
    }
  }

  private async upsertWeeklyLeaderboard(
    weekNumber: number,
    startTime: number,
    endTime: number,
    rewardPool: string,
  ) {
    try {
      await this.prisma.weeklyLeaderboard.upsert({
        where: { weekNumber },
        update: {
          rewardPool,
          updatedAt: new Date(),
        },
        create: {
          weekNumber,
          startTime: BigInt(startTime),
          endTime: BigInt(endTime),
          rewardPool,
          status: 'ACTIVE',
        },
      });
    } catch (error) {
      this.logger.error(
        `Error upserting weekly leaderboard for week ${weekNumber}:`,
        error,
      );
    }
  }

  private async updateWeekStatus(weekNumber: number, status: number) {
    const statusMap = ['ACTIVE', 'PENDING_FINALIZE', 'FINALIZED'] as const;
    const weekStatus = statusMap[status] || 'ACTIVE';

    try {
      await this.prisma.weeklyLeaderboard.update({
        where: { weekNumber },
        data: { status: weekStatus },
      });
    } catch (error) {
      this.logger.error(
        `Error updating week status for week ${weekNumber}:`,
        error,
      );
    }
  }

  private async storeCurrentParticipants(weekNumber: number) {
    try {
      const [traders, creators] = await this.getAllParticipants(weekNumber);

      // Store traders
      for (let i = 0; i < traders.length; i++) {
        const trader = traders[i];
        await this.prisma.weeklyTrader.upsert({
          where: {
            weekNumber_walletAddress: {
              weekNumber,
              walletAddress: trader.address,
            },
          },
          update: {
            fpPoints: trader.fpPoints.toString(),
            rank: i + 1,
          },
          create: {
            weekNumber,
            walletAddress: trader.address,
            fpPoints: trader.fpPoints.toString(),
            rank: i + 1,
          },
        });
      }

      // Store creators
      for (let i = 0; i < creators.length; i++) {
        const creator = creators[i];
        await this.prisma.weeklyCreator.upsert({
          where: {
            weekNumber_walletAddress: {
              weekNumber,
              walletAddress: creator.address,
            },
          },
          update: {
            fpPoints: creator.fpPoints.toString(),
            rank: i + 1,
          },
          create: {
            weekNumber,
            walletAddress: creator.address,
            fpPoints: creator.fpPoints.toString(),
            rank: i + 1,
          },
        });
      }

      this.logger.log(
        `Stored ${traders.length} traders and ${creators.length} creators for week ${weekNumber}`,
      );
    } catch (error) {
      this.logger.error(
        `Error storing participants for week ${weekNumber}:`,
        error,
      );
    }
  }

  private async processWeekLeaderboard(week: number) {
    try {
      this.logger.log(`Processing leaderboard for week ${week}`);

      // Get participants from database (more reliable than re-fetching)
      const traders = await this.prisma.weeklyTrader.findMany({
        where: { weekNumber: week },
        orderBy: { rank: 'asc' },
      });

      const creators = await this.prisma.weeklyCreator.findMany({
        where: { weekNumber: week },
        orderBy: { rank: 'asc' },
      });

      if (traders.length === 0 && creators.length === 0) {
        this.logger.warn(
          `No participants found for week ${week}, skipping leaderboard submission`,
        );
        return;
      }

      // Get topK from contract
      const currentWeekInfo = await this.publicClient.readContract({
        address: this.fpManagerAddress,
        abi: this.fpManagerAbi,
        functionName: 'getCurrentWeekInfo',
      });
      const topK = Number(currentWeekInfo.topKSetting);

      // Get top K participants
      const topTraders = traders.slice(0, topK);
      const topCreators = creators.slice(0, topK);

      // Prepare arrays for contract call
      const topTraderAddresses = topTraders.map(
        (t) => t.walletAddress as Address,
      );
      const traderFP = topTraders.map((t) => BigInt(t.fpPoints));
      const topCreatorAddresses = topCreators.map(
        (c) => c.walletAddress as Address,
      );
      const creatorFP = topCreators.map((c) => BigInt(c.fpPoints));

      this.logger.log(`Submitting leaderboard for week ${week}:`);
      this.logger.log(`- Top ${topTraderAddresses.length} traders`);
      this.logger.log(`- Top ${topCreatorAddresses.length} creators`);

      // Mark top K participants in database
      await this.markTopKParticipants(week, topTraders, topCreators);

      // Simulate and submit leaderboard
      const { request } = await this.publicClient.simulateContract({
        address: this.fpManagerAddress,
        abi: this.fpManagerAbi,
        functionName: 'submitWeeklyLeaderboard',
        args: [
          BigInt(week),
          topTraderAddresses,
          traderFP,
          topCreatorAddresses,
          creatorFP,
        ],
        account: this.account,
      });

      const txHash = await this.walletClient.writeContract(request);
      const receipt = await this.publicClient.waitForTransactionReceipt({
        hash: txHash,
      });

      // Update database with submission info
      await this.prisma.weeklyLeaderboard.update({
        where: { weekNumber: week },
        data: {
          txHash,
          submittedAt: new Date(),
          status: 'FINALIZED',
        },
      });

      this.logger.log(
        `Week ${week} leaderboard submitted successfully! Tx: ${txHash}, Gas used: ${receipt.gasUsed.toString()}`,
      );
    } catch (error) {
      this.logger.error(`Error processing week ${week} leaderboard:`, error);
      if (error.cause && error.cause.reason) {
        this.logger.error(`Revert reason: ${error.cause.reason}`);
      }
    }
  }

  private async markTopKParticipants(
    weekNumber: number,
    topTraders: any[],
    topCreators: any[],
  ) {
    try {
      // Mark top traders
      await this.prisma.weeklyTrader.updateMany({
        where: {
          weekNumber,
          walletAddress: { in: topTraders.map((t) => t.walletAddress) },
        },
        data: { isTopK: true },
      });

      // Mark top creators
      await this.prisma.weeklyCreator.updateMany({
        where: {
          weekNumber,
          walletAddress: { in: topCreators.map((c) => c.walletAddress) },
        },
        data: { isTopK: true },
      });
    } catch (error) {
      this.logger.error(
        `Error marking top K participants for week ${weekNumber}:`,
        error,
      );
    }
  }

  // Rest of your existing methods (getAllParticipants, getCurrentParticipants, etc.)
  // ... (keep the same implementation)

  private async getAllParticipants(
    week: number,
  ): Promise<[TraderData[], CreatorData[]]> {
    const traders: TraderData[] = [];
    const creators: CreatorData[] = [];

    try {
      const currentWeek = Number(
        await this.publicClient.readContract({
          address: this.fpManagerAddress,
          abi: this.fpManagerAbi,
          functionName: 'currentWeek',
        }),
      );

      if (week === currentWeek) {
        await this.getCurrentParticipants(traders, creators);
      } else {
        await this.getHistoricalParticipants(traders, creators, week);
      }

      // Sort by FP points descending
      traders.sort((a, b) => Number(b.fpPoints - a.fpPoints));
      creators.sort((a, b) => Number(b.fpPoints - a.fpPoints));

      this.logger.log(
        `Found ${traders.length} traders and ${creators.length} creators for week ${week}`,
      );
    } catch (error) {
      this.logger.error(`Error getting participants for week ${week}:`, error);
    }

    return [traders, creators];
  }

  private async getCurrentParticipants(
    traders: TraderData[],
    creators: CreatorData[],
  ) {
    try {
      const currentWeekInfo = await this.publicClient.readContract({
        address: this.fpManagerAddress,
        abi: this.fpManagerAbi,
        functionName: 'getCurrentWeekInfo',
      });

      const tradersCount = Number(currentWeekInfo[3]);
      const creatorsCount = Number(currentWeekInfo[4]);

      this.logger.log(
        `Fetching ${tradersCount} traders and ${creatorsCount} creators`,
      );

      // Get traders
      for (let i = 0; i < tradersCount; i++) {
        try {
          const traderAddress = (await this.publicClient.readContract({
            address: this.fpManagerAddress,
            abi: this.fpManagerAbi,
            functionName: 'currentTraders',
            args: [BigInt(i)],
          })) as Address;

          const fpPoints = (await this.publicClient.readContract({
            address: this.fpManagerAddress,
            abi: this.fpManagerAbi,
            functionName: 'weeklyTraderFP',
            args: [traderAddress],
          })) as bigint;

          if (fpPoints > 0n) {
            traders.push({ address: traderAddress, fpPoints });
          }
        } catch (error) {
          this.logger.warn(
            `Error fetching trader at index ${i}:`,
            error.message,
          );
        }
      }

      // Get creators
      for (let i = 0; i < creatorsCount; i++) {
        try {
          const creatorAddress = (await this.publicClient.readContract({
            address: this.fpManagerAddress,
            abi: this.fpManagerAbi,
            functionName: 'currentCreators',
            args: [BigInt(i)],
          })) as Address;

          const fpPoints = (await this.publicClient.readContract({
            address: this.fpManagerAddress,
            abi: this.fpManagerAbi,
            functionName: 'weeklyCreatorFP',
            args: [creatorAddress],
          })) as bigint;

          if (fpPoints > 0n) {
            creators.push({ address: creatorAddress, fpPoints });
          }
        } catch (error) {
          this.logger.warn(
            `Error fetching creator at index ${i}:`,
            error.message,
          );
        }
      }
    } catch (error) {
      this.logger.error('Error in getCurrentParticipants:', error);
    }
  }

  private async getHistoricalParticipants(
    traders: TraderData[],
    creators: CreatorData[],
    week: number,
  ) {
    // For historical data, try to get from database first
    try {
      const storedTraders = await this.prisma.weeklyTrader.findMany({
        where: { weekNumber: week },
      });

      const storedCreators = await this.prisma.weeklyCreator.findMany({
        where: { weekNumber: week },
      });

      if (storedTraders.length > 0 || storedCreators.length > 0) {
        this.logger.log(`Using stored data for week ${week}`);

        storedTraders.forEach((trader) => {
          traders.push({
            address: trader.walletAddress as Address,
            fpPoints: BigInt(trader.fpPoints),
          });
        });

        storedCreators.forEach((creator) => {
          creators.push({
            address: creator.walletAddress as Address,
            fpPoints: BigInt(creator.fpPoints),
          });
        });
      } else {
        this.logger.warn(
          `No stored data for week ${week} - historical participant retrieval requires event parsing`,
        );
      }
    } catch (error) {
      this.logger.error(
        `Error getting historical participants for week ${week}:`,
        error,
      );
    }
  }

  @Cron('*/10 * * * *') // Every 10 minutes
  async healthCheck() {
    try {
      this.logger.log('Running health check...');

      const currentWeekInfo = await this.publicClient.readContract({
        address: this.fpManagerAddress,
        abi: this.fpManagerAbi,
        functionName: 'getCurrentWeekInfo',
      });

      const currentWeek = Number(currentWeekInfo[0]);
      const weekStatus = Number(
        await this.publicClient.readContract({
          address: this.fpManagerAddress,
          abi: this.fpManagerAbi,
          functionName: 'weekStatus',
          args: [BigInt(currentWeek)],
        }),
      );

      const statusNames = ['ACTIVE', 'PENDING_FINALIZE', 'FINALIZED'];

      this.logger.log(
        `Health Check - Week: ${currentWeek}, Status: ${statusNames[weekStatus]}, Processing: ${this.isProcessing}`,
      );

      if (this.isStuckProcessing()) {
        this.logger.warn('Processing appears to be stuck!');
        this.resetProcessingIfStuck();
      }
    } catch (error) {
      this.logger.error('Health check failed:', error);
    }
  }
}
