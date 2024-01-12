
import { Module } from '@nestjs/common';
import { CharacterController } from '../controller/CharacterController';
import { CharacterService } from '../service/CharacterService';

@Module({
  controllers: [CharacterController],
  providers: [CharacterService],
})
export class CharacterModule {}