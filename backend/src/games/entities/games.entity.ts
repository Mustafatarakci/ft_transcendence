import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Games extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '첫번째 플래이어의 유저 id' })
  @Column()
  firstPlayerId: number;

  @ApiProperty({ description: '두번째 플레이어의 유저 id' })
  @Column()
  secondPlayerId: number;

  @ApiProperty({ description: '방 제목' })
  @Column()
  title: string;

  @ApiProperty({ description: '비밀 번호' })
  @Column()
  password: string;

  @ApiProperty({ description: '래더게임 여부' })
  @Column()
  isLadder: string;

  @ApiProperty({ description: '첫번째 플레이어의 점수' })
  @Column()
  firstPlayerScore: number;

  @ApiProperty({ description: '두번째 플레이어의 점수' })
  @Column()
  secondPlayerScore: number;
}
