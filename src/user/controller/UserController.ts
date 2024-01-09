import { Controller, Get, Post, Param, Query, Body, Render, UseGuards } from '@nestjs/common';
import { User } from '../model/User';
import { UserService } from '../service/UserService';
import { searchQuery2Obj } from 'src/utility/RequestUtil';
import { AccessJwtAuthGuard } from 'src/auth/service/auth.guard';
import { GuildGuard } from 'src/decorator/role.decorator';

@Controller('user')
export class UserContoller {
    constructor(
        private userService: UserService
    ){}


    @UseGuards(GuildGuard)
    @UseGuards(AccessJwtAuthGuard)
    @Get("")
    async lookupUser(@Query() urlQuery): Promise<User[]>{
        const userList = await this.userService.findSome(urlQuery);

        return userList;
    }
  
    @Get(":userIndex")
    async lookupExactOne(@Param("userIndex") userIndex: Number): Promise<User[]> {
        const parsedUserIndex = Number(userIndex);
        if(isNaN(parsedUserIndex)){
            console.log("User Index is not a number");
            throw new Error("Invalid User Index.");
            
        }

        const userList = await this.userService.findAll();

        return userList;
    }


    @Post("")
    async inserNewUser(@Body() newUser: User){
        console.log(newUser);
        const data = this.userService.insertUser(newUser)

        return "done"

    }

}
