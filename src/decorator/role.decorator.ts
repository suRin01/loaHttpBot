import { CanActivate, ExecutionContext, Injectable, SetMetadata, UnauthorizedException, UseGuards, applyDecorators } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { AccessJwtAuthGuard } from "src/auth/service/auth.guard";
import { MemberService } from "src/member/service/MemberService";
import { extractTokenFromHeader } from "src/utility/RequestUtil";


@Injectable()
export class RoleGuard implements CanActivate{
    constructor(
        private userService: MemberService
    ){}

    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token: string = extractTokenFromHeader(request);

        console.log("checking guild member.")

        if(!token){
            console.log("token not found");
            throw new UnauthorizedException();
        }



        return true;

    }
}


@Injectable()
export class GuildGuard implements CanActivate{
    constructor(
        private userService: MemberService,
        private configService: ConfigService,
        private jwtWService: JwtService
    ){}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token: string = extractTokenFromHeader(request);
        
        console.log("checking guild member.")
        if(!token){
            console.log("token not found");
            throw new UnauthorizedException();
        }

        const secret = this.configService.get("JWT_TOKEN")
        try{
            const payload = await this.jwtWService.verifyAsync(token, {
                secret
            })
            console.log(payload)
            if(payload.type === undefined){
                console.log("unacceptable refresh token");
                throw new UnauthorizedException();

            }


            //lookup user guild list

            //if guild list is not contained in allow guild list, throw unauthorizedException.


            //else, pass authorization


        }catch(e){
                console.log("authentication failed");
                throw new UnauthorizedException();
            }






        return true;

    }
}