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
export class Follow extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @ApiProperty({ description: '팔로우 하는 유저의 id' })
  // @Column()
  // followerId: number;

  // @ApiProperty({ description: '팔로우 당하는 유저의 id' })
  // @Column()
  // followId: number;

  @ApiProperty({ description: '팔로우 하는 유저의 id' })
  @ManyToOne(() => User, (user) => user.follower)
  @JoinColumn({ name: 'followerId' })
  follower: User;

  @ApiProperty({ description: '팔로우 당하는 유저의 id' })
  @ManyToOne(() => User, (user) => user.follow)
  @JoinColumn({ name: 'followerId' })
  follow: User;
}
