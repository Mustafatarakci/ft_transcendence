import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/users.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async getUserById(id: string): Promise<User> {
    const ret = await this.userRepo.findOne({ where: { id: +id } });
    return ret;
  }

  async getUserByEmail(email: string): Promise<User> {
    const ret = await this.userRepo.findOne({ where: { email } });
    return ret;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.nickname = createUserDto.nickname;
    user.avatar = createUserDto.avatar;
    user.email = createUserDto.email;
    user.secondAuth = createUserDto.secondAuth; // todo: 어떻게 설정할 것인가?

    return await this.userRepo.save(user);
  }

  async isDuplicateNickname(nickname: string): Promise<boolean> {
    const found = this.userRepo.findOne({ where: { nickname } });
    if (found) {
      return true;
    }
    return false;
  }
}
