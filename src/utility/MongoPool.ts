import 'dotenv/config'
import { MongoClient } from 'mongodb';



class MongoConnection {
    private pool:MongoClient = null;
    constructor(
        ) {}

    public async getConnection(): Promise<MongoClient>{
        
        if(this.pool === null){
            this.pool = new MongoClient(process.env["mongoDb"], {monitorCommands: true});
            return this.pool;
            
        }

        return this.pool;
    }

}

export const mongoPool = new MongoConnection();


export const mongoDbStruct = {
    dbName: "bot_api",
    collections:{
        character: {
            name: "character",
            describe: "character info"
        },
        user:{
            name: "user",
            describe: "user info"
        }
    }

    
}