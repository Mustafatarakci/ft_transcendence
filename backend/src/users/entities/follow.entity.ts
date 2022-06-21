import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BlockedUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '팔로우 하는 유저의 id' })
  @Column()
  followerId: number;

  @ApiProperty({ description: '팔로우 당하는 유저의 id' })
  @Column()
  followId: number;
}
