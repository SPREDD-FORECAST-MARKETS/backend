import { Controller, Post, Get, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CreatorsService, CreateCreatorDto, CreatorResponse } from './creators.service';

@Controller('creators')
export class CreatorsController {
  constructor(private readonly creatorsService: CreatorsService) {}

  @Post('join')
  async joinCreators(@Body() dto: CreateCreatorDto): Promise<CreatorResponse> {
    try {
      return await this.creatorsService.joinCreators(dto);
    } catch (error) {
      throw new HttpException(
        {
          message: error instanceof Error ? error.message : 'Failed to join creators program'
        },
        error instanceof HttpException ? error.getStatus() : HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get('list')
  async getCreators(): Promise<CreatorResponse[]> {
    try {
      return await this.creatorsService.getCreators();
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to fetch creators list'
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('count')
  async getCreatorCount(): Promise<{ count: number }> {
    try {
      const count = await this.creatorsService.getCreatorCount();
      return { count };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to fetch creators count'
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}