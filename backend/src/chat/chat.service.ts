import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChattingRoomsDto } from './dto/chat.dto';
import { ChatContents } from './entities/chatContents.entity';
import { ChatParticipant } from './entities/chatParticipant.entity';
import { ChattingRoom } from './entities/chattingRoom.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatContents)
    private readonly chatContentsRepo: Repository<ChatContents>,
    @InjectRepository(ChatParticipant)
    private readonly chatParticipantRepo: Repository<ChatParticipant>,
    @InjectRepository(ChattingRoom)
    private readonly chattingRoomRepo: Repository<ChattingRoom>,
  ) {}

  async getChattingRooms(): Promise<ChattingRoomsDto[]> {
    let chattingRooms = await this.chattingRoomRepo
      .createQueryBuilder('chattingRoom')
      .leftJoinAndSelect('chattingRoom.chatParticipant', 'chatParticipant')
      .getMany();

    chattingRooms = chattingRooms.filter((chattingRoom) => !chattingRoom.isDm);

    return chattingRooms.map((chattingRoom) => {
      const chattingRoomsDto = new ChattingRoomsDto();
      chattingRoomsDto.id = chattingRoom.id;
      chattingRoomsDto.title = chattingRoom.title;
      chattingRoomsDto.password = chattingRoom.password;
      chattingRoomsDto.ownerId = chattingRoom.ownerId;
      chattingRoomsDto.numberOfParticipants =
        chattingRoom.chatParticipant.length;

      return chattingRoomsDto;
    });
  }
}
