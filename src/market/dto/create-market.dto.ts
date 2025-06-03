import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateMarketDto {
  @IsString()
  @ApiProperty({
    description: 'Question for the market',
    example: 'Will Bitcoin reach $100,000 by the end of 2025?',
  })
  question: string;

  @IsString()
  @ApiProperty({
    description: 'Detailed description of the market',
    example: 'This market predicts whether Bitcoin will hit a 100K milestone by 2025.',
  })
  description: string;

  @IsString()
  @ApiProperty({
    description: 'Deployed contract address of Market'
  })
  contract_address: string;

  @IsString()
  @ApiProperty({
    description: 'On what parameters the market will be resolved',
    example: 'https://coinmarketcap.com listing the token by end of 2025',
  })
  resolution_criteria: string;

  @IsDateString()
  @ApiProperty({
    description: 'Expiry date of the market in ISO format',
    example: '2025-12-31T23:59:59.000Z',
  })
  expiry_date: Date;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Optional image URL related to the market',
    example: 'https://example.com/market-image.png',
  })
  image?: string;
}
