import { scryptSync, randomBytes, createCipheriv, createDecipheriv } from "crypto";

export function encryptData(plainText:string):string{
    const algorithm = 'aes-256-cbc';
    const key = scryptSync('wolfootjaIsSpecial','specialSalt', 32);
    const iv = randomBytes(16);

    const cipher = createCipheriv(algorithm, key, iv);
    let encryptedText = cipher.update(plainText, 'utf8', 'base64');
    encryptedText += cipher.final('base64');

    return encryptedText;
}



export function decryptData(encryptedText:string):string{
    const algorithm = 'aes-256-cbc';
    const key = scryptSync('wolfootjaIsSpecial','specialSalt', 32);
    const iv = randomBytes(16);

    const deciper = createDecipheriv(algorithm, key, iv);
    let plainText = deciper.update(encryptedText, 'base64', 'utf8');
    plainText += deciper.final('utf8');

    return plainText;
}