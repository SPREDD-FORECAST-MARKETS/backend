import { Module } from '@nestjs/common';
import { SupabaseModule } from '../supabase/supabase.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { TradeController } from './tade.controller';
import { TradeService } from './trade.service';

@Module({
  imports: [SupabaseModule],
  controllers: [TradeController],
  providers: [PrismaService, TradeService],
  exports: [TradeService],
})
export class TradeModule {}
