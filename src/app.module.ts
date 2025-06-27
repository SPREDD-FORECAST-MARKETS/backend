import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { SupabaseModule } from './supabase/supabase.module';
import { FilesModule } from './files/file.module';
import { MarketModule } from './market/market.module';
import { UserModule } from './user/user.module';
import { TradeModule } from './trade/trade.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './cron.service';

@Module({
  imports: [
    AuthModule,
    SupabaseModule,
    FilesModule,
    MarketModule,
    UserModule,
    TradeModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, TasksService],
})
export class AppModule { }
