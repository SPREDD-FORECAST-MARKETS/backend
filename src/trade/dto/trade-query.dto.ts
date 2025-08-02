import { IsOptional, IsString, IsInt, IsEnum, Min, Max } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { OrderType } from 'generated/prisma';

export class TradeQueryDto {
  @ApiPropertyOptional({
    description: 'User wallet address to filter trades',
    example: '0x742d35Cc6634C0532925a3b8D421B52424a30aB2'
  })
  @IsOptional()
  @IsString()
  userWalletAddress?: string;

  @ApiPropertyOptional({
    description: 'Market contract address to filter trades',
    example: '0x123...abc'
  })
  @IsOptional()
  @IsString()
  marketContractAddress?: string;

  @ApiPropertyOptional({
    description: 'Order type filter',
    enum: ['BUY', 'SELL'],
    example: 'BUY'
  })
  @IsOptional()
  @IsEnum(['BUY', 'SELL'])
  orderType?: 'BUY' | 'SELL';

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: ['asc', 'desc'],
    default: 'desc',
    example: 'desc'
  })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'desc';

  @ApiPropertyOptional({
    description: 'Sort field',
    enum: ['createdAt', 'amount', 'order_size', 'afterPrice'],
    default: 'createdAt',
    example: 'createdAt'
  })
  @IsOptional()
  @IsEnum(['createdAt', 'amount', 'order_size', 'afterPrice'])
  sortBy?: 'createdAt' | 'amount' | 'order_size' | 'afterPrice' = 'createdAt';

  @ApiPropertyOptional({
    description: 'Page number (1-based)',
    minimum: 1,
    default: 1,
    example: 1
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    minimum: 1,
    maximum: 100,
    default: 20,
    example: 20
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @ApiPropertyOptional({
    description: 'Start date for filtering trades (ISO string)',
    example: '2024-01-01T00:00:00.000Z'
  })
  @IsOptional()
  @Transform(({ value }) => value ? new Date(value) : undefined)
  startDate?: Date;

  @ApiPropertyOptional({
    description: 'End date for filtering trades (ISO string)',
    example: '2024-12-31T23:59:59.999Z'
  })
  @IsOptional()
  @Transform(({ value }) => value ? new Date(value) : undefined)
  endDate?: Date;
}

export class TradeResponseDto {
  id: number;
  unique_id: string;
  order_type: OrderType;
  order_size: string;
  amount: string;
  afterPrice: string;
  createdAt: Date;
  updatedAt: Date;
  market?: {
    id: number;
    question: string;
    contract_address: string;
    creator: {
      id: number;
      username: string;
      wallet_address: string;
      profile_pic?: string;
    };
  };
  outcome?: {
    id: number;
    outcome_title: string;
  };
  user?: {
    id: number;
    username: string;
    wallet_address: string;
    profile_pic?: string;
  };
}



export class PaginatedTradeResponseDto {
  data: TradeResponseDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
