
// src/users/dto/user-filter.dto.ts
import { IsOptional, IsString, IsNumber, IsArray } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserFilterDto {
  @ApiProperty({ required: false, example: 1, description: 'Filter by user ID' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  id?: number;

  @ApiProperty({ required: false, example: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', description: 'Filter by wallet address' })
  @IsOptional()
  @IsString()
  walletAddress?: string;

  @ApiProperty({ required: false, example: 5, description: 'Filter users by market ID they participated in' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  marketId?: number;
}