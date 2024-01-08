
import { Module } from '@nestjs/common';
import { CodeService } from '../service/CodeService';
import { CodeController } from '../controller/CodeController';

@Module({
  controllers: [CodeController],
  providers: [CodeService],
})
export class CodeModule {}