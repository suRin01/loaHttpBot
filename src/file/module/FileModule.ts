
import { Global, Module } from '@nestjs/common';
import { FileService } from '../service/FileService';
import { FileController } from '../controller/FileController';

@Global()
@Module({
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService]
})
export class FileeModule {}