import { Controller, Get, Post, Param, Query, Body, Render } from '@nestjs/common';
import { CharacterService } from '../service/CharacterService';
import { ResponseBuilder } from 'src/utility/ResponseUtil';
import { RestResponse } from 'src/utility/model/ResponseModel';
import { CharacterInfo } from '../../lostarkApi/model/loaApi';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { Armor, Character } from '../model/Character';

@Controller('character')
export class CharacterController {
    constructor(
        private characterService: CharacterService
    ){}

    @Get(":characterName")
    async lookupCharacter(@Param("characterName") characterName: string): Promise<RestResponse<CharacterInfo|Character>>{
        console.log("request to character ", characterName)
        if(characterName === undefined){
            console.log("character name is required.");
            throw new HttpErrorByCode[422];
        }
        try {
            //check previous chracater search data
            const dbCharacterData = await this.characterService.getCharacterDbData(characterName);

            //if searched data is proceded within 3min(180s), return cached Data.
            if(dbCharacterData.length !== 0 || (new Date().getTime()/1000 - dbCharacterData[0]?.insertDt.getTime()/1000) < 5 * 60){
                //search detail information
                const responseData = dbCharacterData[0];
                //search armor Data 
                const armorData = await this.characterService.getCharacterArmorData(responseData.characterIdx);
                for(let index = 0 , length = armorData.length ; index++ ; index < length){
                    const armorIdx = armorData[index].armorIdx;
                    const armorElixirData = await this.characterService.getCharacterElixirData(armorIdx);
                    const armorTranscendData = await this.characterService.getCharacterTranscendData(armorIdx);
                    armorData[index]["elixir"] = armorElixirData;
                    armorData[index]["transcend"] = armorTranscendData;

                }
                responseData["armor"] = armorData;


                return new ResponseBuilder<Character>()
                .setBody(responseData)
                .build();




            }

            //else, lookup character data and cache in db.
            const characterData = await this.characterService.getCharacterData(characterName);
            //console.log(characterData);

            //cache character Data

            //serve character information.
            return new ResponseBuilder<CharacterInfo>()
                .setBody(characterData)
                .build()
        } catch (error) {
            console.log(error)
            throw new HttpErrorByCode[503];
        }

    }


    


}
