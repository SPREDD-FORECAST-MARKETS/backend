import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiBody } from '@nestjs/swagger';
import { BridgeService, BridgeQuote, BridgeTransaction, GetQuoteParams, ExecuteBridgeParams } from './bridge.service';

class GetQuoteDto {
  fromChain: number;
  toChain: number;
  fromToken: string;
  toToken: string;
  amount: string;
  userAddress: string;
  slippage?: number;
}

class ExecuteBridgeDto {
  quoteId: string;
  userAddress: string;
  recipient?: string;
}

@ApiTags('bridge')
@Controller('bridge')
export class BridgeController {
  constructor(private readonly bridgeService: BridgeService) {}

  @Post('quote')
  @ApiOperation({ summary: 'Get bridge quote for cross-chain transfer' })
  @ApiBody({ type: GetQuoteDto })
  @ApiResponse({ status: 200, description: 'Bridge quote retrieved successfully' })
  @ApiResponse({ status: 400, description: 'Invalid bridge parameters' })
  async getQuote(@Body() params: GetQuoteDto): Promise<BridgeQuote> {
    const isValid = await this.bridgeService.validateBridgeParams(params);
    if (!isValid) {
      throw new Error('Invalid bridge parameters');
    }

    return this.bridgeService.getQuote(params);
  }

  @Post('execute')
  @ApiOperation({ summary: 'Execute bridge transaction' })
  @ApiBody({ type: ExecuteBridgeDto })
  @ApiResponse({ status: 200, description: 'Bridge transaction initiated successfully' })
  async executeBridge(@Body() params: ExecuteBridgeDto): Promise<BridgeTransaction> {
    return this.bridgeService.executeBridge(params);
  }

  @Get('transaction/:id')
  @ApiOperation({ summary: 'Get bridge transaction status' })
  @ApiParam({ name: 'id', type: String, description: 'Transaction ID' })
  @ApiResponse({ status: 200, description: 'Transaction status retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  async getTransactionStatus(@Param('id') id: string): Promise<BridgeTransaction | null> {
    return this.bridgeService.getTransactionStatus(id);
  }

  @Get('chains')
  @ApiOperation({ summary: 'Get supported chains and tokens' })
  @ApiResponse({ status: 200, description: 'Supported chains retrieved successfully' })
  async getSupportedChains(): Promise<{ chainId: number; name: string; tokens: string[] }[]> {
    return this.bridgeService.getSupportedChains();
  }

  @Get('token-address')
  @ApiOperation({ summary: 'Get token address for a specific chain' })
  @ApiQuery({ name: 'chainId', type: Number, description: 'Chain ID' })
  @ApiQuery({ name: 'symbol', type: String, description: 'Token symbol' })
  @ApiResponse({ status: 200, description: 'Token address retrieved successfully' })
  async getTokenAddress(
    @Query('chainId') chainId: number,
    @Query('symbol') symbol: string,
  ): Promise<{ address: string | null }> {
    const address = this.bridgeService.getTokenAddress(chainId, symbol);
    return { address };
  }

  @Get('health')
  @ApiOperation({ summary: 'Check bridge service health' })
  @ApiResponse({ status: 200, description: 'Bridge service health status' })
  async healthCheck(): Promise<{ healthy: boolean; supportedProviders: string[] }> {
    return {
      healthy: true,
      supportedProviders: ['lifi', 'swing', 'rango'],
    };
  }
}