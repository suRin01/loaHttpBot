import { Controller, Get, Post, Body, Request, HttpCode, HttpStatus, UseGuards, Response, Redirect, RawBodyRequest, Req } from "@nestjs/common";
import { AuthService } from "../service/AuthService";
import { jwtToken } from "../model/jwtToken";
import { RefreshJwtAuthGuard } from "../service/auth.refreshGuard";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	/**
	 * 최초 refresh jwt와 access jwt 발급
	 * @param signInDto 
	 * @param res 
	 */
    @HttpCode(HttpStatus.OK)
	@Post("/login")
	async getUserAll(@Body() signInDto: Record<string, any>, @Response() res): Promise<void> {
		console.log(signInDto);
		const token:jwtToken= await this.authService.signIn(signInDto.id, signInDto.password)
		
		console.log(token);
		res.setHeader('Authorization', 'Bearer '+token.access_token);
		res.cookie('access_token',token.access_token,{
			httpOnly: true,
			sameSite: "lax",
			secure: true,
			maxAge: 1 * 60 * 60 * 1000 //1 hour
		});
		res.cookie('refresh_token',token.refresh_token,{
			httpOnly: true,
			sameSite: "lax",
			secure: true,
			maxAge: 24 * 60 * 60 * 1000 //24 hour
		});

		res.status(HttpStatus.OK).send();
	}

	/**
	 * get refresh jwt token and return new access token
	 * @param req 
	 * @param res 
	 */
	@Get("/refresh")
	@UseGuards(RefreshJwtAuthGuard)
	async refreshAccessToken(@Request() req, @Response() res){
		const token:string= await this.authService.refreshAccessToken(req.user.username);
		res.cookie('access_token',token,{
			httpOnly: true,
			sameSite: "lax",
			secure: true,
			maxAge: 1 * 60 * 60 * 1000 //1 hour
		});


		res.status(HttpStatus.OK).send();
	}

	/**
	 * remove tokens
	 * @param res 
	 * @returns 
	 */

	@Post("/logout")
	@Redirect("/")
	logout(@Response() res): void{
		res.cookie('access_token', '', {
			maxAge: 0
		})

		res.cookie('refresh_token', '', {
			maxAge: 0
		})
		return;
	}
}
