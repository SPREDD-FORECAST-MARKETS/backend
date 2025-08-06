import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AgentMarketService } from './agent-market.service';

@Module({
  imports: [ConfigModule],
  providers: [AgentMarketService],
  exports: [AgentMarketService],
})
export class AgentMarketModule {}