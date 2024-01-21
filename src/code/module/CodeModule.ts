
import { Global, Module } from '@nestjs/common';
import { CodeService } from '../service/CodeService';
import { CodeController } from '../controller/CodeController';

@Global()
@Module({
  controllers: [CodeController],
  providers: [CodeService],
  exports: [CodeService]
})
export class CodeModule {}