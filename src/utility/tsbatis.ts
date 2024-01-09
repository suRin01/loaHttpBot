import { pool } from "./DbPool";
import * as MybatisMapper from "mybatis-mapper";
import * as fs from 'node:fs/promises';
import { entity2Dto } from "./Entity2Dto";
import { SqlError } from "mariadb";


class Tsbatis{
    private myBatisMapperActiveFlag = false;
    constructor(){
        if(this.myBatisMapperActiveFlag === false){
            this.init();
        }
    }

    private async init(){
        const fileList = await fs.readdir(`${process.env["INIT_CWD"]}/mapper`);
        const xmlFileList = fileList.map((filename)=>{
            if(filename.endsWith(".xml")){
                console.log(`mapper ${filename} added.`)
                return `${process.env["INIT_CWD"]}/mapper/${filename}`
            }
        }).filter(fileName=>{if(fileName !== undefined) return fileName});
        MybatisMapper.createMapper(xmlFileList);
        this.myBatisMapperActiveFlag = true;

    }

    public async select<T>(namespace: string, id:string, param:Record<string, Object>|Record<string, Object>[]|any = {}):Promise<T[]>{
        const connection = await pool.getConnection();
        const query = MybatisMapper.getStatement(namespace, id, param);
        console.log(query)
        const data = await connection.execute(query);

        await connection.release();

        return entity2Dto<T>(data);
    }


    public async insert<T>(namespace: string, id:string, param:T):Promise<Number>{
        const connection = await pool.getConnection();
        const query = MybatisMapper.getStatement(namespace, id, param as {});
        let result;
        try {
            result = await connection.execute(query);
        } catch (error) {
            if(error instanceof SqlError){
                console.log("sql error!")
            }else{
            }
            
            return 0;
        }finally{
            await connection.release();
        }

        if(isNaN(result)){
            console.log(result);

            return 0;
        }
        return 1;
    }
}


export const tsbatis = new Tsbatis();