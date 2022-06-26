import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameRecordDto } from './dto/gameRecord.dto';
import {
  UpdateUserDto,
  EmailDto,
  SimpleUserDto,
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

  async getUsers(): Promise<SimpleUserDto[]> {
    const users = await this.userRepo.find();

    return users.map((user) => {
      return { id: user.id, nickname: user.nickname };
    });
  }

  async getFriends(userId: number): Promise<SimpleUserDto[]> {
    const friends = await this.followRepo
      .createQueryBuilder('follow')
      .leftJoinAndSelect('follow.follow', 'followee')
      .where('follow.followerId = :userId', { userId })
      .getMany();

    return friends.map((friend) => {
      return { id: friend.follow.id, nickname: friend.follow.nickname };
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

  async getUserProfile(id: number): Promise<UserProfileDto> {
    const user = await this.getUserById(id);
    let userProfile: UserProfileDto;

    userProfile.id = user.id;
    userProfile.nickname = user.nickname;
    userProfile.avatar = user.avatar;
    userProfile.email = user.email;
    userProfile.ladderWinCount = user.ladderWinCount;
    userProfile.ladderLoseCount = user.ladderLoseCount;
    userProfile.winCount = user.winCount;
    userProfile.loseCount = user.loseCount;

    return userProfile;
  }

  async findByNicknameAndUpdateImg(
    id: number,
    fileName: string,
  ): Promise<string> {
    const user = await this.userRepo.findOne({ where: { id } });
    user.avatar = `http://${process.env.SERVER_ADDRESS}/users/${fileName}`;
    await user.save();

    return user.avatar;
  }

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
    console.log(found);
    if (found) {
      return true;
    }
    return false;
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

  async updateNickname(
    userId: number,
    nicknameForUpdate: string,
  ): Promise<UserProfileDto> {
    if (await this.isDuplicateNickname(nicknameForUpdate)) {
      throw new BadRequestException('이미 존재하는 닉네임 입니다.');
    }

    const user = await this.getUserById(userId);

    user.nickname = nicknameForUpdate;
    const updatedUser = await this.userRepo.save(user);

    return updatedUser.toUserProfileDto();
  }
}
