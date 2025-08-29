import { Module } from '@nestjs/common';
import { CreatorsController } from './creators.controller';
import { CreatorsService } from './creators.service';
import { TwitterService } from '../twitter/twitter.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CreatorsController],
  providers: [CreatorsService, TwitterService, PrismaService],
  exports: [CreatorsService],
})
export class CreatorsModule {}