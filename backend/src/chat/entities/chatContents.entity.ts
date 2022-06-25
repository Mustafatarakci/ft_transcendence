import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/users.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatRoom } from './chattingRoom.entity';

@Entity()
export class ChatContents extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '[FK] 채팅방 id' })
  @Column()
  chattingRoomId: number;

  @ApiProperty({ description: '[FK] 메세지 보낸 유저 id' })
  @Column()
  userId: number;

  @ApiProperty({ description: '메세지 내용' })
  @Column()
  content: string;

  @ApiProperty({ description: '메세지 보낸 시간' })
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdTime: Date;

  @ManyToOne(() => ChatRoom, (chattingRoom) => chattingRoom.chatContents)
  chattingRoom: ChatRoom;

  @ManyToOne(() => User, (user) => user.sender)
  user: User;
}
