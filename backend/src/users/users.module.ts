import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from 'src/emails/email.module';
import { UsersController } from './users.controller';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';
import { Follow } from './entities/follow.entity';
import { BlockedUser } from './entities/blockedUser.entity';

@Module({
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([User, Follow, BlockedUser]), EmailModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
