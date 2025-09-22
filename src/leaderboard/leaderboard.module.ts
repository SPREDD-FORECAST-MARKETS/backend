import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { LeaderboardService } from './leaderboard.service';
import { LeaderboardController } from './leaderboard.controller';
import { LeaderboardApiService } from './leaderboard.api.service';
import { PrismaService } from 'src/prisma/prisma.service'; // Adjust path as needed

@Module({
  imports: [ConfigModule, ScheduleModule.forRoot()],
  controllers: [LeaderboardController],

  providers: [LeaderboardService, LeaderboardApiService, PrismaService],
})
export class LeaderboardModule {}
