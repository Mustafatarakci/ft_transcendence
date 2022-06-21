import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/users.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ChatContents extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '채팅방 id' })
  @Column()
  chattingRoomId: number;

  // @ApiProperty({ description: '메세지 보낸 유저 id' })
  // @Column()
  // userId: number;

  @ApiProperty({ description: '메세지 내용' })
  @Column()
  content: string;

  @ApiProperty({ description: '메세지 보낸 시간' })
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdTime: Date;

  @ApiProperty({ description: '메세지 보낸 유저 id' })
  @ManyToOne(() => User, (user) => user.sender)
  @JoinColumn({ name: 'senderId' })
  sender: User;
}
