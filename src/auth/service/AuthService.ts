import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MemberService } from 'src/member/service/MemberService';
import { JwtService } from '@nestjs/jwt';
import { jwtToken } from '../model/jwtToken'; 
import { ConfigService } from '@nestjs/config';
import { pbkdf2Sync } from 'crypto';
import { Member } from 'src/member/model/Member';


@Injectable()
export class AuthService {
    constructor(
        private configService: ConfigService,
        private userService: MemberService,
        private jwtService: JwtService
    ) { }

    async signIn(id: string, pass: string): Promise<jwtToken> {
        const rawUser = await this.userService.findSome({id} as Member);
        //is user exist
        if(rawUser.length === 0){  
            console.log("member not found")
            throw new UnauthorizedException();
        }
        const user = rawUser[0]
        const salt: string = this.configService.get("PBKDF2_SALT");
        if (pbkdf2Sync(pass, salt, 10000, 64, "sha512").toString("hex") !== user.password) {    
            throw new UnauthorizedException();
        }

        const payload = { 
            idx: user.userIdx,
            username: user.id,
            sub: user.name
        };
        const access_token = await this.jwtService.signAsync(payload);
        const refresh_token = await this.jwtService.signAsync({...payload, type:"rtoken"}, {
            expiresIn: "1d"
        })

        return {
            payload,
            access_token,
            refresh_token
        };
    }

    async refreshAccessToken(username: string): Promise<string>{
        const user = await this.userService.findSome({id: username} as Member)[0];
        const payload = {
            idx: user.userIdx,
            username: user.id,
            sub: user.name
        };
        const access_token = await this.jwtService.signAsync(payload);

        return access_token;
    }

}