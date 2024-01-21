import { rejects } from "assert"
import { createWriteStream, existsSync } from "fs";
import { mkdir } from "fs/promises";
import { get } from "https";
import { join } from "path";

export const cacheItemImage = async (imgUrl: string):Promise<{ filePath: string; fileName: string; }> => {
    return new Promise(async (resolve, rejects) => {
        const LOST_ARK_IMG_CDN_URL = "https://cdn-lostark.game.onstove.com"
        const filePathArr = imgUrl.replace(LOST_ARK_IMG_CDN_URL, "").split("/");


        const filePath = join(process.cwd(), "static/img", filePathArr.join("/"))
        const fileName = filePathArr[filePathArr.length-1];
        await mkdir(join(process.cwd(), "static/img",filePathArr.slice(0, -1).join("/")), {
            recursive: true
        })
        

        const file = createWriteStream(filePath);
        get(imgUrl, response => {
            response.pipe(file)
        })
        file.on("finish", () => {
            file.close();
            resolve({
                filePath,
                fileName
            })
        }).on("error", (error) => {
            console.log(error) 
            rejects(error)
        })
    })
}