import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'domodachiDB',
  // entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
