import { Module } from '@nestjs/common';
import { GamesController } from './gameRecord.controller';
import { GamesService } from './gameRecord.service';

@Module({
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
