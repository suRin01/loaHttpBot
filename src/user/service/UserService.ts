
import { Injectable } from '@nestjs/common';
import { User } from '../model/User';
import { entity2Dto } from 'src/utility/Entity2Dto';
import { tsbatis } from 'src/utility/tsbatis';

@Injectable()
export class UserService {

    async findAll(): Promise<User[]>{
        const data = tsbatis.select<User>("user", "selectAllUser");


        return data;
    }

    async findSome(userData:User): Promise<User[]>{
        const data = tsbatis.select<User>("user", "selectSomeUser", userData);


        return data;
    }

    async inseruser(userData: User): Promise<Number>{



        return 1;
    }



}