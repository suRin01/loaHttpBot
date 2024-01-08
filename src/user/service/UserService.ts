
import { Injectable } from '@nestjs/common';
import { User } from '../model/User';
import { tsbatis } from 'src/utility/tsbatis';
import { ConfigService } from '@nestjs/config';
import { pbkdf2Sync } from 'crypto';
import { decryptData, encryptData } from 'src/utility/Aes256Util';

@Injectable()
export class UserService {
    constructor(
        private configService: ConfigService,
    ){}

    async findAll(): Promise<User[]>{
        const data = await tsbatis.select<User>("user", "selectAllUser");
        data.forEach(user=>{
            if(user.mobile_phone !== undefined && user.mobile_phone !== null){
                //user.mobile_phone = decryptData(user.mobile_phone);
            }
        })
        return data;
    }

    async findSome(userData:User): Promise<User[]>{
        const data = await tsbatis.select<User>("user", "selectSomeUser", userData);
        data.forEach(user=>{
            if(user.mobile_phone !== undefined && user.mobile_phone !== null){
                //user.mobile_phone = decryptData(user.mobile_phone);
            }
        })
        return data;
    }

    async findByUsername(username:string): Promise<User>{
        const data = await tsbatis.select<User>("user", "selectUserByUsername", {username});
        if(data.length !== 1){
            throw Error("multi row selected.");
        }
        let selectedData = data[0];
        if(selectedData.mobile_phone !== undefined && selectedData.mobile_phone !== null){
            //selectedData.mobile_phone = decryptData(selectedData.mobile_phone);
        }
        return selectedData;
    }

    async insertUser(userData: User): Promise<Number>{
        const salt: string = this.configService.get("PBKDF2_SALT");

        const encryptedUserData:User = {
			mobile_phone: encryptData(userData.mobile_phone),
			name: userData.name,
			password: pbkdf2Sync(userData.password, salt, 10000, 64, "sha512").toString("hex"),
			profile_img: userData.profile_img,
			sex_dstn_code: userData.sex_dstn_code,
			user_idx: userData.user_idx,
			user_name: userData.user_name,
		}

        tsbatis.insert("user", "insertUser", encryptedUserData);
        return 1;
    }



}