import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface BridgeQuote {
  id: string;
  fromChain: number;
  toChain: number;
  fromToken: string;
  toToken: string;
  amount: string;
  estimatedOutput: string;
  estimatedGas: string;
  estimatedTime: number; // in seconds
  route: BridgeRoute[];
  fees: BridgeFees;
  provider: 'lifi' | 'swing' | 'rango';
}

export interface BridgeRoute {
  protocol: string;
  fromChain: number;
  toChain: number;
  fromToken: string;
  toToken: string;
  amount: string;
  estimatedOutput: string;
}

export interface BridgeFees {
  gas: string;
  bridge: string;
  protocol: string;
  total: string;
}

export interface BridgeTransaction {
  id: string;
  quoteId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  fromChain: number;
  toChain: number;
  fromTxHash?: string;
  toTxHash?: string;
  amount: string;
  recipient: string;
  createdAt: Date;
  updatedAt: Date;
  provider: string;
  estimatedTime: number;
  actualTime?: number;
}

export interface GetQuoteParams {
  fromChain: number;
  toChain: number;
  fromToken: string;
  toToken: string;
  amount: string;
  userAddress: string;
  slippage?: number;
}

export interface ExecuteBridgeParams {
  quoteId: string;
  userAddress: string;
  recipient?: string;
}

@Injectable()
export class BridgeService {
  private readonly logger = new Logger(BridgeService.name);

  // Base chain ID
  private readonly BASE_CHAIN_ID = 8453;
  
  // Common token addresses
  private readonly TOKENS = {
    // Base tokens
    [this.BASE_CHAIN_ID]: {
      USDC: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
      ETH: '0x0000000000000000000000000000000000000000',
      WETH: '0x4200000000000000000000000000000000000006',
    },
    // Ethereum tokens
    1: {
      USDC: '0xA0b86a33E6411f8fffaD4c1b3BFf7eFb7AAaD01E',
      ETH: '0x0000000000000000000000000000000000000000',
      WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    },
    // Polygon tokens
    137: {
      USDC: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      ETH: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
      WETH: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
    },
  };

  constructor(private configService: ConfigService) {}

  async getQuote(params: GetQuoteParams): Promise<BridgeQuote> {
    const {
      fromChain,
      toChain,
      fromToken,
      toToken,
      amount,
      userAddress,
      slippage = 0.5,
    } = params;

    try {
      // Try multiple bridge providers for best rates
      const [lifiQuote, swingQuote, rangoQuote] = await Promise.allSettled([
        this.getLifiQuote(params),
        this.getSwingQuote(params),
        this.getRangoQuote(params),
      ]);

      const quotes: BridgeQuote[] = [];

      if (lifiQuote.status === 'fulfilled') quotes.push(lifiQuote.value);
      if (swingQuote.status === 'fulfilled') quotes.push(swingQuote.value);
      if (rangoQuote.status === 'fulfilled') quotes.push(rangoQuote.value);

      if (quotes.length === 0) {
        throw new Error('No bridge quotes available');
      }

      // Return the best quote (highest output after fees)
      return quotes.reduce((best, current) => {
        const bestNet = parseFloat(best.estimatedOutput) - parseFloat(best.fees.total);
        const currentNet = parseFloat(current.estimatedOutput) - parseFloat(current.fees.total);
        return currentNet > bestNet ? current : best;
      });

    } catch (error) {
      this.logger.error('Failed to get bridge quote', error);
      throw error;
    }
  }

  async executeBridge(params: ExecuteBridgeParams): Promise<BridgeTransaction> {
    const { quoteId, userAddress, recipient } = params;

    try {
      // This would integrate with the actual bridge API
      // For now, return a mock transaction
      const transaction: BridgeTransaction = {
        id: `bridge_${Date.now()}`,
        quoteId,
        status: 'pending',
        fromChain: 1, // Will be determined from quote
        toChain: this.BASE_CHAIN_ID,
        amount: '0', // Will be determined from quote
        recipient: recipient || userAddress,
        createdAt: new Date(),
        updatedAt: new Date(),
        provider: 'lifi', // Will be determined from quote
        estimatedTime: 600, // 10 minutes
      };

      return transaction;
    } catch (error) {
      this.logger.error('Failed to execute bridge transaction', error);
      throw error;
    }
  }

  async getTransactionStatus(transactionId: string): Promise<BridgeTransaction | null> {
    try {
      // This would query the bridge provider for transaction status
      // For now, return mock data
      return null;
    } catch (error) {
      this.logger.error(`Failed to get transaction status for ${transactionId}`, error);
      throw error;
    }
  }

