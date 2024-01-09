import { createCipheriv, createDecipheriv, pbkdf2Sync, randomBytes, scryptSync } from "crypto";
import { decrypt, encrypt } from "../src/utility/Aes256Util"



(()=>{
    const masterKey = "test password is here do not expose";
    const data = "테스트 케이스입니다 특문도 잘 되나요? 이상하네요 §";

    const encData = encrypt(data, masterKey);
    console.log(encData);
    const real =  decrypt(encData, masterKey);

    console.log(real);

})()