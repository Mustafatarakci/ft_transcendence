import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Games extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '첫번째 플래이어의 유저 id' })
  @Column()
  firstPlayer: number;

  @ApiProperty({ description: '두번째 플레이어의 유저 id' })
  @Column()
  secondPlayer: number;

  @ApiProperty({ description: '방 제목' })
  @Column()
  title: string;

  @ApiProperty({ description: '비밀 번호' })
  @Column()
  password: string;
}
