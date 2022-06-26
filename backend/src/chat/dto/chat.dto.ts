import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString, IsDateString } from 'class-validator';
import { PrimaryColumnCannotBeNullableError } from 'typeorm';

export class ChatRoomDataDto {
  @ApiProperty({ description: '채팅방 id' })
  id: number;

  @ApiProperty({ description: '채팅방 제목' })
  title: string;

  @ApiProperty({ description: '채팅방 소유자' })
  ownerId: number;
}

export class ChatRoomDto {
  @ApiProperty({ description: '채팅방 id' })
  id: number;

  @ApiProperty({ description: '채팅방 제목' })
  title: string;

  @ApiProperty({ description: '채팅방 소유자' })
  ownerId: number;

  @ApiProperty({ description: '채팅방 참여인원' })
  numberOfParticipants: number;

  @ApiProperty({ description: 'dm방 여부' })
  isDm: boolean;
}

export class CreateChatRoomDto {
  @ApiProperty({ description: '채팅방 제목' })
  @IsString()
  title: string;

  @ApiProperty({ description: '채팅방 비밀번호' })
  @IsString()
  @IsOptional()
  password: string | null;

  @ApiProperty({ description: '채팅방 소유자 userId' })
  @IsNumber()
  ownerId: number;

  @ApiProperty({ description: 'dm방인지 여부' })
  @IsBoolean()
  isDm: boolean;
}

export class ChatRoomParticipantsDto {
  @ApiProperty({ description: '유저id( DB key )' })
  @IsNumber()
  userId: number;

  @ApiProperty({ description: '유저 닉네임' })
  @IsString()
  nickname: string;

  // @ApiProperty({ description: '온라인인지 여부' })
  // @IsBoolean()
  // isOnline: boolean;

  // @ApiProperty({ description: '게임중인지 여부' })
  // @IsBoolean()
  // isGaming: boolean;

  @ApiProperty({ description: '친구인지 여부' })
  @IsBoolean()
  isFriend: boolean;
}

export class RoomPasswordDto {
  @ApiProperty({ description: '채팅방 비밀번호' })
  @IsString()
  @IsOptional()
  password: string | null;
}

export class ChatRoomIdDto {
  @ApiProperty({ description: '채팅방 id' })
  @IsNumber()
  @IsOptional()
  chatRoomId: number;
}

export class UpdateChatRoomDto {
  @ApiProperty({ description: '채팅방 제목' })
  @IsString()
  title: string;

  @ApiProperty({ description: '채팅방 비밀번호' })
  @IsString()
  @IsOptional()
  password: string | null;
}
export class ChatContentDto {
  @ApiProperty({ description: '채팅 내용' })
  @IsString()
  message: string;

  @ApiProperty({ description: '공지 메시지인지 여부' })
  @IsBoolean()
  isBroadcast: boolean;

  from?: {
    nickname: string;
    profileImage: string;
  };

  @ApiProperty({ description: '자신이 보낸 메세지인지 여부' })
  @IsBoolean()
  fromUser: boolean;


  @ApiProperty({ description: '자신이 보낸 메세지인지 여부' })
  @IsDateString()
  createdAt: string;
}
