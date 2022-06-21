import { ApiProperty } from '@nestjs/swagger';

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
}
