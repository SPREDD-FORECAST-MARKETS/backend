import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { TwitterValidationResult } from './twitter.types';

@Controller('twitter')
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) {}

  @Get('validate/:username')
  async validateUsername(@Param('username') username: string): Promise<TwitterValidationResult> {
    try {
      const result = await this.twitterService.validateUsername(username);
      return result;
    } catch (error) {
      throw new HttpException(
        {
          isValid: false,
          error: error instanceof Error ? error.message : 'Validation failed'
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}