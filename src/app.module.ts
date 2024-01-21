import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './member/module/MemberModule';
import { LoggerMiddleware } from './utility/LoggerMiddleware';
import { MemberContoller } from './member/controller/MemberController';
import { CodeModule } from './code/module/CodeModule';
import { AuthModule } from './auth/module/AuthModule';
import { CharacterModule } from './character/module/CharacterModule';
import { ConfigModule } from '@nestjs/config';
import { FileeModule } from './file/module/FileModule';

@Module({
  imports: [MemberModule, CodeModule, AuthModule, CharacterModule, ConfigModule.forRoot({
    isGlobal: true,
  }), CodeModule, FileeModule],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware)
    .forRoutes(MemberContoller);
  }
  
}
