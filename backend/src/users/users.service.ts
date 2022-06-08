import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async getUser(id: string) {
    const ret = await this.userRepo.findOne({ where: { id: +id } });
    return ret;
  }

  async createUser(name: string) {
    const user = new User();
    user.name = name;
    await this.userRepo.save(user);
  }
}
