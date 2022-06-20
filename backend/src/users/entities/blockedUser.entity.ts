import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BlockedUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '차단 하는 유저의 id' })
  @Column()
  blocker: number;

  @ApiProperty({ description: '차단 당하는 유저의 id' })
  @Column()
  blocked: number;
}
