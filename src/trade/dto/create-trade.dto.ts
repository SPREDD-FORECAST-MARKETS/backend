import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsPositive, IsInt } from 'class-validator';

export enum OrderType {
  BUY = 'BUY',
  SELL = 'SELL',
}

export class CreateTradeDto {
  @IsEnum(OrderType)
  @ApiProperty({
    description: 'Type of order: BUY or SELL',
    enum: OrderType,
    example: OrderType.BUY,
  })
  order_type: OrderType;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Size of the order',
    example: 10.5,
  })
  order_size: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Amount to be paid for the trade',
    example: 1500.75,
  })
  amount: number;

  @IsNumber()
  @ApiProperty({
    description: 'Price shift after the trade is bought',
    example: 1025.5,
  })
  afterPrice: number;

  @IsInt()
  @ApiProperty({
    description: 'ID of the market associated with this trade',
    example: 1,
  })
  marketID: number;

  @IsInt()
  @ApiProperty({
    description: 'ID of the outcome for the trade',
    example: 2,
  })
  outcomeId: number;
}
