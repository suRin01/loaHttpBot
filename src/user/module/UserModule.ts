
import { Module } from '@nestjs/common';
import { UserContoller } from '../controller/UserController';
import { UserService } from '../service/UserService';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RoleModule } from 'src/role/module/role.module';

@Module({
  imports: [JwtModule, RoleModule, ConfigModule.forRoot()],
  controllers: [UserContoller],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}