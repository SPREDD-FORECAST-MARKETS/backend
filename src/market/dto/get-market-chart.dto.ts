// src/market/dto/get-market-chart.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';

export enum IntervalEnum {
  '10s' = '10s',
  '1m' = '1m',
  '5m' = '5m',
  '1h' = '1h',
  '1d' = '1d',
  '1mo' = '1mo',
}

export class GetMarketChartDto {
  @ApiPropertyOptional({ description: 'Market ID' })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  marketId?: number;

  @ApiPropertyOptional({ description: 'Contract address' })
  @IsOptional()
  contract_address?: string;

  @ApiPropertyOptional({ description: 'Start time (ISO string)' })
  @IsOptional()
  timestampGte?: Date;

  @ApiPropertyOptional({ description: 'End time (ISO string)' })
  @IsOptional()
  timestampLte?: Date;

  @ApiPropertyOptional({
    enum: IntervalEnum,
    description: 'Interval bucket (e.g. 10s, 1m, 5m, etc)',
  })
  @IsOptional()
  @IsEnum(IntervalEnum)
  interval?: IntervalEnum;
}
