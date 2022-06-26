import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatGateway } from './chat.gateway';
import {
  ChatContentDto,
  ChatRoomDataDto,
  ChatRoomDto,
  CreateChatRoomDto,
} from './dto/chat.dto';
import { ChatContents } from './entities/chatContents.entity';
import { ChatParticipant } from './entities/chatParticipant.entity';
import { ChatRoom as ChatRoom } from './entities/chattingRoom.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatContents)
    private readonly chatContentsRepo: Repository<ChatContents>,
    @InjectRepository(ChatParticipant)
    private readonly chatParticipantRepo: Repository<ChatParticipant>,
    @InjectRepository(ChatRoom)
    private readonly chatRoomRepo: Repository<ChatRoom>,
    private readonly ChatGateway: ChatGateway
  ) { }

  async getChatRoomById(id: number): Promise<ChatRoom> {
    const chatRoom = await this.chatRoomRepo.findOneOrFail({ where: { id } });

    return chatRoom;
  }

  async getChatRooms(): Promise<ChatRoomDto[]> {
    let chatRooms = await this.chatRoomRepo
      .createQueryBuilder('chattingRoom')
      .leftJoinAndSelect('chattingRoom.chatParticipant', 'chatParticipant')
      .getMany();

    chatRooms = chatRooms.filter((chattingRoom) => !chattingRoom.isDm);

    return chatRooms.map((chattingRoom) => {
      return chattingRoom.toChatRoomDto();
    });
  }

  async getRoomParticipants(roomId: number): Promise<ChatParticipant[]> {
    const chatRoom = await this.getChatRoomById(roomId);

    return chatRoom.chatParticipant;
  }

  async getParticipatingChattingRooms(userId: number): Promise<ChatRoomDto[]> {
    const chattingRooms = await this.chatRoomRepo
      .createQueryBuilder('chattingRoom')
      .leftJoinAndSelect('chattingRoom.chatParticipant', 'chatParticipant')
      .where('chatParticipant.userId = :userId', { userId })
      .getMany();

    return chattingRooms.map((chattingRoom) => {
      return chattingRoom.toChatRoomDto();
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
    createChattingRoomDto: CreateChatRoomDto,
  ): Promise<ChatRoomDataDto> {
    const chattingRoom = new ChatRoom();
    chattingRoom.title = createChattingRoomDto.title;
    chattingRoom.password = createChattingRoomDto.password;
    chattingRoom.ownerId = createChattingRoomDto.ownerId;
    chattingRoom.isDm = createChattingRoomDto.isDm;

    const createdChattingRoom = await this.chatRoomRepo.save(chattingRoom);

    await this.addUserToChattingRoom(
      createdChattingRoom.id,
      createdChattingRoom.ownerId,
      'owner',
    );

    const chattingRoomDataDto = new ChatRoomDataDto();
    chattingRoomDataDto.id = createdChattingRoom.id;
    chattingRoomDataDto.title = createdChattingRoom.title;
    chattingRoomDataDto.password = createdChattingRoom.password;
    chattingRoomDataDto.ownerId = createdChattingRoom.ownerId;

    return chattingRoomDataDto;
  }

  async submitChatContent(
    roomId: number,
    // ChatContentDto: ChatContentDto,
  ): Promise<void> {
    //채팅 DB에 저장
    // const message = ChatContentDto.message;
    // const chatContents = new ChatContents();

    // chatContents.chattingRoomId = roomId;
    // chatContents.userId = ;
    // chatContents.content = message;

    // this.chatContentsRepo.save();
    //전체에 emit
    this.ChatGateway.server.emit("addChat", { content: "hello", isNotice: 0 });
  }
}
