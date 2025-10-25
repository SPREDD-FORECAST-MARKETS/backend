import { Module } from '@nestjs/common';
import { BridgeService } from './bridge.service';
import { BridgeController } from './bridge.controller';

@Module({
  providers: [BridgeService],
  controllers: [BridgeController],
  exports: [BridgeService],
})
export class BridgeModule {}