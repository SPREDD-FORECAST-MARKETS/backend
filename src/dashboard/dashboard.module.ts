import { Module } from '@nestjs/common';
import { SupabaseModule } from '../supabase/supabase.module';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [SupabaseModule],
  controllers: [DashboardController],
  providers: [PrismaService, DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}
