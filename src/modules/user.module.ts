/*Nest & Dependencies*/
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/*Self*/
import { User } from 'src/typeorm';
import { AuthModule } from './auth.module';
import { UserService } from 'src/services/user.service';
import { UserController } from 'src/controllers/user.controller';


@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([User])
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}