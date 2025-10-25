import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as WebSocket from 'ws';

export interface WebSocketMessage {
  topic: string;
  type: string;
  data: any;
  timestamp?: number;
}

export interface SubscriptionOptions {
  topic: 'activity' | 'comments' | 'rfq' | 'crypto-prices' | 'clob-user' | 'clob-market';
  type?: string;
  marketId?: string;
  userId?: string;
}

export interface ActivityMessage {
  id: string;
  marketId: string;
  userId: string;
  type: 'buy' | 'sell';
  outcome: string;
  price: number;
  amount: number;
  timestamp: number;
}

export interface CryptoPricesMessage {
  symbol: string;
  price: number;
  change24h: number;
  timestamp: number;
}

export interface CLOBMarketMessage {
  marketId: string;
  orderBook: {
    bids: Array<{ price: number; amount: number }>;
    asks: Array<{ price: number; amount: number }>;
  };
  lastTrade?: {
    price: number;
    amount: number;
    timestamp: number;
  };
}

@Injectable()
export class PolymarketWebSocketService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PolymarketWebSocketService.name);
  private ws: WebSocket | null = null;
  private isConnected = false;
  private subscriptions: Set<string> = new Set();
  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 5;
  private reconnectTimeout: NodeJS.Timeout | null = null;

  // Event listeners
  private messageListeners: Map<string, Set<(data: any) => void>> = new Map();
  private connectionListeners: Set<() => void> = new Set();
  private disconnectionListeners: Set<() => void> = new Set();

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    // Auto-connect on module initialization
    await this.connect();
  }

  onModuleDestroy() {
    this.disconnect();
  }

  async connect(): Promise<void> {
    if (this.isConnected || this.ws?.readyState === WebSocket.CONNECTING) {
      return;
    }

    try {
      // Use Polymarket's real-time WebSocket endpoint
      const wsUrl = 'wss://ws-subscriptions-clob.polymarket.com/ws/v1';
      
      this.ws = new WebSocket(wsUrl);

      this.ws.on('open', () => {
        this.logger.log('Connected to Polymarket WebSocket');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        
        // Notify connection listeners
        this.connectionListeners.forEach(listener => listener());
        
        // Re-subscribe to previous subscriptions
        this.resubscribeAll();
      });

      this.ws.on('message', (data: WebSocket.Data) => {
        try {
          const message = JSON.parse(data.toString());
          this.handleMessage(message);
        } catch (error) {
          this.logger.error('Failed to parse WebSocket message', error);
        }
      });

      this.ws.on('close', (code, reason) => {
        this.logger.warn(`WebSocket connection closed. Code: ${code}, Reason: ${reason}`);
        this.isConnected = false;
        
        // Notify disconnection listeners
        this.disconnectionListeners.forEach(listener => listener());
        
        // Attempt to reconnect
        this.scheduleReconnect();
      });

      this.ws.on('error', (error) => {
        this.logger.error('WebSocket error', error);
        this.isConnected = false;
      });

    } catch (error) {
      this.logger.error('Failed to connect to Polymarket WebSocket', error);
      this.scheduleReconnect();
    }
  }

  private scheduleReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      this.logger.error('Max reconnection attempts reached');
      return;
    }

    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000); // Exponential backoff
    this.reconnectAttempts++;

    this.logger.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
    
    this.reconnectTimeout = setTimeout(() => {
      this.connect();
    }, delay);
  }

  disconnect(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    this.isConnected = false;
    this.subscriptions.clear();
  }

  subscribe(options: SubscriptionOptions): void {
    const subscriptionKey = this.getSubscriptionKey(options);
    
    if (this.subscriptions.has(subscriptionKey)) {
      this.logger.debug(`Already subscribed to ${subscriptionKey}`);
      return;
    }

    this.subscriptions.add(subscriptionKey);

    if (this.isConnected && this.ws) {
      this.sendSubscription(options);
    }
  }

  unsubscribe(options: SubscriptionOptions): void {
    const subscriptionKey = this.getSubscriptionKey(options);
    this.subscriptions.delete(subscriptionKey);

    if (this.isConnected && this.ws) {
      this.sendUnsubscription(options);
    }
  }

  private sendSubscription(options: SubscriptionOptions): void {
    const message = {
      action: 'subscribe',
      subscriptions: [
        {
          topic: options.topic,
          type: options.type || '*',
          ...(options.marketId && { marketId: options.marketId }),
          ...(options.userId && { userId: options.userId }),
        },
      ],
    };

    this.sendMessage(message);
    this.logger.debug(`Subscribed to ${options.topic}:${options.type || '*'}`);
  }

  private sendUnsubscription(options: SubscriptionOptions): void {
    const message = {
      action: 'unsubscribe',
      subscriptions: [
        {
          topic: options.topic,
          type: options.type || '*',
          ...(options.marketId && { marketId: options.marketId }),
          ...(options.userId && { userId: options.userId }),
        },
      ],
    };

    this.sendMessage(message);
    this.logger.debug(`Unsubscribed from ${options.topic}:${options.type || '*'}`);
  }

  private resubscribeAll(): void {
    this.subscriptions.forEach(subscriptionKey => {
      const options = this.parseSubscriptionKey(subscriptionKey);
      if (options) {
        this.sendSubscription(options);
      }
    });
  }

  private sendMessage(message: any): void {
    if (this.ws && this.isConnected) {
      this.ws.send(JSON.stringify(message));
    }
  }

  private handleMessage(message: WebSocketMessage): void {
    const { topic, type, data } = message;
    
    // Add timestamp if not present
    if (!message.timestamp) {
      message.timestamp = Date.now();
    }

    // Notify specific topic listeners
    const topicKey = `${topic}:${type}`;
    const listeners = this.messageListeners.get(topicKey);
    if (listeners) {
      listeners.forEach(listener => {
        try {
          listener(data);
        } catch (error) {
          this.logger.error(`Error in message listener for ${topicKey}`, error);
        }
      });
    }

    // Notify wildcard listeners
    const wildcardListeners = this.messageListeners.get(`${topic}:*`);
    if (wildcardListeners) {
      wildcardListeners.forEach(listener => {
        try {
          listener(data);
        } catch (error) {
          this.logger.error(`Error in wildcard listener for ${topic}`, error);
        }
      });
    }
  }

  // Event listener management
  onMessage(topic: string, type: string, callback: (data: any) => void): void {
    const key = `${topic}:${type}`;
    if (!this.messageListeners.has(key)) {
      this.messageListeners.set(key, new Set());
    }
    this.messageListeners.get(key)!.add(callback);
  }

  offMessage(topic: string, type: string, callback: (data: any) => void): void {
    const key = `${topic}:${type}`;
    const listeners = this.messageListeners.get(key);
    if (listeners) {
      listeners.delete(callback);
      if (listeners.size === 0) {
        this.messageListeners.delete(key);
      }
    }
  }

  onConnection(callback: () => void): void {
    this.connectionListeners.add(callback);
  }

  onDisconnection(callback: () => void): void {
    this.disconnectionListeners.add(callback);
  }

  // Utility methods
  private getSubscriptionKey(options: SubscriptionOptions): string {
    return `${options.topic}:${options.type || '*'}:${options.marketId || ''}:${options.userId || ''}`;
  }

  private parseSubscriptionKey(key: string): SubscriptionOptions | null {
    const parts = key.split(':');
    if (parts.length < 2) return null;

    return {
      topic: parts[0] as any,
      type: parts[1] !== '*' ? parts[1] : undefined,
      marketId: parts[2] || undefined,
      userId: parts[3] || undefined,
    };
  }

  // Status methods
  getConnectionStatus(): { connected: boolean; reconnectAttempts: number } {
    return {
      connected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
    };
  }

  getActiveSubscriptions(): string[] {
    return Array.from(this.subscriptions);
  }

  // Convenience methods for common subscriptions
  subscribeToMarketActivity(marketId?: string): void {
    this.subscribe({
      topic: 'activity',
      type: 'trade',
      marketId,
    });
  }

  subscribeToCryptoPrices(): void {
    this.subscribe({
      topic: 'crypto-prices',
    });
  }

  subscribeToMarketOrderBook(marketId: string): void {
    this.subscribe({
      topic: 'clob-market',
      marketId,
    });
  }
}