  async getSupportedChains(): Promise<{ chainId: number; name: string; tokens: string[] }[]> {
    return [
      {
        chainId: 1,
        name: 'Ethereum',
        tokens: Object.keys(this.TOKENS[1] || {}),
      },
      {
        chainId: this.BASE_CHAIN_ID,
        name: 'Base',
        tokens: Object.keys(this.TOKENS[this.BASE_CHAIN_ID] || {}),
      },
      {
        chainId: 137,
        name: 'Polygon',
        tokens: Object.keys(this.TOKENS[137] || {}),
      },
    ];
  }

  private async getLifiQuote(params: GetQuoteParams): Promise<BridgeQuote> {
    const {
      fromChain,
      toChain,
      fromToken,
      toToken,
      amount,
      userAddress,
      slippage = 0.5,
    } = params;

    try {
      // LI.FI API integration
      const apiUrl = 'https://li.quest/v1/quote';
      const queryParams = new URLSearchParams({
        fromChain: fromChain.toString(),
        toChain: toChain.toString(),
        fromToken,
        toToken,
        fromAmount: amount,
        fromAddress: userAddress,
        slippage: (slippage / 100).toString(),
      });

      const response = await fetch(`${apiUrl}?${queryParams}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`LI.FI API error: ${response.status}`);
      }

      const data = await response.json();

      return {
        id: `lifi_${Date.now()}`,
        fromChain,
        toChain,
        fromToken,
        toToken,
        amount,
        estimatedOutput: data.estimate?.toAmount || '0',
        estimatedGas: data.estimate?.gasCosts?.[0]?.estimate || '0',
        estimatedTime: data.estimate?.executionDuration || 600,
        route: data.toolDetails?.map((tool: any) => ({
          protocol: tool.name,
          fromChain,
          toChain,
          fromToken,
          toToken,
          amount,
          estimatedOutput: tool.toAmount || '0',
        })) || [],
        fees: {
          gas: data.estimate?.gasCosts?.[0]?.estimate || '0',
          bridge: data.estimate?.feeCosts?.[0]?.amount || '0',
          protocol: '0',
          total: data.estimate?.totalFeeCosts || '0',
        },
        provider: 'lifi',
      };
    } catch (error) {
      this.logger.error('Failed to get LI.FI quote', error);
      throw error;
    }
  }

  private async getSwingQuote(params: GetQuoteParams): Promise<BridgeQuote> {
    // Swing API integration would go here
    // For now, return a mock quote
    return {
      id: `swing_${Date.now()}`,
      fromChain: params.fromChain,
      toChain: params.toChain,
      fromToken: params.fromToken,
      toToken: params.toToken,
      amount: params.amount,
      estimatedOutput: params.amount, // Mock: 1:1 conversion
      estimatedGas: '0.001',
      estimatedTime: 300,
      route: [],
      fees: {
        gas: '0.001',
        bridge: '0.001',
        protocol: '0',
        total: '0.002',
      },
      provider: 'swing',
    };
  }

  private async getRangoQuote(params: GetQuoteParams): Promise<BridgeQuote> {
    // Rango API integration would go here
    // For now, return a mock quote
    return {
      id: `rango_${Date.now()}`,
      fromChain: params.fromChain,
      toChain: params.toChain,
      fromToken: params.fromToken,
      toToken: params.toToken,
      amount: params.amount,
      estimatedOutput: params.amount, // Mock: 1:1 conversion
      estimatedGas: '0.0015',
      estimatedTime: 450,
      route: [],
      fees: {
        gas: '0.0015',
        bridge: '0.0015',
        protocol: '0',
        total: '0.003',
      },
      provider: 'rango',
    };
  }

  // Utility methods
  getTokenAddress(chainId: number, symbol: string): string | null {
    return this.TOKENS[chainId]?.[symbol.toUpperCase()] || null;
  }

  isBaseChain(chainId: number): boolean {
    return chainId === this.BASE_CHAIN_ID;
  }

  async validateBridgeParams(params: GetQuoteParams): Promise<boolean> {
    const { fromChain, toChain, fromToken, toToken, amount } = params;

    // Validate chain IDs
    const supportedChains = await this.getSupportedChains();
    const supportedChainIds = supportedChains.map(chain => chain.chainId);

    if (!supportedChainIds.includes(fromChain) || !supportedChainIds.includes(toChain)) {
      return false;
    }

    // Validate amount
    if (parseFloat(amount) <= 0) {
      return false;
    }

    // For Base chain betting, at least one chain should be Base
    if (fromChain !== this.BASE_CHAIN_ID && toChain !== this.BASE_CHAIN_ID) {
      return false;
    }

    return true;
  }
}