import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetLatestTradesDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  sort?: 'asc' | 'desc' = 'desc';
}

// trades.response.dto.ts
export class LatestTradeResponseDto {
  id: string;
  marketId: string;
  userId: string;
  username: string;
  outcome: string;
  type: 'BUY' | 'SELL';
  amount: number;
  price: number;
  timestamp: string;
  shares: number;
}
