import { ExecutionContext, SetMetadata, UseGuards, applyDecorators } from "@nestjs/common";
import { AccessJwtAuthGuard } from "src/auth/service/auth.guard";

export function hasRole(...roles:string[]) {
    console.log("has role annotaion");
    console.log(roles);
    return applyDecorators(
        SetMetadata('roles', roles),
        UseGuards(AccessJwtAuthGuard)

    )
}


export function isGuildMember(guildname: string){
    console.log("has role annotaion");
    console.log(guildname);
}