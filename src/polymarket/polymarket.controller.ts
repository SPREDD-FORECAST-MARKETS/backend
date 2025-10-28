import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { PolymarketService, PolymarketMarket, PolymarketEvent, GetEventsOptions, Tag, TrendingTag } from './polymarket.service';

@ApiTags('polymarket')
@Controller('polymarket')
export class PolymarketController {
  constructor(private readonly polymarketService: PolymarketService) {}

  @Get('markets')
  @ApiOperation({ summary: 'Get Polymarket markets' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of markets to return (default: 100)' })
  @ApiQuery({ name: 'offset', required: false, type: Number, description: 'Number of markets to skip (default: 0)' })
  @ApiQuery({ name: 'active', required: false, type: Boolean, description: 'Filter by active markets (default: true)' })
  @ApiQuery({ name: 'category', required: false, type: String, description: 'Filter by category' })
  @ApiQuery({ name: 'featured', required: false, type: Boolean, description: 'Filter by featured markets' })
  @ApiQuery({ name: 'order', required: false, enum: ['volume', 'liquidity', 'created_at', 'updated_at'], description: 'Order by field (default: volume)' })
  @ApiResponse({ status: 200, description: 'Markets retrieved successfully' })
  async getMarkets(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('active') active?: boolean,
    @Query('closed') closed?: boolean,
    @Query('archived') archived?: boolean,
    @Query('category') category?: string,
    @Query('featured') featured?: boolean,
    @Query('order') order?: 'volume' | 'liquidity' | 'created_at' | 'updated_at',
    @Query('ascending') ascending?: boolean,
  ): Promise<PolymarketMarket[]> {
    return this.polymarketService.getMarkets({
      limit,
      offset,
      active,
      closed,
      archived,
      category,
      featured,
      order,
      ascending,
    });
  }

  @Get('markets/featured')
  @ApiOperation({ summary: 'Get featured Polymarket markets' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of markets to return (default: 20)' })
  @ApiResponse({ status: 200, description: 'Featured markets retrieved successfully' })
  async getFeaturedMarkets(@Query('limit') limit?: number): Promise<PolymarketMarket[]> {
    return this.polymarketService.getFeaturedMarkets(limit);
  }

  @Get('markets/trending')
  @ApiOperation({ summary: 'Get trending Polymarket markets' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of markets to return (default: 20)' })
  @ApiResponse({ status: 200, description: 'Trending markets retrieved successfully' })
  async getTrendingMarkets(@Query('limit') limit?: number): Promise<PolymarketMarket[]> {
    return this.polymarketService.getTrendingMarkets(limit);
  }

  @Get('markets/search')
  @ApiOperation({ summary: 'Search Polymarket markets' })
  @ApiQuery({ name: 'q', required: true, type: String, description: 'Search query' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of markets to return (default: 50)' })
  @ApiResponse({ status: 200, description: 'Search results retrieved successfully' })
  async searchMarkets(
    @Query('q') query: string,
    @Query('limit') limit?: number,
  ): Promise<PolymarketMarket[]> {
    return this.polymarketService.searchMarkets(query, limit);
  }

  @Get('markets/category/:category')
  @ApiOperation({ summary: 'Get markets by category' })
  @ApiParam({ name: 'category', type: String, description: 'Market category' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of markets to return (default: 50)' })
  @ApiResponse({ status: 200, description: 'Category markets retrieved successfully' })
  async getMarketsByCategory(
    @Param('category') category: string,
    @Query('limit') limit?: number,
  ): Promise<PolymarketMarket[]> {
    return this.polymarketService.getMarketsByCategory(category, limit);
  }

  @Get('markets/tag/:tag')
  @ApiOperation({ summary: 'Get markets by tag' })
  @ApiParam({ name: 'tag', type: String, description: 'Market tag' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of markets to return (default: 50)' })
  @ApiResponse({ status: 200, description: 'Tag markets retrieved successfully' })
  async getMarketsByTag(
    @Param('tag') tag: string,
    @Query('limit') limit?: number,
  ): Promise<PolymarketMarket[]> {
    return this.polymarketService.getMarketsByTag(tag, limit);
  }

  @Get('markets/tags')
  @ApiOperation({ summary: 'Get markets by multiple tags' })
  @ApiQuery({ name: 'tags', required: true, type: String, description: 'Comma-separated list of tags' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of markets to return (default: 50)' })
  @ApiResponse({ status: 200, description: 'Tagged markets retrieved successfully' })
  async getMarketsByTags(
    @Query('tags') tagsString: string,
    @Query('limit') limit?: number,
  ): Promise<PolymarketMarket[]> {
    const tags = tagsString.split(',').map(tag => tag.trim());
    return this.polymarketService.getMarketsByTags(tags, limit);
  }

  @Get('markets/:id')
  @ApiOperation({ summary: 'Get a specific Polymarket market' })
  @ApiParam({ name: 'id', type: String, description: 'Market ID or slug' })
  @ApiResponse({ status: 200, description: 'Market retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Market not found' })
  async getMarket(@Param('id') id: string): Promise<PolymarketMarket | null> {
    // Try numeric ID first, then slug
    return this.polymarketService.getMarketByIdOrSlug(id);
  }

  @Get('events')
  @ApiOperation({ summary: 'Get Polymarket events' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of events to return (default: 100)' })
  @ApiQuery({ name: 'offset', required: false, type: Number, description: 'Number of events to skip (default: 0)' })
  @ApiQuery({ name: 'active', required: false, type: Boolean, description: 'Filter by active events (default: true)' })
  @ApiQuery({ name: 'closed', required: false, type: Boolean, description: 'Filter by closed events (default: false)' })
  @ApiQuery({ name: 'archived', required: false, type: Boolean, description: 'Filter by archived events (default: false)' })
  @ApiQuery({ name: 'category', required: false, type: String, description: 'Filter by category' })
  @ApiQuery({ name: 'featured', required: false, type: Boolean, description: 'Filter by featured events' })
  @ApiQuery({ name: 'order', required: false, enum: ['id', 'volume', 'liquidity', 'created_at', 'updated_at'], description: 'Order by field (default: id)' })
  @ApiQuery({ name: 'ascending', required: false, type: Boolean, description: 'Sort ascending (default: false)' })
  @ApiResponse({ status: 200, description: 'Events retrieved successfully' })
  async getEvents(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('active') active?: boolean,
    @Query('closed') closed?: boolean,
    @Query('archived') archived?: boolean,
    @Query('category') category?: string,
    @Query('featured') featured?: boolean,
    @Query('order') order?: 'id' | 'volume' | 'liquidity' | 'created_at' | 'updated_at',
    @Query('ascending') ascending?: boolean,
  ): Promise<PolymarketEvent[]> {
    return this.polymarketService.getEvents({ 
      limit, 
      offset, 
      active, 
      closed, 
      archived, 
      category, 
      featured, 
      order, 
      ascending 
    });
  }

  @Get('events/active')
  @ApiOperation({ summary: 'Get active Polymarket events' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of events to return (default: 50)' })
  @ApiResponse({ status: 200, description: 'Active events retrieved successfully' })
  async getActiveEvents(@Query('limit') limit?: number): Promise<PolymarketEvent[]> {
    return this.polymarketService.getActiveEvents(limit);
  }

  @Get('events/featured')
  @ApiOperation({ summary: 'Get featured Polymarket events' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of events to return (default: 20)' })
  @ApiResponse({ status: 200, description: 'Featured events retrieved successfully' })
  async getFeaturedEvents(@Query('limit') limit?: number): Promise<PolymarketEvent[]> {
    return this.polymarketService.getFeaturedEvents(limit);
  }

  @Get('events/trending')
  @ApiOperation({ summary: 'Get trending multi-outcome events' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of events to return (default: 20)' })
  @ApiResponse({ status: 200, description: 'Trending multi-outcome events retrieved successfully' })
  async getTrendingEvents(@Query('limit') limit?: number): Promise<PolymarketEvent[]> {
    return this.polymarketService.getTrendingEvents(limit);
  }

  @Get('events/category/:category')
  @ApiOperation({ summary: 'Get multi-outcome events by category' })
  @ApiParam({ name: 'category', type: String, description: 'Event category' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of events to return (default: 20)' })
  @ApiResponse({ status: 200, description: 'Category events retrieved successfully' })
  async getMultiOutcomeEventsByCategory(
    @Param('category') category: string,
    @Query('limit') limit?: number,
  ): Promise<PolymarketEvent[]> {
    return this.polymarketService.getMultiOutcomeEventsByCategory(category, limit);
  }

  @Get('events/:id')
  @ApiOperation({ summary: 'Get a specific Polymarket event' })
  @ApiParam({ name: 'id', type: String, description: 'Event ID or slug' })
  @ApiResponse({ status: 200, description: 'Event retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async getEvent(@Param('id') id: string): Promise<PolymarketEvent | null> {
    // Try numeric ID first, then slug
    if (/^\d+$/.test(id)) {
      return this.polymarketService.getEvent(id);
    } else {
      return this.polymarketService.getEventBySlug(id);
    }
  }

  @Get('events/:id/markets')
  @ApiOperation({ summary: 'Get markets from a specific event' })
  @ApiParam({ name: 'id', type: String, description: 'Event ID' })
  @ApiResponse({ status: 200, description: 'Event markets retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async getMarketsFromEvent(@Param('id') id: string): Promise<PolymarketMarket[]> {
    return this.polymarketService.getMarketsFromEvent(id);
  }

  @Get('markets/:id/price-history')
  @ApiOperation({ summary: 'Get price history for a market token' })
  @ApiParam({ name: 'id', type: String, description: 'Market slug to get token IDs from' })
  @ApiQuery({ name: 'outcome', required: false, type: String, description: 'YES or NO outcome (default: YES)' })
  @ApiQuery({ name: 'interval', required: false, enum: ['1m', '1h', '1d', '1w', 'max'], description: 'Time interval' })
  @ApiQuery({ name: 'startTs', required: false, type: Number, description: 'Start timestamp' })
  @ApiQuery({ name: 'endTs', required: false, type: Number, description: 'End timestamp' })
  @ApiResponse({ status: 200, description: 'Price history retrieved successfully' })
  async getPriceHistory(
    @Param('id') marketSlug: string,
    @Query('outcome') outcome: string = 'YES',
    @Query('interval') interval: '1m' | '1h' | '6h' | '1d' | '1w' | 'max' = '1h',
    @Query('startTs') startTs?: number,
    @Query('endTs') endTs?: number,
  ): Promise<{ t: number; p: number }[]> {
    // First get the market to find token IDs
    const market = await this.polymarketService.getMarketByIdOrSlug(marketSlug);
    if (!market) {
      throw new Error('Market not found');
    }

    // Get the appropriate token ID (YES = index 0, NO = index 1 typically)
    const tokenIndex = outcome.toUpperCase() === 'YES' ? 0 : 1;
    const tokenId = market.clobTokenIds?.[tokenIndex];
    
    if (!tokenId) {
      throw new Error('Token ID not found for this market outcome');
    }

    return this.polymarketService.getPriceHistory(tokenId, {
      interval,
      startTs,
      endTs,
      fidelity: interval === '1m' ? 10 : interval === '1w' ? 5 : undefined,
    });
  }

  @Get('markets/:id/orderbook')
  @ApiOperation({ summary: 'Get order book for a market token' })
  @ApiParam({ name: 'id', type: String, description: 'Market slug to get token IDs from' })
  @ApiQuery({ name: 'outcome', required: false, type: String, description: 'YES or NO outcome (default: YES)' })
  @ApiResponse({ status: 200, description: 'Order book retrieved successfully' })
  async getOrderBook(
    @Param('id') marketSlug: string,
    @Query('outcome') outcome: string = 'YES',
  ): Promise<any> {
    // First get the market to find token IDs
    const market = await this.polymarketService.getMarketByIdOrSlug(marketSlug);
    if (!market) {
      throw new Error('Market not found');
    }

    // Get the appropriate token ID (YES = index 0, NO = index 1 typically)
    const tokenIndex = outcome.toUpperCase() === 'YES' ? 0 : 1;
    const tokenId = market.clobTokenIds?.[tokenIndex];
    
    if (!tokenId) {
      throw new Error('Token ID not found for this market outcome');
    }

    return this.polymarketService.getOrderBook(tokenId);
  }

  @Get('markets/:id/price')
  @ApiOperation({ summary: 'Get current price for a market token' })
  @ApiParam({ name: 'id', type: String, description: 'Market slug to get token IDs from' })
  @ApiQuery({ name: 'outcome', required: false, type: String, description: 'YES or NO outcome (default: YES)' })
  @ApiResponse({ status: 200, description: 'Current price retrieved successfully' })
  async getCurrentPrice(
    @Param('id') marketSlug: string,
    @Query('outcome') outcome: string = 'YES',
  ): Promise<{ bid: number; ask: number; mid: number }> {
    // First get the market to find token IDs
    const market = await this.polymarketService.getMarketByIdOrSlug(marketSlug);
    if (!market) {
      throw new Error('Market not found');
    }

    // Get the appropriate token ID (YES = index 0, NO = index 1 typically)
    const tokenIndex = outcome.toUpperCase() === 'YES' ? 0 : 1;
    const tokenId = market.clobTokenIds?.[tokenIndex];
    
    if (!tokenId) {
      throw new Error('Token ID not found for this market outcome');
    }

    return this.polymarketService.getCurrentPrice(tokenId);
  }

  @Get('price-history/:tokenId')
  @ApiOperation({ summary: 'Get price history for a specific token ID' })
  @ApiParam({ name: 'tokenId', type: String, description: 'CLOB token ID' })
  @ApiQuery({ name: 'interval', required: false, enum: ['1m', '1h', '6h', '1d', '1w', 'max'], description: 'Time interval' })
  @ApiQuery({ name: 'startTs', required: false, type: Number, description: 'Start timestamp' })
  @ApiQuery({ name: 'endTs', required: false, type: Number, description: 'End timestamp' })
  @ApiQuery({ name: 'fidelity', required: false, type: Number, description: 'Number of data points' })
  @ApiResponse({ status: 200, description: 'Price history retrieved successfully' })
  async getPriceHistoryByTokenId(
    @Param('tokenId') tokenId: string,
    @Query('interval') interval?: '1m' | '1h' | '6h' | '1d' | '1w' | 'max',
    @Query('startTs') startTs?: number,
    @Query('endTs') endTs?: number,
    @Query('fidelity') fidelity?: number,
  ): Promise<{ t: number; p: number }[]> {
    return this.polymarketService.getPriceHistory(tokenId, {
      interval,
      startTs,
      endTs,
      fidelity: fidelity || (interval === '1m' ? 10 : interval === '1w' ? 5 : undefined),
    });
  }

  @Get('clob/midpoint/:tokenId')
  @ApiOperation({ summary: 'Get midpoint price for a token' })
  @ApiParam({ name: 'tokenId', type: String, description: 'CLOB token ID' })
  @ApiResponse({ status: 200, description: 'Midpoint price retrieved successfully' })
  async getMidpoint(@Param('tokenId') tokenId: string): Promise<{ midpoint: number }> {
    return this.polymarketService.getMidpoint(tokenId);
  }

  @Get('clob/trades/:tokenId')
  @ApiOperation({ summary: 'Get recent trades for a token' })
  @ApiParam({ name: 'tokenId', type: String, description: 'CLOB token ID' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of trades to return (default: 50)' })
  @ApiResponse({ status: 200, description: 'Recent trades retrieved successfully' })
  async getRecentTrades(
    @Param('tokenId') tokenId: string,
    @Query('limit') limit?: number,
  ): Promise<any[]> {
    return this.polymarketService.getRecentTrades(tokenId, limit);
  }

  @Get('clob/candles/:tokenId')
  @ApiOperation({ summary: 'Get candlestick data for a token' })
  @ApiParam({ name: 'tokenId', type: String, description: 'CLOB token ID' })
  @ApiQuery({ name: 'interval', required: false, enum: ['1m', '5m', '15m', '1h', '1d'], description: 'Time interval' })
  @ApiQuery({ name: 'startTs', required: false, type: Number, description: 'Start timestamp' })
  @ApiQuery({ name: 'endTs', required: false, type: Number, description: 'End timestamp' })
  @ApiQuery({ name: 'fidelity', required: false, type: Number, description: 'Number of data points' })
  @ApiResponse({ status: 200, description: 'Candlestick data retrieved successfully' })
  async getCandlestickData(
    @Param('tokenId') tokenId: string,
    @Query('interval') interval?: '1m' | '5m' | '15m' | '1h' | '1d',
    @Query('startTs') startTs?: number,
    @Query('endTs') endTs?: number,
    @Query('fidelity') fidelity?: number,
  ): Promise<any[]> {
    return this.polymarketService.getCandlestickData(tokenId, {
      interval,
      startTs,
      endTs,
      fidelity,
    });
  }

  @Get('clob/spread/:tokenId')
  @ApiOperation({ summary: 'Get bid-ask spread for a token' })
  @ApiParam({ name: 'tokenId', type: String, description: 'CLOB token ID' })
  @ApiResponse({ status: 200, description: 'Spread data retrieved successfully' })
  async getSpread(@Param('tokenId') tokenId: string): Promise<{ spread: number; spreadPercent: number; bid: number; ask: number }> {
    return this.polymarketService.getSpread(tokenId);
  }

  @Get('clob/24hr-stats/:tokenId')
  @ApiOperation({ summary: 'Get 24-hour statistics for a token' })
  @ApiParam({ name: 'tokenId', type: String, description: 'CLOB token ID' })
  @ApiResponse({ status: 200, description: '24-hour statistics retrieved successfully' })
  async get24HourStats(@Param('tokenId') tokenId: string): Promise<{
    volume24h: number;
    priceChange24h: number;
    priceChangePercent24h: number;
    high24h: number;
    low24h: number;
    trades24h: number;
  }> {
    return this.polymarketService.get24HourStats(tokenId);
  }

  @Get('clob/market-depth/:tokenId')
  @ApiOperation({ summary: 'Get order book depth analysis for a token' })
  @ApiParam({ name: 'tokenId', type: String, description: 'CLOB token ID' })
  @ApiQuery({ name: 'levels', required: false, type: Number, description: 'Number of depth levels to analyze (default: 10)' })
  @ApiResponse({ status: 200, description: 'Market depth analysis retrieved successfully' })
  async getMarketDepth(
    @Param('tokenId') tokenId: string,
    @Query('levels') levels?: number,
  ): Promise<{
    bids: { price: number; size: number; total: number }[];
    asks: { price: number; size: number; total: number }[];
    bidDepth: number;
    askDepth: number;
    totalDepth: number;
  }> {
    return this.polymarketService.getMarketDepth(tokenId, levels);
  }

  @Get('data/positions/:address')
  @ApiOperation({ summary: 'Get user positions from Data API' })
  @ApiParam({ name: 'address', type: String, description: 'User wallet address' })
  @ApiQuery({ name: 'market', required: false, type: String, description: 'Filter by market' })
  @ApiQuery({ name: 'event', required: false, type: String, description: 'Filter by event' })
  @ApiQuery({ name: 'sort', required: false, enum: ['TOKENS', 'CURRENT', 'INITIAL', 'CASHPNL', 'PERCENTPNL', 'TITLE', 'RESOLVING', 'PRICE'], description: 'Sort field' })
  @ApiQuery({ name: 'direction', required: false, enum: ['ASC', 'DESC'], description: 'Sort direction' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of positions to return (default: 100)' })
  @ApiQuery({ name: 'offset', required: false, type: Number, description: 'Number of positions to skip (default: 0)' })
  @ApiResponse({ status: 200, description: 'User positions retrieved successfully' })
  async getUserPositions(
    @Param('address') address: string,
    @Query('market') market?: string,
    @Query('event') event?: string,
    @Query('sort') sort?: 'TOKENS' | 'CURRENT' | 'INITIAL' | 'CASHPNL' | 'PERCENTPNL' | 'TITLE' | 'RESOLVING' | 'PRICE',
    @Query('direction') direction?: 'ASC' | 'DESC',
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ): Promise<any[]> {
    return this.polymarketService.getUserPositions(address, {
      market,
      event,
      sort,
      direction,
      limit,
      offset,
    });
  }

  @Get('data/activity/:address')
  @ApiOperation({ summary: 'Get user activity from Data API' })
  @ApiParam({ name: 'address', type: String, description: 'User wallet address' })
  @ApiQuery({ name: 'market', required: false, type: String, description: 'Filter by market' })
  @ApiQuery({ name: 'event', required: false, type: String, description: 'Filter by event' })
  @ApiQuery({ name: 'activityType', required: false, enum: ['TRADE', 'SPLIT', 'MERGE', 'REDEEM', 'REWARD', 'CONVERSION'], description: 'Activity type filter' })
  @ApiQuery({ name: 'tradeSide', required: false, enum: ['BUY', 'SELL'], description: 'Trade side filter' })
  @ApiQuery({ name: 'startTs', required: false, type: Number, description: 'Start timestamp' })
  @ApiQuery({ name: 'endTs', required: false, type: Number, description: 'End timestamp' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of activities to return (default: 100)' })
  @ApiQuery({ name: 'offset', required: false, type: Number, description: 'Number of activities to skip (default: 0)' })
  @ApiResponse({ status: 200, description: 'User activity retrieved successfully' })
  async getUserActivity(
    @Param('address') address: string,
    @Query('market') market?: string,
    @Query('event') event?: string,
    @Query('activityType') activityType?: 'TRADE' | 'SPLIT' | 'MERGE' | 'REDEEM' | 'REWARD' | 'CONVERSION',
    @Query('tradeSide') tradeSide?: 'BUY' | 'SELL',
    @Query('startTs') startTs?: number,
    @Query('endTs') endTs?: number,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ): Promise<any[]> {
    return this.polymarketService.getUserActivity(address, {
      market,
      event,
      activityType,
      tradeSide,
      startTs,
      endTs,
      limit,
      offset,
    });
  }

  @Get('data/portfolio/:address')
  @ApiOperation({ summary: 'Get portfolio performance analytics' })
  @ApiParam({ name: 'address', type: String, description: 'User wallet address' })
  @ApiResponse({ status: 200, description: 'Portfolio performance retrieved successfully' })
  async getPortfolioPerformance(@Param('address') address: string): Promise<{
    totalValue: number;
    totalPnL: number;
    totalPnLPercent: number;
    positionsCount: number;
    winRate: number;
    averageReturn: number;
    bestPosition: any;
    worstPosition: any;
    recentActivity: any[];
  }> {
    return this.polymarketService.getPortfolioPerformance(address);
  }

  @Get('data/leaderboard')
  @ApiOperation({ summary: 'Get trading leaderboard' })
  @ApiQuery({ name: 'metric', required: false, enum: ['VOLUME', 'PNL', 'WINRATE', 'TRADES'], description: 'Ranking metric' })
  @ApiQuery({ name: 'timeframe', required: false, enum: ['24H', '7D', '30D', 'ALL'], description: 'Time period' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of top traders to return (default: 100)' })
  @ApiResponse({ status: 200, description: 'Leaderboard retrieved successfully' })
  async getLeaderboard(
    @Query('metric') metric?: 'VOLUME' | 'PNL' | 'WINRATE' | 'TRADES',
    @Query('timeframe') timeframe?: '24H' | '7D' | '30D' | 'ALL',
    @Query('limit') limit?: number,
  ): Promise<{
    ranking: Array<{
      address: string;
      rank: number;
      metric: string;
      value: number;
      positions: number;
      winRate: number;
    }>;
    userRank?: number;
  }> {
    return this.polymarketService.getLeaderboard({ metric, timeframe, limit });
  }

  @Get('tags')
  @ApiOperation({ summary: 'Get all available tags' })
  @ApiResponse({ status: 200, description: 'Tags retrieved successfully' })
  async getAllTags(): Promise<Tag[]> {
    return this.polymarketService.getAllTags();
  }

  @Get('tags/trending')
  @ApiOperation({ summary: 'Get trending tags based on active events and volume' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of trending tags to return (default: 20)' })
  @ApiResponse({ status: 200, description: 'Trending tags retrieved successfully' })
  async getTrendingTags(@Query('limit') limit?: number): Promise<TrendingTag[]> {
    return this.polymarketService.getTrendingTags(limit);
  }

  @Get('health')
  @ApiOperation({ summary: 'Check Polymarket API health' })
  @ApiResponse({ status: 200, description: 'API health status' })
  async healthCheck(): Promise<{ healthy: boolean }> {
    const healthy = await this.polymarketService.healthCheck();
    return { healthy };
  }
}