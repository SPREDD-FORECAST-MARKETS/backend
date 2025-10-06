import { IsOptional, IsString, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetMarketStatsDto {
  @ApiPropertyOptional({
    description: 'Time interval for chart data aggregation',
    enum: ['10s', '1m', '5m', '1h', '1d', '1mo'],
    example: '1h'
  })
  @IsOptional()
  @IsEnum(['10s', '1m', '5m', '1h', '1d', '1mo'])
  interval?: string;

  @ApiPropertyOptional({
    description: 'Start date for data filtering (ISO string)',
    example: '2024-01-01T00:00:00.000Z'
  })
  @IsOptional()
  @IsString()
  from?: string;

  @ApiPropertyOptional({
    description: 'End date for data filtering (ISO string)', 
    example: '2024-12-31T23:59:59.999Z'
  })
  @IsOptional()
  @IsString()
  to?: string;
}