import {
  IsOptional,
  IsString,
  IsIn,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResolveMarketDto {
  @ApiProperty({
    description: 'The winning outcome of the market',
    enum: ['YES', 'NO'],
    required: false,
    example: 'YES',
  })
  @IsOptional()
  @IsString()
  @IsIn(['YES', 'NO'], { message: 'Outcome must be either YES or NO' })
  outcomeWon?: string;
}

export class ResolveMarketByIdDto {
  @ApiProperty({
    description: 'The database market ID',
    example: 22,
  })
  @IsNotEmpty()
  @IsNumber({}, { message: 'marketId must be a number' })
  marketId: number;

  @ApiProperty({
    description: 'The winning outcome of the market',
    enum: ['YES', 'NO'],
    required: false,
    example: 'YES',
  })
  @IsOptional()
  @IsString()
  @IsIn(['YES', 'NO'], { message: 'Outcome must be either YES or NO' })
  outcomeWon?: string;
}

export class ResolveMarketResponseDto {
  @ApiProperty({
    description: 'Market database ID',
    example: 123,
  })
  id: number;

  @ApiProperty({
    description: 'Market description',
    example: 'Will Bitcoin reach $100,000 by end of 2024?',
  })
  description: string;

  @ApiProperty({
    description: 'Market question',
    example: 'Bitcoin $100K by 2024?',
  })
  question: string;

  @ApiProperty({
    description: 'Market expiry date',
    example: '2024-12-31T23:59:59.000Z',
  })
  expiry_date: Date;

  @ApiProperty({
    description: 'Market image URL',
    example: 'https://example.com/image.jpg',
    nullable: true,
  })
  image?: string;

  @ApiProperty({
    description: 'Winning Output Result ',
    example: 'yes/no',
  })
  @IsOptional()
  winningOutcome: string;

  @ApiProperty({
    description: 'Market creation date',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Market last update date',
    example: '2024-07-08T10:30:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Creator user ID',
    example: 1,
  })
  creatorId: number;

  @ApiProperty({
    description: 'Market tags',
    example: ['crypto', 'bitcoin', 'price'],
  })
  tags: string[];

  @ApiProperty({
    description: 'Resolution criteria',
    example:
      'Market will be resolved based on CoinMarketCap price at 23:59 UTC on December 31, 2024',
  })
  resolution_criteria: string;

  @ApiProperty({
    description: 'ID of the winning outcome',
    example: 1,
    nullable: true,
  })
  outcomeWon?: number;

  @ApiProperty({
    description: 'Market status',
    enum: ['ACTIVE', 'EXPIRED', 'CLOSED'],
    example: 'CLOSED',
  })
  status: string;

  @ApiProperty({
    description: 'Smart contract address',
    example: '0x1234567890abcdef1234567890abcdef12345678',
  })
  contract_address: string;

  @ApiProperty({
    description: 'Whether the market is resolved',
    example: true,
  })
  isResolved: boolean;

  @ApiProperty({
    description: 'Custom market ID',
    example: 'market-abc-123',
  })
  marketId: string;

  @ApiProperty({
    description: 'Market creator information',
  })
  creator: {
    id: number;
    username: string;
    wallet_address: string;
  };

  @ApiProperty({
    description: 'Market outcomes',
    type: 'array',
  })
  outcome: Array<{
    id: number;
    outcome_title: string;
  }>;
}
