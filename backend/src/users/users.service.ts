import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameRecordDto } from './dto/gameRecord.dto';
import {
  UpdateUserDto,
  EmailDto,
  Nickname,
  UserProfileDto,
} from './dto/users.dto';
import { BlockedUser } from './entities/blockedUser.entity';
import { Follow } from './entities/follow.entity';
import { GameRecord } from './entities/gameRecord.entity';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Follow) private readonly followRepo: Repository<Follow>,
    @InjectRepository(BlockedUser)
    private readonly blockedUserRepo: Repository<BlockedUser>,
    @InjectRepository(GameRecord)
    private readonly gameRecordRepo: Repository<GameRecord>,
  ) {}

  async getUsers(): Promise<Nickname[]> {
    const users = await this.userRepo.find();

    return users.map((user) => {
      return { nickname: user.nickname };
    });
  }

  async getFriends(userId: number): Promise<Nickname[]> {
    const friends = await this.followRepo
      .createQueryBuilder('follow')
      .leftJoinAndSelect('follow.follow', 'followee')
      .where('follow.followerId = :userId', { userId })
      .getMany();

    return friends.map((friend) => {
      return { nickname: friend.follow.nickname };
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    const ret = await this.userRepo.findOne({ where: { email } });
    return ret;
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepo.findOneOrFail({ where: { id } });

    return user;
  }

  // async getUserBySecondAuthCode(secondAuthCode: number): Promise<User> {
  //   const ret = await this.userRepo.findOne({ where: { secondAuthCode } });
  //   return ret;
  // }

  async createUser(emailDto: EmailDto): Promise<User> {
    const user = new User();
    user.email = emailDto.email;

    return await this.userRepo.save(user);
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<UserProfileDto> {
    const user = await this.userRepo.findOne({
      where: { id: updateUserDto.userId },
    });

    if (!user) {
      throw new BadRequestException('유저를 찾을 수 없습니다.');
    }

    user.nickname = updateUserDto.nickname || user.nickname;
    user.avatar = updateUserDto.avatar || user.avatar;
    const updatedUser = await this.userRepo.save(user);

    return updatedUser.toUserProfileDto();
  }

  async isDuplicateNickname(nickname: string): Promise<boolean> {
    const found = await this.userRepo.findOne({ where: { nickname } });
    if (found) {
      return true;
    }
    return false;
  }

  async toggleSecondAuth(email: string): Promise<void> {
    const user = await this.getUserByEmail(email);

    if (user === undefined) {
      throw new BadRequestException('존재하지 않는 유저입니다.');
    }

    if (!user.isSecondAuthOn) {
      console.log('이메일 2차 인증 설정');
      user.isSecondAuthOn = true;
    } else {
      console.log('이메일 2차 인증 설정 해제');
      user.isSecondAuthOn = false;
    }
    user.save();
  }

  async addFriend(myId: number, targetId: number): Promise<void> {
    const [followerUser, followUser] = await Promise.all([
      this.getUserById(myId),
      this.getUserById(targetId),
    ]);

    const follow = new Follow();
    follow.follower = followerUser;
    follow.follow = followUser;

    await this.followRepo.save(follow);
  }

  async getGameRecords(userId: number): Promise<GameRecordDto[]> {
    const gameRecords = await this.gameRecordRepo
      .createQueryBuilder('gameRecord')
      .leftJoinAndSelect('gameRecord.playerOne', 'playerOne')
      .leftJoinAndSelect('gameRecord.playerTwo', 'playerTwo')
      .where('gameRecord.playerOneId = :userId', { userId })
      .orWhere('gameRecord.playerTwoId = :userId', { userId })
      .getMany();

    return gameRecords.map((gameRecord) => gameRecord.toGameRecordDto(userId));
  }
}
