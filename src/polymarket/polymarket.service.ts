import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClobClient } from '@polymarket/clob-client';

export interface PolymarketMarket {
  id: string;
  question: string;
  description?: string;
  image?: string;
  category?: string;
  outcomes: string[];
  outcomePrices: string[];
  clobTokenIds: string[];
  volume?: number;
  liquidity?: number;
  endDate?: string;
  active?: boolean;
  closed?: boolean;
  archived?: boolean;
  new?: boolean;
  featured?: boolean;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PolymarketEvent {
  id: string;
  title: string;
  description?: string;
  image?: string;
  slug?: string;
  markets: PolymarketMarket[];
  startDate?: string;
  endDate?: string;
  category?: string;
  featured?: boolean;
}

export interface GetMarketsOptions {
  limit?: number;
  offset?: number;
  active?: boolean;
  closed?: boolean;
  archived?: boolean;
  order?: 'volume' | 'liquidity' | 'created_at' | 'updated_at' | 'volume24hr';
  ascending?: boolean;
  category?: string;
  featured?: boolean;
  new?: boolean;
  tags?: string[];
  slug?: string;
}

export interface GetEventsOptions {
  limit?: number;
  offset?: number;
  active?: boolean;
  closed?: boolean;
  archived?: boolean;
  order?: 'id' | 'volume' | 'liquidity' | 'created_at' | 'updated_at';
  ascending?: boolean;
  category?: string;
  featured?: boolean;
  slug?: string;
}

@Injectable()
export class PolymarketService {
  private readonly logger = new Logger(PolymarketService.name);
  private readonly baseUrl = 'https://gamma-api.polymarket.com';
  private clobClient: ClobClient;
  
  constructor(private configService: ConfigService) {
    // Initialize CLOB client for trading operations
    this.clobClient = new ClobClient('https://clob.polymarket.com', 137); // Polygon mainnet
  }

  async getMarkets(options: GetMarketsOptions = {}): Promise<PolymarketMarket[]> {
    const {
      limit = 100,
      offset = 0,
      active = true,
      closed = false,
      archived = false,
      order = 'volume24hr', // Use volume24hr for current activity
      ascending = false,
      category,
      featured,
      tags,
      slug,
    } = options;

    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
      });

      // Filter parameters
      if (active !== undefined) params.append('active', active.toString());
      if (closed !== undefined) params.append('closed', closed.toString());
      if (archived !== undefined) params.append('archived', archived.toString());
      if (order) params.append('order', order);
      if (ascending !== undefined) params.append('ascending', ascending.toString());
      if (category) params.append('category', category);
      if (featured !== undefined) params.append('featured', featured.toString());
      if (slug) params.append('slug', slug);
      
      // Handle tags array
      if (tags && tags.length > 0) {
        tags.forEach(tag => params.append('tag', tag));
      }

      this.logger.log(`Fetching markets with params: ${params.toString()}`);
      const response = await fetch(`${this.baseUrl}/markets?${params}`);
      
      if (!response.ok) {
        throw new Error(`Polymarket API error: ${response.status} ${response.statusText}`);
      }

      const markets = await response.json();
      this.logger.log(`Successfully fetched ${markets.length} markets from Polymarket`);
      
      // Filter for current/recent markets (2024-2026)
      const currentMarkets = markets.filter(market => {
        if (!market.endDate) return true; // Include markets without end dates
        const endDate = new Date(market.endDate);
        const currentYear = new Date().getFullYear();
        return endDate.getFullYear() >= currentYear - 1; // Include 2024 onwards
      });
      
      this.logger.log(`Filtered to ${currentMarkets.length} current markets`);
      
