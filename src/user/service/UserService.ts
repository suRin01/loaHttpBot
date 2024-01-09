
import { Injectable } from '@nestjs/common';
import { User } from '../model/User';
import { tsbatis } from 'src/utility/Tsbatis';
import { ConfigService } from '@nestjs/config';
import { pbkdf2Sync } from 'crypto';
import { decrypt, encrypt } from 'src/utility/Aes256Util';

@Injectable()
export class UserService {
    constructor(
        private configService: ConfigService,
    ){}

    async findAll(): Promise<User[]>{
        const data = await tsbatis.select<User>("user", "selectAllUser");
        data.forEach(user=>{
            if(user.mobile_phone !== undefined && user.mobile_phone !== null){
                user.mobile_phone = decrypt(user.mobile_phone, this.configService.get("DB_ENC_KEY"));
            }
        })
        return data;
    }

    async findSome(userData:User): Promise<User[]>{
        const data = await tsbatis.select<User>("user", "selectUserByUsername", userData);
        data.forEach(user=>{
            if(user.mobile_phone !== undefined && user.mobile_phone !== null){
                user.mobile_phone = decrypt(user.mobile_phone, this.configService.get("DB_ENC_KEY"));
            }
        })
        
        return data;
    }

    async insertUser(userData: User): Promise<Number>{
        const salt: string = this.configService.get("PBKDF2_SALT");

        const encryptedUserData:User = {
			mobile_phone: encrypt(userData.mobile_phone, this.configService.get("DB_ENC_KEY")),
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