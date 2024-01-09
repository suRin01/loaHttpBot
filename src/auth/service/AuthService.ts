import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/service/UserService';
import { JwtService } from '@nestjs/jwt';
import { jwtToken } from '../model/jwtToken'; 
import { ConfigService } from '@nestjs/config';
import { pbkdf2Sync } from 'crypto';
import { User } from 'src/user/model/User';


@Injectable()
export class AuthService {
    constructor(
        private configService: ConfigService,
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async signIn(username: string, pass: string): Promise<jwtToken> {
        const user = await this.userService.findSome({user_name: username} as User)[0];
        const salt: string = this.configService.get("PBKDF2_SALT");

        if (pbkdf2Sync(pass, salt, 10000, 64, "sha512").toString("hex") !== user.password) {    
            throw new UnauthorizedException();
        }

        const payload = {
            idx: user.user_idx,
            username: user.user_name,
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
        const user = await this.userService.findSome({user_name: username} as User)[0];
        const payload = {
            idx: user.user_idx,
            username: user.user_name,
            sub: user.name
        };
        const access_token = await this.jwtService.signAsync(payload);

        return access_token;
    }

}