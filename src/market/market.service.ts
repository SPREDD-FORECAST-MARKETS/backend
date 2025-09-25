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

    let whereMarketId = marketId;

    // Resolve marketId if only contract_address is provided
    if (!marketId && contract_address) {
      const market = await this.prismaService.market.findFirst({
        where: { contract_address },
        select: { id: true },
      });
      if (market) whereMarketId = market.id;
    }

    // If no marketId found, return empty array
    if (!whereMarketId) {
      return [];
    }

    const intervalToSeconds = {
      '10s': 10,
      '1m': 60,
      '5m': 300,
      '1h': 3600,
      '1d': 86400,
      '1mo': 2592000, // 30 days
    };

    // If interval is not given, auto-distribute into 20 buckets
    if (!interval) {
      // Get raw data first to determine time range
      const rawData = await this.prismaService.marketPriceSnapshot.findMany({
        where: {
          marketId: whereMarketId,
          ...(timestampGte && { timestamp: { gte: timestampGte } }),
          ...(timestampLte && { timestamp: { lte: timestampLte } }),
        },
        orderBy: { timestamp: 'asc' },
        select: {
          timestamp: true,
          noOdds: true,
          yesOdds: true,
          totalVolume: true,
        },
      });

      if (rawData.length === 0) {
        return [];
      }

      // Group data into 20 buckets manually
      const buckets: Array<{
        bucket: Date;
        noOdds: string;
        yesOdds: string;
        totalVolume: string;
      }> = [];
      const bucketCount = Math.min(20, rawData.length);
      const itemsPerBucket = Math.ceil(rawData.length / bucketCount);

      for (let i = 0; i < bucketCount; i++) {
        const start = i * itemsPerBucket;
        const end = Math.min((i + 1) * itemsPerBucket, rawData.length);
        const bucketData = rawData.slice(start, end);

        if (bucketData.length > 0) {
          const avgNoOdds = bucketData.reduce((sum, item) => sum + Number(item.noOdds), 0) / bucketData.length;
          const avgYesOdds = bucketData.reduce((sum, item) => sum + Number(item.yesOdds), 0) / bucketData.length;
          const avgTotalVolume = bucketData.reduce((sum, item) => sum + Number(item.totalVolume), 0) / bucketData.length;

          buckets.push({
            bucket: bucketData[Math.floor(bucketData.length / 2)].timestamp,
            noOdds: Math.round(avgNoOdds).toString(),
            yesOdds: Math.round(avgYesOdds).toString(),
            totalVolume: Math.round(avgTotalVolume).toString(),
          });
        }
      }

      return buckets;
    }

    // For specific intervals, use PostgreSQL date_trunc function
    const intervalSeconds = intervalToSeconds[interval];
    if (!intervalSeconds) {
      throw new Error(`Invalid interval: ${interval}`);
    }

    // Use date_trunc instead of time_bucket for PostgreSQL compatibility
    const intervalMapping = {
      '10s': 'minute', // Fallback to minute for 10s
      '1m': 'minute',
      '5m': 'minute',
      '1h': 'hour',
      '1d': 'day',
      '1mo': 'month',
    };

    const truncateUnit = intervalMapping[interval];

    // For sub-minute intervals, we need to use a different approach
    if (interval === '10s' || interval === '5m') {
      // For sub-minute intervals, get raw data and group manually
      const rawData = await this.prismaService.marketPriceSnapshot.findMany({
        where: {
          marketId: whereMarketId,
          ...(timestampGte && { timestamp: { gte: timestampGte } }),
          ...(timestampLte && { timestamp: { lte: timestampLte } }),
        },
        orderBy: { timestamp: 'asc' },
      });

      if (rawData.length === 0) return [];

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
        bucket: string;
        noOdds: string;
        yesOdds: string;
        totalVolume: string;
      }> = [];
      for (const [key, items] of groups.entries()) {
        const avgNoOdds = items.reduce((sum, item) => sum + Number(item.noOdds), 0) / items.length;
        const avgYesOdds = items.reduce((sum, item) => sum + Number(item.yesOdds), 0) / items.length;
        const avgTotalVolume = items.reduce((sum, item) => sum + Number(item.totalVolume), 0) / items.length;

        result.push({
          bucket: key,
          noOdds: Math.round(avgNoOdds).toString(),
          yesOdds: Math.round(avgYesOdds).toString(),
          totalVolume: Math.round(avgTotalVolume).toString(),
        });
      }

      return result.sort((a, b) => new Date(a.bucket).getTime() - new Date(b.bucket).getTime());
    }

    // For minute, hour, day, month intervals, use date_trunc with safe query building
    let query = `
      SELECT date_trunc('${truncateUnit}', "timestamp") AS bucket,
             avg("noOdds") as "noOdds",
             avg("yesOdds") as "yesOdds",
             avg("totalVolume") as "totalVolume"
      FROM "MarketPriceSnapshot"
      WHERE "marketId" = ${whereMarketId}
    `;

    if (timestampGte) {
      query += ` AND "timestamp" >= '${timestampGte.toISOString()}'`;
    }
    if (timestampLte) {
      query += ` AND "timestamp" <= '${timestampLte.toISOString()}'`;
    }

    query += ` GROUP BY bucket ORDER BY bucket ASC`;

    return this.prismaService.$queryRawUnsafe(query);
  }

  async generateTwitterCardHtml(marketData: any): Promise<string> {
    // Format expiry date
    const expiryDate = new Date(marketData.expiry_date);
    const formattedExpiry = expiryDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Get market creator info
    const creatorName = marketData.creator?.username || 'Unknown';
    
    // Generate description with market details
    const description = `${marketData.description || marketData.question} • Created by ${creatorName} • Expires ${formattedExpiry} • Trade on Spredd Markets`;
    
    // Use market image or fallback to Spredd logo
    const imageUrl = marketData.image || 'https://spredd.markets/logo.png';
    
    // Generate the redirect URL to the actual trade page
    const tradeUrl = `https://spredd.markets/trade/${marketData.id}`;
    
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Twitter Card meta tags -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@spreddai">
  <meta name="twitter:title" content="${this.escapeHtml(marketData.question)}">
  <meta name="twitter:description" content="${this.escapeHtml(description)}">
  <meta name="twitter:image" content="${imageUrl}">
  
  <!-- Open Graph meta tags -->
  <meta property="og:title" content="${this.escapeHtml(marketData.question)}">
  <meta property="og:description" content="${this.escapeHtml(description)}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:url" content="${tradeUrl}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Spredd Markets">
  
  <!-- Additional meta tags -->
  <title>${this.escapeHtml(marketData.question)} | Spredd Markets</title>
  <meta name="description" content="${this.escapeHtml(description)}">
  <link rel="canonical" href="${tradeUrl}">
  
  <!-- Additional Twitter Card optimizations -->
  <meta name="twitter:creator" content="@spreddai">
  <meta name="twitter:image:alt" content="${this.escapeHtml(marketData.question)} - Prediction Market on Spredd">
  
  <!-- Facebook specific -->
  <meta property="fb:app_id" content="spredd-markets">
  
  <!-- Additional Open Graph -->
  <meta property="og:locale" content="en_US">
  <meta property="article:author" content="${this.escapeHtml(creatorName)}">
  <meta property="article:published_time" content="${new Date(marketData.created_at || Date.now()).toISOString()}">
  <meta property="article:modified_time" content="${new Date(marketData.updated_at || Date.now()).toISOString()}">
  
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #000;
      color: #fff;
      margin: 0;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      text-align: center;
    }
    .card {
      max-width: 600px;
      padding: 30px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .logo {
      width: 60px;
      height: 60px;
      margin: 0 auto 20px;
      background: linear-gradient(135deg, #ff8a4b, #ff6b35);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: bold;
    }
    h1 {
      font-size: 24px;
      margin: 0 0 15px;
      line-height: 1.3;
    }
    p {
      color: #999;
      margin: 0 0 25px;
      line-height: 1.5;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background: linear-gradient(135deg, #ff8a4b, #ff6b35);
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      transition: transform 0.2s;
    }
    .button:hover {
      transform: translateY(-2px);
    }
  </style>
  
  <script>
    // Redirect after a brief delay to allow social crawlers to read meta tags
    setTimeout(() => {
      window.location.href = '${tradeUrl}';
    }, 1000);
  </script>
</head>
<body>
  <div class="card">
    <div class="logo">S</div>
    <h1>${this.escapeHtml(marketData.question)}</h1>
    <p>Prediction market on Spredd Markets</p>
    <p>Created by ${this.escapeHtml(creatorName)} • Expires ${formattedExpiry}</p>
    <a href="${tradeUrl}" class="button">Trade Now</a>
    <p style="margin-top: 20px; font-size: 14px; color: #666;">
      You will be redirected automatically, or <a href="${tradeUrl}" style="color: #ff8a4b;">click here</a> to continue.
    </p>
  </div>
</body>
</html>`;

    return html;
  }

  private escapeHtml(text: string): string {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

}
