import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  nickname: string;

  @Column()
  avatar: string;

  @Column()
  email: string;

  @Column()
  secondAuth: boolean;

  // 친구, 승패, 레더레벨, 업적, 모든 경기 기록
}
