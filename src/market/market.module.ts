import { Module } from '@nestjs/common';
import { SupabaseModule } from '../supabase/supabase.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { MarketController } from './market.controller';
import { MarketService } from './market.service';

@Module({
  imports: [SupabaseModule],
  controllers: [MarketController],
  providers: [PrismaService, MarketService],
  exports: [MarketService],
})
export class MarketModule {}