      // Parse string fields that need to be converted
      return currentMarkets.map((market: any) => ({
        ...market,
        outcomes: this.parseJsonField(market.outcomes),
        outcomePrices: this.parseJsonField(market.outcomePrices),
        clobTokenIds: this.parseJsonField(market.clobTokenIds),
      }));
    } catch (error) {
      this.logger.error('Failed to fetch markets from Polymarket', error);
      throw error;
    }
  }

  async getMarket(id: string): Promise<PolymarketMarket | null> {
    try {
      const response = await fetch(`${this.baseUrl}/markets/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`Polymarket API error: ${response.status} ${response.statusText}`);
      }

      const market = await response.json();
      
      // Parse string fields that need to be converted
      return {
        ...market,
        outcomes: this.parseJsonField(market.outcomes),
        outcomePrices: this.parseJsonField(market.outcomePrices),
        clobTokenIds: this.parseJsonField(market.clobTokenIds),
      };
    } catch (error) {
      this.logger.error(`Failed to fetch market ${id} from Polymarket`, error);
      throw error;
    }
  }

  async getMarketByIdOrSlug(idOrSlug: string): Promise<PolymarketMarket | null> {
    // First try to get by numeric ID if it looks like a number
    if (/^\d+$/.test(idOrSlug)) {
      try {
        const marketById = await this.getMarket(idOrSlug);
        if (marketById) return marketById;
      } catch (error) {
        this.logger.warn(`Failed to fetch market by ID ${idOrSlug}, trying by slug`);
      }
    }

    // Use the API's slug parameter for efficient lookup
    try {
      this.logger.log(`Fetching market by slug using API parameter: ${idOrSlug}`);
      
      const params = new URLSearchParams({
        slug: idOrSlug,
        limit: '1',
        closed: 'false',
        archived: 'false'
      });
      
      const response = await fetch(`${this.baseUrl}/markets?${params}`);
      
      if (!response.ok) {
        throw new Error(`Polymarket API error: ${response.status} ${response.statusText}`);
      }
      
      const markets = await response.json();
      
      if (markets.length === 0) {
        this.logger.warn(`Market not found for slug: ${idOrSlug}`);
        return null;
      }
      
      const market = markets[0];
      this.logger.log(`Found market by slug: ${market.question}`);
      
      // Parse string fields that need to be converted
      return {
        ...market,
        outcomes: this.parseJsonField(market.outcomes),
        outcomePrices: this.parseJsonField(market.outcomePrices),
        clobTokenIds: this.parseJsonField(market.clobTokenIds),
      };
    } catch (error) {
      this.logger.error('Error fetching market by slug:', error);
      return null;
    }
  }

  async getEvents(options: GetEventsOptions = {}): Promise<PolymarketEvent[]> {
    const { 
      limit = 100, 
      offset = 0,
      active = true,
      closed = false,
      archived = false,
      order = 'id',
      ascending = false,
      category,
      featured,
      slug
    } = options;

    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
        order,
        ascending: ascending.toString(),
      });

      // Filter parameters
      if (active !== undefined) params.append('active', active.toString());
      if (closed !== undefined) params.append('closed', closed.toString());
      if (archived !== undefined) params.append('archived', archived.toString());
      if (category) params.append('category', category);
      if (featured !== undefined) params.append('featured', featured.toString());
      if (slug) params.append('slug', slug);

      this.logger.log(`Fetching events with params: ${params.toString()}`);
      const response = await fetch(`${this.baseUrl}/events?${params}`);
      
      if (!response.ok) {
        throw new Error(`Polymarket API error: ${response.status} ${response.statusText}`);
      }

      const events = await response.json();
      this.logger.log(`Successfully fetched ${events.length} events from Polymarket`);
      return events;
    } catch (error) {
      this.logger.error('Failed to fetch events from Polymarket', error);
      throw error;
    }
  }

  async getEvent(id: string): Promise<PolymarketEvent | null> {
    try {
      const response = await fetch(`${this.baseUrl}/events/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`Polymarket API error: ${response.status} ${response.statusText}`);
      }

      const event = await response.json();
      this.logger.log(`Successfully fetched event: ${event.title}`);
      return event;
    } catch (error) {
      this.logger.error(`Failed to fetch event ${id} from Polymarket`, error);
      throw error;
    }
  }

  async getEventBySlug(slug: string): Promise<PolymarketEvent | null> {
    try {
      this.logger.log(`Fetching event by slug: ${slug}`);
      
      const params = new URLSearchParams({
        slug: slug,
        limit: '1',
      });
      
      const response = await fetch(`${this.baseUrl}/events?${params}`);
      
      if (!response.ok) {
        throw new Error(`Polymarket API error: ${response.status} ${response.statusText}`);
      }
      
      const events = await response.json();
      
      if (events.length === 0) {
        this.logger.warn(`Event not found for slug: ${slug}`);
        return null;
      }
      
      const event = events[0];
      this.logger.log(`Found event by slug: ${event.title}`);
      return event;
    } catch (error) {
      this.logger.error('Error fetching event by slug:', error);
      return null;
    }
  }

  async getActiveEvents(limit = 50): Promise<PolymarketEvent[]> {
    return this.getEvents({
      limit,
      active: true,
      closed: false,
      archived: false,
      order: 'id',
      ascending: false,
    });
  }

  async getFeaturedEvents(limit = 20): Promise<PolymarketEvent[]> {
    return this.getEvents({
      limit,
      featured: true,
      active: true,
      order: 'volume',
      ascending: false,
    });
  }

  async getFeaturedMarkets(limit = 20): Promise<PolymarketMarket[]> {
    return this.getMarkets({
      limit,
      featured: true,
      active: true,
      order: 'volume',
      ascending: false,
    });
  }

  async getTrendingMarkets(limit = 20): Promise<PolymarketMarket[]> {
    return this.getMarkets({
      limit,
      active: true,
      order: 'volume',
      ascending: false,
    });
  }

  async getMarketsByCategory(category: string, limit = 50): Promise<PolymarketMarket[]> {
    return this.getMarkets({
      limit,
      category,
      active: true,
      order: 'volume',
      ascending: false,
    });
  }

  async getMarketsByTag(tag: string, limit = 50): Promise<PolymarketMarket[]> {
    return this.getMarkets({
      limit,
      tags: [tag],
      active: true,
      order: 'volume',
      ascending: false,
    });
  }

  async getMarketsByTags(tags: string[], limit = 50): Promise<PolymarketMarket[]> {
    return this.getMarkets({
      limit,
      tags,
      active: true,
      order: 'volume',
      ascending: false,
    });
  }

  async getMarketsFromEvent(eventId: string): Promise<PolymarketMarket[]> {
    try {
      const event = await this.getEvent(eventId);
      if (!event) {
        throw new Error('Event not found');
      }
      return event.markets;
    } catch (error) {
      this.logger.error(`Failed to fetch markets from event ${eventId}`, error);
      throw error;
    }
  }

  async searchMarkets(query: string, limit = 50): Promise<PolymarketMarket[]> {
    // Note: This would require a search endpoint if available
    // For now, we'll get all markets and filter client-side (not ideal for production)
    const markets = await this.getMarkets({ limit: limit * 2 });
    
    const searchTerms = query.toLowerCase().split(' ');
    return markets.filter(market => 
      searchTerms.some(term => 
        market.question.toLowerCase().includes(term) ||
        market.description?.toLowerCase().includes(term) ||
        market.category?.toLowerCase().includes(term)
      )
    ).slice(0, limit);
  }

  private parseJsonField(field: any): any {
    if (typeof field === 'string') {
      try {
        return JSON.parse(field);
      } catch {
        return field;
      }
    }
    return field;
  }

  // Get price history for charts (CLOB API)
  async getPriceHistory(tokenId: string, options: {
    startTs?: number;
    endTs?: number;
    interval?: '1m' | '1h' | '6h' | '1d' | '1w' | 'max';
    fidelity?: number;
  } = {}): Promise<{ t: number; p: number }[]> {
    try {
      const params = new URLSearchParams();
      params.append('market', tokenId); // Use 'market' parameter as per docs
      
      // Handle interval vs startTs/endTs (they are mutually exclusive)
      if (options.interval) {
        params.append('interval', options.interval);
        if (options.fidelity) {
          params.append('fidelity', options.fidelity.toString());
        }
      } else {
        // If no interval, use timestamps
        const now = Math.floor(Date.now() / 1000);
        const startTs = options.startTs || (now - 604800); // Default 1 week
        const endTs = options.endTs || now;
        params.append('startTs', startTs.toString());
        params.append('endTs', endTs.toString());
        if (options.fidelity) {
          params.append('fidelity', options.fidelity.toString());
        }
      }

      this.logger.log(`Fetching price history for token ${tokenId} with params: ${params.toString()}`);
      
      const response = await fetch(`https://clob.polymarket.com/prices-history?${params}`);
      
      if (!response.ok) {
        throw new Error(`CLOB API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Handle the response format according to docs
      if (data.history && Array.isArray(data.history)) {
        this.logger.log(`Successfully fetched ${data.history.length} price points`);
        return data.history.map(item => ({
          t: item.t,
          p: item.p
        }));
      } else if (Array.isArray(data)) {
        // Fallback for direct array response
        this.logger.log(`Successfully fetched ${data.length} price points (direct array)`);
        return data.map(item => ({
          t: item.t || item.timestamp,
          p: item.p || item.price
        }));
      }
      
      this.logger.warn('Unexpected price history response format:', JSON.stringify(data).substring(0, 200));
      return [];
    } catch (error) {
      this.logger.error('Failed to fetch price history from CLOB:', error);
      throw error;
    }
  }

  // Get order book for a specific token
  async getOrderBook(tokenId: string): Promise<any> {
    try {
      this.logger.log(`Fetching order book for token ${tokenId}`);
      
      const response = await fetch(`https://clob.polymarket.com/book?token_id=${tokenId}`);
      
      if (!response.ok) {
        throw new Error(`CLOB API error: ${response.status} ${response.statusText}`);
      }

      const orderBook = await response.json();
      this.logger.log(`Successfully fetched order book with ${orderBook.bids?.length || 0} bids and ${orderBook.asks?.length || 0} asks`);
      
      return orderBook;
    } catch (error) {
      this.logger.error('Failed to fetch order book from CLOB:', error);
      throw error;
    }
  }

  // Get current price for a token (best bid/ask)
  async getCurrentPrice(tokenId: string): Promise<{ bid: number; ask: number; mid: number }> {
    try {
      const orderBook = await this.getOrderBook(tokenId);
      
      const bestBid = orderBook.bids?.[0]?.price ? parseFloat(orderBook.bids[0].price) : 0;
      const bestAsk = orderBook.asks?.[0]?.price ? parseFloat(orderBook.asks[0].price) : 1;
      const midPrice = (bestBid + bestAsk) / 2;
      
      return {
        bid: bestBid,
        ask: bestAsk,
        mid: midPrice
      };
    } catch (error) {
      this.logger.error('Failed to get current price:', error);
      throw error;
    }
  }

  // Get midpoint price for a token
  async getMidpoint(tokenId: string): Promise<{ midpoint: number }> {
    try {
      this.logger.log(`Fetching midpoint for token ${tokenId}`);
      
      const response = await fetch(`https://clob.polymarket.com/midpoint?token_id=${tokenId}`);
      
      if (!response.ok) {
        throw new Error(`CLOB API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      this.logger.log(`Successfully fetched midpoint: ${data.midpoint}`);
      
      return data;
    } catch (error) {
      this.logger.error('Failed to fetch midpoint from CLOB:', error);
      throw error;
    }
  }

  // Get recent trades for a token
  async getRecentTrades(tokenId: string, limit = 50): Promise<any[]> {
    try {
      this.logger.log(`Fetching recent trades for token ${tokenId}`);
      
      const params = new URLSearchParams({
        token_id: tokenId,
        limit: limit.toString(),
      });
      
      const response = await fetch(`https://clob.polymarket.com/trades?${params}`);
      
      if (!response.ok) {
        throw new Error(`CLOB API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      this.logger.log(`Successfully fetched ${data.length} trades`);
      
      return data;
    } catch (error) {
      this.logger.error('Failed to fetch recent trades from CLOB:', error);
      throw error;
    }
  }

  // Get candlestick data
  async getCandlestickData(tokenId: string, options: {
    startTs?: number;
    endTs?: number;
    interval?: '1m' | '5m' | '15m' | '1h' | '1d';
    fidelity?: number;
  } = {}): Promise<any[]> {
    try {
      const params = new URLSearchParams();
      params.append('token_id', tokenId);
      
      if (options.startTs) params.append('startTs', options.startTs.toString());
      if (options.endTs) params.append('endTs', options.endTs.toString());
      if (options.interval) params.append('interval', options.interval);
      if (options.fidelity) params.append('fidelity', options.fidelity.toString());

      this.logger.log(`Fetching candlestick data for token ${tokenId} with params: ${params.toString()}`);
      
      const response = await fetch(`https://clob.polymarket.com/prices-history?${params}`);
      
      if (!response.ok) {
        throw new Error(`CLOB API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      this.logger.log(`Successfully fetched candlestick data with ${data.history?.length || 0} points`);
      
      return data.history || [];
    } catch (error) {
      this.logger.error('Failed to fetch candlestick data from CLOB:', error);
      throw error;
    }
  }

  // Get bid-ask spread
  async getSpread(tokenId: string): Promise<{ spread: number; spreadPercent: number; bid: number; ask: number }> {
    try {
      const orderBook = await this.getOrderBook(tokenId);
      
      const bestBid = orderBook.bids?.[0]?.price ? parseFloat(orderBook.bids[0].price) : 0;
      const bestAsk = orderBook.asks?.[0]?.price ? parseFloat(orderBook.asks[0].price) : 1;
      const spread = bestAsk - bestBid;
      const midPrice = (bestBid + bestAsk) / 2;
      const spreadPercent = midPrice > 0 ? (spread / midPrice) * 100 : 0;
      
      return {
        spread,
        spreadPercent,
        bid: bestBid,
        ask: bestAsk
      };
    } catch (error) {
      this.logger.error('Failed to calculate spread:', error);
      throw error;
    }
  }

  // Get 24-hour statistics
  async get24HourStats(tokenId: string): Promise<{
    volume24h: number;
    priceChange24h: number;
    priceChangePercent24h: number;
    high24h: number;
    low24h: number;
    trades24h: number;
  }> {
    try {
      this.logger.log(`Fetching 24h stats for token ${tokenId}`);
      
      const now = Date.now();
      const oneDayAgo = now - (24 * 60 * 60 * 1000);
      
      // Get recent trades and price history
      const [trades, priceHistory] = await Promise.all([
        this.getRecentTrades(tokenId, 1000),
        this.getPriceHistory(tokenId, {
          startTs: Math.floor(oneDayAgo / 1000),
          endTs: Math.floor(now / 1000),
          interval: '1h'
        })
      ]);

      // Calculate 24h volume from trades
      const trades24h = trades.filter(trade => 
        new Date(trade.timestamp).getTime() > oneDayAgo
      );
      
      const volume24h = trades24h.reduce((sum, trade) => 
        sum + parseFloat(trade.size || 0), 0
      );

      // Calculate price changes from price history
      let priceChange24h = 0;
      let priceChangePercent24h = 0;
      let high24h = 0;
      let low24h = 1;

      if (priceHistory.length > 0) {
        const prices = priceHistory.map(p => p.p);
        const firstPrice = prices[0];
        const lastPrice = prices[prices.length - 1];
        
        priceChange24h = lastPrice - firstPrice;
        priceChangePercent24h = firstPrice > 0 ? (priceChange24h / firstPrice) * 100 : 0;
        high24h = Math.max(...prices);
        low24h = Math.min(...prices);
      }

      return {
        volume24h,
        priceChange24h,
        priceChangePercent24h,
        high24h,
        low24h,
        trades24h: trades24h.length,
      };
    } catch (error) {
      this.logger.error('Failed to fetch 24h stats:', error);
      throw error;
    }
  }

  // Get order book depth analysis
  async getMarketDepth(tokenId: string, depthLevels = 10): Promise<{
    bids: { price: number; size: number; total: number }[];
    asks: { price: number; size: number; total: number }[];
    bidDepth: number;
    askDepth: number;
    totalDepth: number;
  }> {
    try {
      const orderBook = await this.getOrderBook(tokenId);
      
      // Process bids (highest to lowest)
      const bids = orderBook.bids?.slice(0, depthLevels).map((bid, index) => {
        const price = parseFloat(bid.price);
        const size = parseFloat(bid.size);
        const total = orderBook.bids.slice(0, index + 1)
          .reduce((sum, b) => sum + parseFloat(b.size), 0);
        return { price, size, total };
      }) || [];

      // Process asks (lowest to highest)
      const asks = orderBook.asks?.slice(0, depthLevels).map((ask, index) => {
        const price = parseFloat(ask.price);
        const size = parseFloat(ask.size);
        const total = orderBook.asks.slice(0, index + 1)
          .reduce((sum, a) => sum + parseFloat(a.size), 0);
        return { price, size, total };
      }) || [];

      const bidDepth = bids.reduce((sum, bid) => sum + bid.size, 0);
      const askDepth = asks.reduce((sum, ask) => sum + ask.size, 0);
      const totalDepth = bidDepth + askDepth;

      return {
        bids,
        asks,
        bidDepth,
        askDepth,
        totalDepth,
      };
    } catch (error) {
      this.logger.error('Failed to analyze market depth:', error);
      throw error;
    }
  }

  // DATA API INTEGRATION
  private readonly dataApiUrl = 'https://data-api.polymarket.com';

  // Get user positions
  async getUserPositions(address: string, options: {
    market?: string;
    event?: string;
    sort?: 'TOKENS' | 'CURRENT' | 'INITIAL' | 'CASHPNL' | 'PERCENTPNL' | 'TITLE' | 'RESOLVING' | 'PRICE';
    direction?: 'ASC' | 'DESC';
    limit?: number;
    offset?: number;
  } = {}): Promise<any[]> {
    try {
      const { 
        market, 
        event, 
        sort = 'CURRENT', 
        direction = 'DESC', 
        limit = 100, 
        offset = 0 
      } = options;

      const params = new URLSearchParams({
        address,
        sort,
        direction,
        limit: limit.toString(),
        offset: offset.toString(),
      });

      if (market) params.append('market', market);
      if (event) params.append('event', event);

      this.logger.log(`Fetching positions for address ${address} with params: ${params.toString()}`);
      
      const response = await fetch(`${this.dataApiUrl}/positions?${params}`);
      
      if (!response.ok) {
        throw new Error(`Data API error: ${response.status} ${response.statusText}`);
      }

      const positions = await response.json();
      this.logger.log(`Successfully fetched ${positions.length} positions`);
      
      return positions;
    } catch (error) {
      this.logger.error('Failed to fetch user positions:', error);
      throw error;
    }
  }

  // Get user activity
  async getUserActivity(address: string, options: {
    market?: string;
    event?: string;
    activityType?: 'TRADE' | 'SPLIT' | 'MERGE' | 'REDEEM' | 'REWARD' | 'CONVERSION';
    tradeSide?: 'BUY' | 'SELL';
    startTs?: number;
    endTs?: number;
    limit?: number;
    offset?: number;
  } = {}): Promise<any[]> {
    try {
      const { 
        market, 
        event, 
        activityType, 
        tradeSide, 
        startTs, 
        endTs, 
        limit = 100, 
        offset = 0 
      } = options;

      const params = new URLSearchParams({
        address,
        limit: limit.toString(),
        offset: offset.toString(),
      });

      if (market) params.append('market', market);
      if (event) params.append('event', event);
      if (activityType) params.append('activityType', activityType);
      if (tradeSide) params.append('tradeSide', tradeSide);
      if (startTs) params.append('startTs', startTs.toString());
      if (endTs) params.append('endTs', endTs.toString());

      this.logger.log(`Fetching activity for address ${address} with params: ${params.toString()}`);
      
      const response = await fetch(`${this.dataApiUrl}/activity?${params}`);
      
      if (!response.ok) {
        throw new Error(`Data API error: ${response.status} ${response.statusText}`);
      }

      const activity = await response.json();
      this.logger.log(`Successfully fetched ${activity.length} activity records`);
      
      return activity;
    } catch (error) {
      this.logger.error('Failed to fetch user activity:', error);
      throw error;
    }
  }

  // Calculate portfolio performance
  async getPortfolioPerformance(address: string): Promise<{
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
    try {
      const [positions, recentActivity] = await Promise.all([
        this.getUserPositions(address, { sort: 'CURRENT', limit: 1000 }),
        this.getUserActivity(address, { activityType: 'TRADE', limit: 50 })
      ]);

      // Calculate portfolio metrics
      const totalValue = positions.reduce((sum, pos) => sum + (pos.currentValue || 0), 0);
      const totalPnL = positions.reduce((sum, pos) => sum + (pos.pnl || 0), 0);
      const totalInitialValue = positions.reduce((sum, pos) => sum + (pos.initialValue || 0), 0);
      const totalPnLPercent = totalInitialValue > 0 ? (totalPnL / totalInitialValue) * 100 : 0;

      // Calculate win rate
      const resolvedPositions = positions.filter(pos => pos.resolved);
      const winningPositions = resolvedPositions.filter(pos => (pos.pnl || 0) > 0);
      const winRate = resolvedPositions.length > 0 ? (winningPositions.length / resolvedPositions.length) * 100 : 0;

      // Calculate average return
      const avgPnLPercent = resolvedPositions.length > 0 
        ? resolvedPositions.reduce((sum, pos) => sum + (pos.pnlPercent || 0), 0) / resolvedPositions.length 
        : 0;

      // Find best and worst positions
      const bestPosition = positions.reduce((best, pos) => 
        (pos.pnlPercent || 0) > (best?.pnlPercent || -Infinity) ? pos : best, null);
      const worstPosition = positions.reduce((worst, pos) => 
        (pos.pnlPercent || 0) < (worst?.pnlPercent || Infinity) ? pos : worst, null);

      return {
        totalValue,
        totalPnL,
        totalPnLPercent,
        positionsCount: positions.length,
        winRate,
        averageReturn: avgPnLPercent,
        bestPosition,
        worstPosition,
        recentActivity: recentActivity.slice(0, 10),
      };
    } catch (error) {
      this.logger.error('Failed to calculate portfolio performance:', error);
      throw error;
    }
  }

  // Get leaderboard data
  async getLeaderboard(options: {
    metric?: 'VOLUME' | 'PNL' | 'WINRATE' | 'TRADES';
    timeframe?: '24H' | '7D' | '30D' | 'ALL';
    limit?: number;
  } = {}): Promise<{
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
    try {
      const { metric = 'PNL', timeframe = '30D', limit = 100 } = options;

      // Note: This is a mock implementation since Polymarket doesn't have a public leaderboard API
      // In a real implementation, you would aggregate user data from the positions/activity APIs
      this.logger.log(`Generating leaderboard for metric: ${metric}, timeframe: ${timeframe}`);

      // Mock leaderboard data - in production this would aggregate real user data
      const mockLeaderboard = Array.from({ length: limit }, (_, i) => ({
        address: `0x${Math.random().toString(16).substr(2, 40)}`,
        rank: i + 1,
        metric,
        value: Math.random() * 10000,
        positions: Math.floor(Math.random() * 50) + 1,
        winRate: Math.random() * 100,
      }));

      return {
        ranking: mockLeaderboard,
        userRank: undefined, // Would be calculated based on user's address
      };
    } catch (error) {
      this.logger.error('Failed to generate leaderboard:', error);
      throw error;
    }
  }

  // Helper method to check API health
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/markets?limit=1`);
      return response.ok;
    } catch {
      return false;
    }
  }
}