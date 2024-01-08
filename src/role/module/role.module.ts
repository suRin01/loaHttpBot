import { Module } from "@nestjs/common";
import { RoleService } from "../service/role.service";
@Module({
    imports:[],
	controllers: [],
	providers: [RoleService],
	exports: [RoleService]

})
export class RoleModule {}
