import { Module } from '@nestjs/common';
import { AuthService } from '../service/AuthService';
import { AuthController } from '../controllerr/AuthController';
import { MemberModule } from 'src/member/module/MemberModule';
import { RoleModule } from 'src/role/module/role.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[RoleModule, MemberModule, JwtModule.register({
      secret: process.env.JWT_TOKEN,
      signOptions: { expiresIn: '3600s' },
    }),],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}