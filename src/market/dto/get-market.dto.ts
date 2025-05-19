import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString, IsArray, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetMarketDto {
    @IsArray()
    @IsOptional()
    @ApiPropertyOptional({ type: [String] })
    tags?: string[];

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    @ApiPropertyOptional()
    id?: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    question?: string;


    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ example: 'asc', enum: ['asc', 'desc'] })
    sortBy?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ example: 'createdAt', description: 'Field to sort by' })
    orderBy?: string;

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({ example: 1 })
    page: number;

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({ example: 10 })
    size: number;
}
