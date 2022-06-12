import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDataDto } from './dto/users.dto';
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

  async createUser(userData: UserDataDto): Promise<User> {
    const user = new User();
    user.username = userData.username;
    user.avatar = userData.avatar;
    user.email = userData.email;
    user.secondAuth = userData.secondAuth; // todo: 어떻게 설정할 것인가?

    return await this.userRepo.save(user);
  }
}
