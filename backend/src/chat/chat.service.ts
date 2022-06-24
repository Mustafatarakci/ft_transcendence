import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ChattingRoomDataDto,
  ChattingRoomsDto,
  CreateChattingRoomDto,
} from './dto/chat.dto';
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
      return chattingRoom.toChattingRoomsDto();
    });
  }

  async getParticipatingChattingRooms(
    userId: number,
  ): Promise<ChattingRoomsDto[]> {
    const chattingRooms = await this.chattingRoomRepo
      .createQueryBuilder('chattingRoom')
      .leftJoinAndSelect('chattingRoom.chatParticipant', 'chatParticipant')
      .where('chatParticipant.userId = :userId', { userId })
      .getMany();

    return chattingRooms.map((chattingRoom) => {
      return chattingRoom.toChattingRoomsDto();
    });
  }

  async addUserToChattingRoom(
    chattingRoomId: number,
    userId: number,
    role: 'owner' | 'manager' | 'guest',
  ) {
    const chatParticipant = new ChatParticipant();
    chatParticipant.role = role;
    chatParticipant.chattingRoomId = chattingRoomId;
    chatParticipant.userId = userId;

    this.chatParticipantRepo.save(chatParticipant);
  }

  async createChattingRoom(
    createChattingRoomDto: CreateChattingRoomDto,
  ): Promise<ChattingRoomDataDto> {
    const chattingRoom = new ChattingRoom();
    chattingRoom.title = createChattingRoomDto.title;
    chattingRoom.password = createChattingRoomDto.password;
    chattingRoom.ownerId = createChattingRoomDto.ownerId;
    chattingRoom.isDm = createChattingRoomDto.isDm;

    const createdChattingRoom = await this.chattingRoomRepo.save(chattingRoom);

    await this.addUserToChattingRoom(
      createdChattingRoom.id,
      createdChattingRoom.ownerId,
      'owner',
    );

    const chattingRoomDataDto = new ChattingRoomDataDto();
    chattingRoomDataDto.id = createdChattingRoom.id;
    chattingRoomDataDto.title = createdChattingRoom.title;
    chattingRoomDataDto.password = createdChattingRoom.password;
    chattingRoomDataDto.ownerId = createdChattingRoom.ownerId;

    return chattingRoomDataDto;
  }
}
