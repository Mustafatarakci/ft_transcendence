import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeORMConfig } from './configs/typeorm.config';
import { UserModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(TypeORMConfig), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
