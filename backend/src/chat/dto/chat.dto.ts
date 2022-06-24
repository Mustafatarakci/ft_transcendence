import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class ChattingRoomDataDto {
  @ApiProperty({ description: '채팅방 id' })
  id: number;

  @ApiProperty({ description: '채팅방 제목' })
  title: string;

  @ApiProperty({ description: '채팅방 비밀번호' })
  password: string | null;

  @ApiProperty({ description: '채팅방 소유자' })
  ownerId: number;
}

export class ChattingRoomsDto {
  @ApiProperty({ description: '채팅방 id' })
  id: number;

  @ApiProperty({ description: '채팅방 제목' })
  title: string;

  @ApiProperty({ description: '채팅방 비밀번호' })
  password: string | null;

  @ApiProperty({ description: '채팅방 소유자' })
  ownerId: number;

  @ApiProperty({ description: '채팅방 참여인원' })
  numberOfParticipants: number;

  @ApiProperty({ description: 'dm방 여부' })
  isDm: boolean;
}

export class CreateChattingRoomDto {
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
