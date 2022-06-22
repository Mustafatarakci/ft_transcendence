import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatContents } from './entities/chatContents.entity';
import { ChatParticipant } from './entities/chatParticipant.entity';
import { ChattingRoom } from './entities/chattingRoom.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatContents, ChatParticipant, ChattingRoom]),
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
