import { createCipheriv, createDecipheriv, pbkdf2Sync, randomBytes, scryptSync } from "crypto";
import { decrypt, encrypt } from "../src/utility/Aes256Util"
import axios from "axios";
import { response } from "express";



(()=>{
    

})()


function wait(sec:number){
    let start = Date.now(), now = start;
    while(now - start < sec*1000){
        now = Date.now();
    }
}