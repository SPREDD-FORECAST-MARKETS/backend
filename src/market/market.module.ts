import { Module } from '@nestjs/common';
import { SupabaseModule } from '../supabase/supabase.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { MarketController } from './market.controller';
import { MarketService } from './market.service';
import { AgentMarketModule } from '../agent/agent-market.module';
import { AgentMarketService } from '../agent/agent-market.service';

@Module({
  imports: [SupabaseModule, AgentMarketModule],
  controllers: [MarketController],
  providers: [PrismaService, MarketService, AgentMarketService],
  exports: [MarketService],
})
export class MarketModule {}
