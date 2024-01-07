
import { Module } from '@nestjs/common';
import { UserContoller } from '../controlleer/UserController';
import { UserService } from '../service/UserService';

@Module({
  controllers: [UserContoller],
  providers: [UserService],
})
export class UserModule {}