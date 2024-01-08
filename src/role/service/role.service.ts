import { Injectable } from "@nestjs/common";
import { role, role_relation} from "../model/RoleModel"
import { tsbatis } from "src/utility/tsbatis";

@Injectable()
export class RoleService {
	constructor(
	){}
	
	async findAll(userIdx: number): Promise<role_relation[]> {
		const data = tsbatis.select<role_relation>("role", "selectAllRoleRelation", {
			userIdx
		});
        return data;
	}
    async findRoleAll(userIdx: number): Promise<role[]> {
		const data = tsbatis.select<role>("role", "selectAllRole", {
			userIdx
		});
        return data;
	}

    
}