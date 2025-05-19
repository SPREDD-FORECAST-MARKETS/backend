import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { SupabaseModule } from './supabase/supabase.module';
import { FilesModule } from './files/file.module';
import { MarketModule } from './market/market.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    SupabaseModule,
    FilesModule,
    MarketModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
