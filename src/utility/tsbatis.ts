import { pool } from "./DbPool";
import * as MybatisMapper from "mybatis-mapper";
import * as fs from 'node:fs/promises';
import { entity2Dto } from "./Entity2Dto";
import { Session } from "node:inspector";


class Tsbatis{
    private myBatisMapperActiveFlag = false;
    constructor(){
        if(this.myBatisMapperActiveFlag === false){
            this.init();
        }
    }

    private async init(){
        const fileList = await fs.readdir(`${process.env["INIT_CWD"]}/mapper`, {recursive: true});
        const xmlFileList = fileList.map((filename)=>{
            if(filename.endsWith(".xml")){
                return `${process.env["INIT_CWD"]}/mapper/${filename}`
            }
        }).filter(fileName=>{if(fileName !== undefined) return fileName})
        console.log("mapper file list");
        console.log(xmlFileList);
        MybatisMapper.createMapper(xmlFileList);
        this.myBatisMapperActiveFlag = true;

    }

    public async select<T>(namespace: string, id:string, param:Record<string, Object>|Record<string, Object>[]|any = {}):Promise<T[]>{
        const connection = await pool.getConnection();
        const query = MybatisMapper.getStatement(namespace, id, param);
        const data = await connection.execute(query);

        await connection.release();

        return entity2Dto<T>(data);
    }


    public async insert<T>(namespace: string, id:string, param:T):Promise<Number>{
        const connection = await pool.getConnection();
        const query = MybatisMapper.getStatement(namespace, id, param as {});
        const data = await connection.execute(query);

        await connection.release();

        return 1;
    }
}


export const tsbatis = new Tsbatis();