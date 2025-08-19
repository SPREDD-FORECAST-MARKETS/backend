import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetMarketDto } from './dto/get-market.dto';
import { GetMarketChartDto } from './dto/get-market-chart.dto';

@Injectable()
export class MarketService {
  constructor(private prismaService: PrismaService) { }

  async createMarket(
    description: string,
    resolution_criteria: string,
    question: string,
    marketId: string,
    expiry_date: string | Date,
    image: string | undefined,
    contract_address: string,
    userId: number,
    tags?: string[],
  ) {
    const market = await this.prismaService.market.create({
      data: {
        description,
        resolution_criteria,
        question,
        expiry_date,
        image,
        contract_address,
        tags,
        creatorId: userId,
        marketId,
      },
    });

    await this.prismaService.outcome.create({
      data: {
        outcome_title: 'YES',
        marketID: market.id,
      },
    });

    await this.prismaService.outcome.create({
      data: {
        outcome_title: 'NO',
        marketID: market.id,
      },
    });

    const user = await this.prismaService.user.findFirst({
      where: {
        id: userId,
      },
    });

    await this.prismaService.news.create({
      data: {
        title: 'New Market created on Spredd Markets',
        description: `New prediction market created on spredd markets with title: ${question}, description: ${description} by Creator: ${user?.username}`,
        source: 'Spredd Markets',
        image: image || 'https://spredd.markets/logo.jpg',
      },
    });

    return market;
  }

  // Agent-specific market creation method - separate from main user flow
  async createAgentMarket(
    description: string,
    resolution_criteria: string,
    question: string,
    marketId: string,           // bytes32 hash from blockchain
    expiry_date: string | Date,
    image: string | undefined,
    contract_address: string,   // 20-byte contract address from blockchain
    userId: number,
    tags?: string[],
  ) {
    const market = await this.prismaService.market.create({
      data: {
        description,
        resolution_criteria,
        question,
        expiry_date,
        image: image || 'https://spredd.markets/logo.jpg',
        contract_address,
        tags,
        creatorId: userId,
        marketId,
      },
    });

    await this.prismaService.outcome.create({
      data: {
        outcome_title: 'YES',
        marketID: market.id,
      },
    });

    await this.prismaService.outcome.create({
      data: {
        outcome_title: 'NO',
        marketID: market.id,
      },
    });

    const user = await this.prismaService.user.findFirst({
      where: {
        id: userId,
      },
    });

    await this.prismaService.news.create({
      data: {
        title: 'New Market created by Spredd Agent',
        description: `Autonomous agent created prediction market: ${question}, description: ${description} using AI trend analysis`,
        source: 'Spredd Agent',
        image: image || 'https://spredd.markets/logo.jpg',
      },
    });

    return market;
  }

  async getMarkets(getMarketDto: GetMarketDto) {
    const {
      page = 1,
      size = 10,
      id,
      question,
      tags,
      sortBy = 'asc',
      orderBy = 'id',
    } = getMarketDto;

    const where: any = {};

    if (id) {
      where.id = id;
    }

    if (question) {
      where.question = {
        contains: question,
        mode: 'insensitive',
      };
    }

    if (tags && tags.length > 0) {
      where.tags = {
        hasSome: tags,
      };
    }

    const [data, total] = await Promise.all([
      this.prismaService.market.findMany({
        where,
        skip: (page - 1) * size,
        take: size,
        orderBy: {
          [orderBy]: sortBy,
        },
        include: {
          creator: {
            select: {
              id: true,
              username: true,
              wallet_address: true,
            },
          },
          outcome: {
            select: {
              id: true,
              outcome_title: true,
            },
          },
        },
      }),
      this.prismaService.market.count({ where }),
    ]);

    return {
      meta: {
        total,
        page,
        size,
        totalPage: Math.ceil(total / size),
      },
      data,
    };
  }

