
import { Injectable } from '@nestjs/common';
import { Member } from '../model/Member';
import { tsbatis } from 'src/utility/Tsbatis';
import { ConfigService } from '@nestjs/config';
import { pbkdf2Sync } from 'crypto';
import { decrypt, encrypt } from 'src/utility/Aes256Util';

@Injectable()
export class MemberService {
    constructor(
        private configService: ConfigService,
    ){}

    async findAll(): Promise<Member[]>{
        const data = await tsbatis.select<Member>("member", "selectAllUser");
        data.forEach(user=>{
            if(user.mobilePhone !== undefined && user.mobilePhone !== null){
                user.mobilePhone = decrypt(user.mobilePhone, this.configService.get("DB_ENC_KEY"));
            }
        })
        return data;
    }

    async findSome(memberData:Member): Promise<Member[]>{
        const data = await tsbatis.select<Member>("member", "selectSomeUser", memberData);
        data.forEach(member=>{
            if(member.mobilePhone !== undefined && member.mobilePhone !== null){
                member.mobilePhone = decrypt(member.mobilePhone, this.configService.get("DB_ENC_KEY"));
            }
        })
        
        return data;
    }

    async insertUser(memberData: Member): Promise<Number>{
        const salt: string = this.configService.get("PBKDF2_SALT");

        const encryptedUserData:Member = {
			mobilePhone: encrypt(memberData.mobilePhone, this.configService.get("DB_ENC_KEY")),
			name: memberData.name,
			password: pbkdf2Sync(memberData.password, salt, 10000, 64, "sha512").toString("hex"),
			profileImg: memberData.profileImg,
			sexDstnCode: memberData.sexDstnCode,
			userIdx: memberData.userIdx,
			id: memberData.id,
		}

        tsbatis.insert("member", "insertUser", encryptedUserData);
        return 1;
    }



}