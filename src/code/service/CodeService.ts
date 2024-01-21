
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommonCode, CommonCodeWithCode } from '../model/Code';
import { tsbatis } from 'src/utility/Tsbatis';

@Injectable()
export class CodeService {
    constructor(
    ){}


    async findCommonCodeWithConcatedCode(searchParam:CommonCode): Promise<CommonCodeWithCode[]>{
        const data = await tsbatis.select<CommonCodeWithCode>("code", "selectCodepDetails", searchParam);
        return data;
    }

}