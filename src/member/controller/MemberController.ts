import { Controller, Get, Post, Param, Query, Body, Render, UseGuards } from '@nestjs/common';
import { Member } from '../model/Member';
import { MemberService } from '../service/MemberService';
import { AccessJwtAuthGuard } from 'src/auth/service/auth.guard';
import { GuildGuard } from 'src/decorator/role.decorator';

@Controller('member')
export class MemberContoller {
    constructor(
        private memberService: MemberService
    ){}


    @UseGuards(GuildGuard)
    @UseGuards(AccessJwtAuthGuard)
    @Get("")
    async lookupUser(@Query() urlQuery): Promise<Member[]>{
        const userList = await this.memberService.findSome(urlQuery);

        return userList;
    }
  
    @Get(":memberIndex")
    async lookupExactOne(@Param("memberIndex") memberIndex: Number): Promise<Member[]> {
        const parsedMemberIndex = Number(memberIndex);
        if(isNaN(parsedMemberIndex)){
            console.log("member Index is not a number");
            throw new Error("Invalid User Index.");
            
        }

        const userList = await this.memberService.findAll();

        return userList;
    }


    @Post("")
    async inserNewUser(@Body() newUser: Member){
        console.log(newUser);
        const data = this.memberService.insertUser(newUser)

        return "done"

    }

}
