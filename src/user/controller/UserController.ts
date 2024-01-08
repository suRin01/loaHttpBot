import { Controller, Get, Post, Param, Query, Body, Render, UseGuards } from '@nestjs/common';
import { User } from '../model/User';
import { UserService } from '../service/UserService';
import { searchQuery2Obj } from 'src/utility/UrlUtil';
import { AccessJwtAuthGuard } from 'src/auth/service/auth.guard';

@Controller('user')
export class UserContoller {
    constructor(
        private userService: UserService
    ){}


    @UseGuards(AccessJwtAuthGuard)
    @Get("")
    async lookupUser(@Query() urlQuery): Promise<User[]>{
        const userList = await this.userService.findSome(searchQuery2Obj<User>(urlQuery));

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


    }

}
