
import { Module } from '@nestjs/common';
import { MemberContoller } from '../controller/MemberController';
import { MemberService } from '../service/MemberService';
import { JwtModule } from '@nestjs/jwt';
import { RoleModule } from 'src/role/module/role.module';

@Module({
  imports: [JwtModule, RoleModule],
  controllers: [MemberContoller],
  providers: [MemberService],
  exports: [MemberService]
})
export class MemberModule {}