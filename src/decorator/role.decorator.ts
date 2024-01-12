import { CanActivate, ExecutionContext, Injectable, SetMetadata, UnauthorizedException, UseGuards, applyDecorators } from "@nestjs/common";
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