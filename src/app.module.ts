import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/module/UserModule';
import { LoggerMiddleware } from './utility/LoggerMiddleware';
import { UserContoller } from './user/controlleer/UserController';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware)
    .forRoutes(UserContoller);
  }
  
}
