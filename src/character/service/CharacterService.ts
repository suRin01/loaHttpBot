
import { Injectable } from '@nestjs/common';
import { tsbatis } from 'src/utility/Tsbatis';
import { ConfigService } from '@nestjs/config';
import { pbkdf2Sync } from 'crypto';
import { decrypt, encrypt } from 'src/utility/Aes256Util';
import { CharacterInfo } from '../../lostarkApi/model/loaApi';
import axios from 'axios';
import { loaApiUrls } from 'src/constant/urls';
import { Character, Armor, Elixir, Transcend } from '../model/Character';

@Injectable()
export class CharacterService {
    constructor(
        private configService: ConfigService,
    ){}

    async getCharacterData(username: string): Promise<CharacterInfo>{
        return await axios
        .get<CharacterInfo>(`${loaApiUrls.baseUrl}${loaApiUrls.armory}${encodeURI(username)}`, {
            headers: { authorization: `bearer ${this.configService.get("loaApiKey")}` },
        })
        .then((result)=>{
            if(result.data === null){
                throw new Error("캐릭터 정보를 찾을 수 없습니다.");
            }
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