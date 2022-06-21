import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './users.entity';

@Entity()
export class BlockedUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @ApiProperty({ description: '차단 하는 유저의 id' })
  // @Column()
  // blockerId: number;

  // @ApiProperty({ description: '차단 당하는 유저의 id' })
  // @Column()
  // blockedId: number;

  @ApiProperty({ description: '차단 하는 유저의 id' })
  @ManyToOne(() => User, (user) => user.blocker)
  @JoinColumn({ name: 'blockerId' })
  blocker: User;

  @ApiProperty({ description: '차단 당하는 유저의 id' })
  @ManyToOne(() => User, (user) => user.blocked)
  @JoinColumn({ name: 'blockedId' })
  blocked: User;
}
