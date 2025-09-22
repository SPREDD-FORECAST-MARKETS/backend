// leaderboard.controller.ts
import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { LeaderboardApiService, LeaderboardResponse } from './leaderboard.api.service';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private leaderboardService: LeaderboardApiService) {}

  @Get('current')
  async getCurrentWeek(): Promise<LeaderboardResponse | null> {
    return this.leaderboardService.getCurrentWeekLeaderboard();
  }

  @Get('week/:weekNumber')
  async getWeek(
    @Param('weekNumber', ParseIntPipe) weekNumber: number,
  ): Promise<LeaderboardResponse | null> {
    return this.leaderboardService.getWeekLeaderboard(weekNumber);
  }

  @Get('weeks')
  async getAllWeeks() {
    return this.leaderboardService.getAllWeeks();
  }

  @Get('trader/:walletAddress/history')
  async getTraderHistory(@Param('walletAddress') walletAddress: string) {
    return this.leaderboardService.getTraderHistory(walletAddress);
  }

  @Get('creator/:walletAddress/history')
  async getCreatorHistory(@Param('walletAddress') walletAddress: string) {
    return this.leaderboardService.getCreatorHistory(walletAddress);
  }

  @Get('top-traders')
  async getTopTraders(@Query('week') week?: string) {
    const weekNumber = week ? parseInt(week) : undefined;
    return this.leaderboardService.getTopKTraders(weekNumber);
  }

  @Get('top-creators')
  async getTopCreators(@Query('week') week?: string) {
    const weekNumber = week ? parseInt(week) : undefined;
    return this.leaderboardService.getTopKCreators(weekNumber);
  }

  @Get('stats')
  async getStats() {
    return this.leaderboardService.getLeaderboardStats();
  }
}