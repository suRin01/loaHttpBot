import { scryptSync, randomBytes, createCipheriv, createDecipheriv, pbkdf2Sync } from "crypto";

/**
 * Encrypts text by given key
 * @param String text to encrypt
 * @param Buffer masterkey
 * @returns String encrypted text, base64 encoded
 */
export function encrypt(text:string, masterKey:string) {
    try {
        const salt = randomBytes(32);
        const key = scryptSync(masterKey, salt, 32);
        const iv = randomBytes(16);
        const cipher = createCipheriv('aes-256-gcm', key, iv);
        const encryptedData = Buffer.concat([salt, iv, cipher.update(text), cipher.final()]);
        
        return encryptedData.toString("hex");

    } catch (e) {
    }

    // error
    return null;
}

/**
 * Decrypts text by given key
 * @param String base64 encoded input data
 * @param Buffer masterkey
 * @returns String decrypted (original) text
*/
export function decrypt(encryptedData:string, masterKey:string) {
    try {
        const bufferData = Buffer.from(encryptedData, "hex");
        const salt = bufferData.subarray(0, 32);
        const key = scryptSync(masterKey, salt, 32);
        const iv = bufferData.subarray(32, 48);
        const encryptedData2 = bufferData.subarray(48);
        const decipher = createDecipheriv('aes-256-gcm', key, iv);
        const decryptedData = decipher.update(encryptedData2);
        return decryptedData.toString("utf-8");

    } catch (e) {
    }

    // error
    return null;
}