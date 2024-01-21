
import { Injectable } from '@nestjs/common';
import { tsbatis } from 'src/utility/Tsbatis';
import { ConfigService } from '@nestjs/config';
import { CharacterInfo } from '../../lostarkApi/model/loaApi';
import axios from 'axios';
import { loaApiUrls } from 'src/constant/urls';
import { Character, Armor, Elixir, Transcend } from '../model/Character';
import { CodeService } from 'src/code/service/CodeService';
import { CommonCode } from 'src/code/model/Code';
import { get } from 'https';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { cacheItemImage } from 'src/utility/FileUtil';
import { FileService } from 'src/file/service/FileService';
import { File } from 'src/file/model/File';

@Injectable()
export class CharacterService {
    constructor(
        private configService: ConfigService,
        private codeService: CodeService,
        private fileService: FileService
    ){}

    async getCharacterData(username: string): Promise<CharacterInfo>{
        return await axios
        .get<CharacterInfo>(`${loaApiUrls.baseUrl}${loaApiUrls.armory}${encodeURI(username)}`, {
            headers: { authorization: `bearer ${this.configService.get("loaApiKey")}` },
        })
        .then(async (result)=>{
            if(result.data === null){
                throw new Error("캐릭터 정보를 찾을 수 없습니다.");
            }

            const profile = result.data.ArmoryProfile;
            const characterBody:Character = {
                name: profile.CharacterName,
                isMainCharacter: false,
                class: profile.CharacterClassName,
                itemLevel: Number(profile.ItemMaxLevel.replaceAll(",", "")),
                server: profile.ServerName,
                expeditionLevel: profile.ExpeditionLevel,
                pvpGradeName: profile.PvpGradeName,
                townLevel: profile.TownLevel,
                townName: profile.TownName,
                toalSkillPoints: profile.TotalSkillPoint,
                usingSkillPoints: profile.UsingSkillPoint
            }

            const armorCodeList = await this.codeService.findCommonCodeWithConcatedCode({
                codeGroupIdx: 2
            } as CommonCode);

            result.data.ArmoryEquipment.forEach((equip)=>{
                
                const itemToolTip = JSON.parse(equip.Tooltip);
                Object.getOwnPropertyNames(itemToolTip).forEach(async (element)=>{
                    if(itemToolTip[element]["type"] === "ItemTitle"){
                        //cache item icon image at file service, return image index.
                        const fileUrl = itemToolTip[element]["value"]["slotData"]["iconPath"] as  string;
                        const cachedFileData = await cacheItemImage(fileUrl);
                        console.log(cachedFileData)
                        const cacheImageDbData = await this.fileService.insertFile({
                            filePath: cachedFileData.filePath,
                            fileName: cachedFileData.fileName,
                            fileExtension: "png",
                            inputId: "SYSTEM"
                        })
                        console.log(cacheImageDbData)
                        console.log(itemToolTip[element]["value"]["slotData"]["iconPath"] as string)
                        //save to equipBody
                        const itemLevelDataList = /<FONT SIZE='14'>아이템 (.{2} )(\d{1,4}).*/mg.exec(itemToolTip[element]["value"]["leftStr2"]);
                        const equipBody:Armor = {
                            name: equip.Name,
                            level:  itemLevelDataList !== null ? Number(itemLevelDataList[2]) : 0,
                            imgIdx: cacheImageDbData,
                            equipCode: armorCodeList.find(code=> code.codeValue === equip.Type)?.code
                        }

                        console.log(equipBody)
                    }
                    
                })
                


            })




            return result.data;
        })
        /*
        .catch((error)=>{
            console.error(error);
            throw new Error("로스트아크 서비스 점검중입니다.");
        })
        */
    }

    async getCharacterDbData(name:string):Promise<Character[]>{
        return await tsbatis.select<Character>("character", "selectLatestCharacter", {name});;
    }
    async getCharacterArmorData(characteridx:number):Promise<Armor[]>{
        return await tsbatis.select<Armor>("character", "selectArmorData", {characteridx});;
    }
    
    async getCharacterElixirData(armorIdx:number):Promise<Elixir[]>{
        return await tsbatis.select<Elixir>("character", "selectElixirData", {armorIdx});;
    }
    async getCharacterTranscendData(armorIdx:number):Promise<Transcend[]>{
        return await tsbatis.select<Transcend>("character", "selectTranscendData", {armorIdx});;
    }
    


    insertCaharacterData (userData:CharacterInfo){

    }


    


    

}