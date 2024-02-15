
import { Injectable } from '@nestjs/common';
import { tsbatis } from 'src/utility/Tsbatis';
import { ConfigService } from '@nestjs/config';
import { CharacterInfo } from '../../lostarkApi/model/loaApi';
import axios from 'axios';
import { loaApiUrls } from 'src/constant/urls';
import { Character, Armor, Elixir, Transcend } from '../model/Character';
import { CodeService } from 'src/code/service/CodeService';
import { CommonCode, CommonCodeWithCode } from 'src/code/model/Code';
import { get } from 'https';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { cacheItemImage } from 'src/utility/FileUtil';
import { FileService } from 'src/file/service/FileService';
import { File } from 'src/file/model/File';
import { codeCache } from 'src/utility/CodeCache';
import { mongoDbStruct, mongoPool } from 'src/utility/MongoPool';

@Injectable()
export class CharacterService {
    constructor(
        private configService: ConfigService,
        private codeService: CodeService,
        private fileService: FileService
    ){}

    async getCharacterData(username: string): Promise<Character>{
        return await axios
        .get<CharacterInfo>(`${loaApiUrls.baseUrl}${loaApiUrls.armory}${encodeURI(username)}`, {
            headers: { authorization: `bearer ${this.configService.get("loaApiKey")}` },
        })
        .then(async (result)=>{
            if(result.data === null){
                throw new Error("캐릭터 정보를 찾을 수 없습니다.");
            }

            let apiData = new CharacterInfo();
            apiData.ArmoryAvatars = result.data.ArmoryAvatars;
            apiData.ArmoryCard = result.data.ArmoryCard;
            apiData.ArmoryEngraving = result.data.ArmoryEngraving;
            apiData.ArmoryEquipment = result.data.ArmoryEquipment;
            apiData.ArmoryGem = result.data.ArmoryGem;
            apiData.ArmoryProfile = result.data.ArmoryProfile;
            apiData.ArmorySkills = result.data.ArmorySkills;
            apiData.Collectibles = result.data.Collectibles;
            apiData.ColosseumInfo = result.data.ColosseumInfo;
            


            const codes:CommonCodeWithCode[] = await codeCache.getCode();
            const characterData = apiData.toCharacter();
            for(let index = 0, max = characterData.equipList.length ;index < max ; index++){
                characterData.equipList[index].equipCode = codes.find(code=>{
                    if(code.codeValue == characterData.equipList[index].equipCode){
                        return true;
                    }
                }).code;
                
                const cachedFileData = await cacheItemImage(characterData.equipList[index].imgUrl);
                const imgIdx = await this.fileService.insertFile({
                    filePath: cachedFileData.filePath,
                    fileName: cachedFileData.fileName,
                    fileExtension: "png",
                    inputId: "SYSTEM"
                })
                characterData.equipList[index].imgIdx = Number(imgIdx);
            }
            characterData.insertDt = new Date();

            return characterData;
        })
        .catch((error)=>{
            console.error(error);
            throw new Error("로스트아크 서비스 점검중입니다.");
        })
    }

    async getCharacterDbData(name:string):Promise<Character[]>{
        //get character info from rdbms
        //return await tsbatis.select<Character>("character", "selectLatestCharacter", {name});;

        //get character info from mongodb
        return await (await mongoPool.getConnection()).db(mongoDbStruct.dbName).collection(mongoDbStruct.collections.character.name).find<Character>({name}).toArray();
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