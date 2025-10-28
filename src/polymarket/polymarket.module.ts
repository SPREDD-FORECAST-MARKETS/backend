import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PolymarketService } from './polymarket.service';
import { PolymarketController } from './polymarket.controller';
import { PolymarketWebSocketService } from './polymarket-websocket.service';

@Module({
  imports: [ConfigModule],
  providers: [PolymarketService, PolymarketWebSocketService],
  controllers: [PolymarketController],
  exports: [PolymarketService, PolymarketWebSocketService],
})
export class PolymarketModule {}