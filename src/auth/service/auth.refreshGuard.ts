import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { extractTokenFromHeader } from 'src/utility/RequestUtil';

@Injectable()
export class RefreshJwtAuthGuard implements CanActivate {
    constructor(
        private configService: ConfigService,
        private jwtService: JwtService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token: string = extractTokenFromHeader(request);
        const secret: string = this.configService.get("JWT_TOKEN");

        if (!token) {
            console.log("token not found");
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret
                }
            );

            if(payload.type === undefined){
                console.log("unacceptable refresh token");
                throw new UnauthorizedException();
            }
            request['user'] = payload;
        } catch {
            console.log("authentication failed");
            throw new UnauthorizedException();
        }

        return true;
    }
}