import 'dotenv/config'
import { tsbatis } from './Tsbatis';
import { CommonCode, CommonCodeWithCode } from 'src/code/model/Code';

class CodeCache {
    private CodeList:CommonCodeWithCode[] = null;
    constructor() {
        this.getCode();
    }

    public async getCode(): Promise<CommonCodeWithCode[]>{
        if(this.CodeList === null){
            this.CodeList = await tsbatis.select<CommonCodeWithCode>("code", "selectCodepDetails");

            console.log(`${this.CodeList.length} codes added.`)
        }
        return this.CodeList;
    }

}

export const codeCache = new CodeCache();