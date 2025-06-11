import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsInt } from 'class-validator';

export class CreateOrUpdateTokenAllocationDto {
  @IsNumber()
  @ApiProperty({
    description: 'Amount of tokens to allocate',
    example: 500,
  })
  amount: number;

  @IsInt()
  @ApiProperty({
    description: 'ID of the outcome to which the tokens are allocated',
    example: 1,
  })
  outcomeId: number;
}
