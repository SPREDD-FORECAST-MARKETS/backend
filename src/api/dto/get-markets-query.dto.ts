import { IsOptional, IsString, IsInt, IsBoolean, IsArray, IsEnum, Min, Max } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { EventStatus } from 'generated/prisma';

export class GetMarketsQueryDto {
  @ApiPropertyOptional({
    description: 'Page number for pagination',
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
    description: 'Market status filter',
    enum: EventStatus,
    example: 'ACTIVE'
  })
  @IsOptional()
  @IsEnum(EventStatus)
  status?: EventStatus;

  @ApiPropertyOptional({
    description: 'Filter by resolution status',
    example: false
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  resolved?: boolean;

  @ApiPropertyOptional({
    description: 'Filter by tags',
    type: [String],
    example: ['Crypto', 'Politics']
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map(tag => tag.trim());
    }
    return value;
  })
  tags?: string[];

  @ApiPropertyOptional({
    description: 'Search in question and description',
    example: 'Bitcoin price'
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter by creator wallet address',
    example: '0x742d35Cc6634C0532925a3b8D421B52424a30aB2'
  })
  @IsOptional()
  @IsString()
  creator?: string;
}