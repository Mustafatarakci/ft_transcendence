import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/users.dto';
import { BlockedUser } from './entities/blockedUser.entity';
import { Follow } from './entities/follow.entity';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Follow) private readonly followRepo: Repository<Follow>,
    @InjectRepository(BlockedUser)
    private readonly blockedUserRepo: Repository<BlockedUser>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async getUserByEmail(email: string): Promise<User> {
    const ret = await this.userRepo.findOne({ where: { email } });
    return ret;
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepo.findOneOrFail({ where: { id } });

    return user;
  }

  async findByNicknameAndUpdateImg(id: number, fileName: string) : Promise<string> {
    const user = await this.userRepo.findOne({ where: { id }});
    user.avatar = `http://localhost:5500/users/${fileName}`;
    await user.save();
  
    return user.avatar;
  }

  // async getUserBySecondAuthCode(secondAuthCode: number): Promise<User> {
  //   const ret = await this.userRepo.findOne({ where: { secondAuthCode } });
  //   return ret;
  // }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    if (await this.isDuplicateNickname(createUserDto.nickname)) {
      throw new BadRequestException('이미 존재하는 닉네임 입니다.');
    }

    const user = new User();
    user.nickname = createUserDto.nickname;
    user.avatar = createUserDto.avatar;
    user.email = createUserDto.email;

    return await this.userRepo.save(user);
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
}