  async getMarket(marketId: number) {
    const market = await this.prismaService.market.findFirst({
      where: {
        id: marketId,
      },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            wallet_address: true,
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

    if (!market) {
      throw new NotFoundException('Market doest not exists!');
    }

    return market;
  }

  async getUserMarkets(wallet_address: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const markets = await this.prismaService.market.findMany({
      where: {
        creator: {
          wallet_address,
        },
      },
      skip,
      take: limit,
      select: {
        id: true,
        contract_address: true,
        description: true,
        question: true,
        expiry_date: true,
        createdAt: true,
        image: true,
        status: true,
        outcomeWon: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return markets;
  }

  async resolveMarket(marketId: number, outcomeWonTitle?: string) {
    // First, check if the market exists
    const existingMarket = await this.prismaService.market.findFirst({
      where: {
        id: marketId,
      },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            wallet_address: true,
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

    if (!existingMarket) {
      throw new NotFoundException('Market does not exist!');
    }

    // Check if market is already resolved
    if (existingMarket.isResolved) {
      throw new Error('Market is already resolved!');
    }

    let outcomeWonId: number | null = null;

    // Validate and get outcomeWon ID if provided
    if (outcomeWonTitle) {
      const validOutcome = existingMarket.outcome.find(
        (outcome) => outcome.outcome_title === outcomeWonTitle,
      );
      if (!validOutcome) {
        throw new Error('Invalid outcome. Must be either YES or NO.');
      }
      outcomeWonId = validOutcome.id;
    }

    // Update the market as resolved
    const resolvedMarket = await this.prismaService.market.update({
      where: {
        id: marketId,
      },
      data: {
        isResolved: true,
        outcomeWon: outcomeWonId,
        winningOutcome: outcomeWonTitle,
        status: 'CLOSED',
      },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            wallet_address: true,
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

    // Create a news entry for the market resolution
    await this.prismaService.news.create({
      data: {
        title: 'Market Resolved on Spredd Markets',
        description: `Prediction market "${resolvedMarket.question}" has been resolved${outcomeWonTitle ? ` with outcome: ${outcomeWonTitle}` : ''}. Created by ${resolvedMarket.creator.username}.`,
        source: 'Spredd Markets',
        image: resolvedMarket.image || 'https://spredd.markets/logo.jpg',
      },
    });

    return resolvedMarket;
  }


  async getMarketChartData(dto: GetMarketChartDto) {
    const {
      marketId,
      contract_address,
      timestampGte,
      timestampLte,
      interval,
    } = dto;

    const where: any = {};
    if (marketId) where.marketId = marketId;
    if (timestampGte || timestampLte) {
      where.timestamp = {};
      if (timestampGte) where.timestamp.gte = timestampGte;
      if (timestampLte) where.timestamp.lte = timestampLte;
    }

    // Resolve marketId if only contract_address is provided
    if (!marketId && contract_address) {
      const market = await this.prismaService.market.findFirst({
        where: { contract_address },
        select: { id: true },
      });
      if (market) where.marketId = market.id;
    }

    const intervalToPostgres = {
      '10s': '10 seconds',
      '1m': '1 minute',
      '5m': '5 minutes',
      '1h': '1 hour',
      '1d': '1 day',
      '1mo': '1 month',
    };

    // If interval is not given, auto-distribute into 20 buckets
    if (!interval) {
      const dataRange = await this.prismaService.marketPriceSnapshot.aggregate({
        where,
        _min: { timestamp: true },
        _max: { timestamp: true },
      });

      const { _min, _max } = dataRange;
      const start = _min.timestamp;
      const end = _max.timestamp;

      const diffMs = new Date(end!).getTime() - new Date(start!).getTime();
      const bucketSizeMs = Math.ceil(diffMs / 20);

      // Convert bucket size to interval string
      const pgInterval = `${Math.floor(bucketSizeMs / 1000)} seconds`;

      return this.prismaService.$queryRawUnsafe(`
        SELECT time_bucket('${pgInterval}', "timestamp") AS bucket,
               avg("noOdds") as "noOdds",
               avg("yesOdds") as "yesOdds",
               avg("totalVolume") as "totalVolume"
        FROM "MarketPriceSnapshot"
        WHERE ${where.marketId ? `"marketId" = ${where.marketId}` : 'TRUE'}
        ${timestampGte ? `AND "timestamp" >= '${timestampGte.toISOString()}'` : ''}
        ${timestampLte ? `AND "timestamp" <= '${timestampLte.toISOString()}'` : ''}
        GROUP BY bucket
        ORDER BY bucket ASC
      `);
    }

    const pgInterval = intervalToPostgres[interval];

    return this.prismaService.$queryRawUnsafe(`
      SELECT time_bucket('${pgInterval}', "timestamp") AS bucket,
             avg("noOdds") as "noOdds",
             avg("yesOdds") as "yesOdds",
             avg("totalVolume") as "totalVolume"
      FROM "MarketPriceSnapshot"
      WHERE ${where.marketId ? `"marketId" = ${where.marketId}` : 'TRUE'}
      ${timestampGte ? `AND "timestamp" >= '${timestampGte.toISOString()}'` : ''}
      ${timestampLte ? `AND "timestamp" <= '${timestampLte.toISOString()}'` : ''}
      GROUP BY bucket
      ORDER BY bucket ASC
    `);
  }

}
