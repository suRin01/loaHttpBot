import * as mariadb from 'mariadb'
import 'dotenv/config'

class DbPool {
    private pool:mariadb.Pool = null;
    
    constructor() {
    }

    public async getConnection(): Promise<mariadb.PoolConnection>{
        
        if(this.pool === null){
            this.pool = await mariadb.createPool({
                host: process.env.DB_HOST, 
                port: Number(process.env.DB_PORT), 
                user: process.env.DB_ID, 
                password: process.env.DB_PW, 
                connectionLimit: 5
            })
        }
        return await pool.pool.getConnection();
    }

}

export const pool = new DbPool();