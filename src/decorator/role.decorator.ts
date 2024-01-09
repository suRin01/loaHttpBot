import { CanActivate, ExecutionContext, Injectable, SetMetadata, UnauthorizedException, UseGuards, applyDecorators } from "@nestjs/common";
import { AccessJwtAuthGuard } from "src/auth/service/auth.guard";
import { UserService } from "src/user/service/UserService";
import { extractTokenFromHeader } from "src/utility/RequestUtil";

export function hasRole(...roles:string[]) {
    console.log("has role annotaion");
    console.log(roles);
    return applyDecorators(
        SetMetadata('roles', roles),
        UseGuards(AccessJwtAuthGuard)

    )
}


@Injectable()
export class RoleGuard implements CanActivate{
    constructor(
        private userService: UserService
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
        private userService: UserService
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