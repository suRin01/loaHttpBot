import { Archivement, Armor, Character, Elixir, Stat, Transcend } from "src/character/model/Character";
import { cacheItemImage } from "src/utility/FileUtil";
import { IndentStringGroup, ItemPartBox, TooltipHeader } from "./loaApiEquipTooltips";

export class SimpleCharacterInfo {
    name: string;
    classname: string;
    level: number;
}

export class CharacterPerServer {
    serverName: string;
    characterList: SimpleCharacterInfo[]
}

export class CalenderEvent {
    CategoryName: string;
    ContentsName: string;
    ContentsIcon: string;
    MinItemLevel: number;
    StartTimes: string[];
    Location: string;
    RewardItems: RewardItem[]
}

export class SimpleIslandEvent {
    name: string;
    startTime: Date[];
    reward: string;
}
export class AbyssGuardians {
    Raids: {
        Name: string;
        Description: string;
        MinCharacterLevel: number;
        MinItemLevel: number;
        RequiredClearRaid: string;
        StartTime: string;
        EndTime: string;
        Image: string
    }[]
    ;
    RewardItems: {
        ExpeditionItemLevel: number;
        Items: RewardItem[]
    }[]

}


export class AbyssDungeons {
    Name: string;
    Description: string;
    MinCharacterLevel: number;
    MinItemLevel: number;
    AreaName: string;
    StartTime: string;
    EndTime: string;
    Image: string;
    RewardItems: RewardItem[]
}

export class RewardItem {
    Name: string;
    Icon: string;
    Grade: string;
    StartTimes: string[]
}


export class MarketStructure<T> {
    
  PageNo: number;
  PageSize: number;
  TotalCount: number;
  Items: T[]
}

export class AuctionItem {
    Name: string;
    Grade: string;
    Tier: number;
    Level: null;
    Icon: string;
    GradeQuality: null;
    AuctionInfo: AuctionInfo;
    Options: AuctionOptions[];
}

export class AuctionInfo {
    StartPrice: number;
    BuyPrice: number;
    BidPrice: number;
    EndDate: string;
    BidCount: number;
    BidStartPrice: number;
    IsCompetitive: boolean;
    TradeAllowCount: number;
}

export class AuctionOptions {
    Type: string;
    OptionName: string;
    OptionNameTripod: string;
    Value: number;
    IsPenalty: boolean;
    ClassName: string;
}

export class MarketItem {
    Id: number;
    Name: string;
    Grade: string;
    Icon: string;
    BundleCount: number;
    TradeRemainCount: number;
    YDayAvgPrice: number;
    RecentPrice: number;
    CurrentMinPrice: number
}

export class Recipe {
    itemName: string;
    materials: {
        materialName: string;
        materialCount: number;
    }[];
}


export class CharacterInfo {
    ArmoryProfile	: Profile;
	ArmoryEquipment	: Equipment[];
	ArmoryAvatars	: Avatar[];
	ArmorySkills	: Skill[];
	ArmoryEngraving	: Engraving;
	ArmoryCard		: cards;
	ArmoryGem		: EquipGems;
	ColosseumInfo	: ColosseumInfo;
	Collectibles	: Collectible[];

    public toCharacter():Character{
        
        const characterData:Character = {
            name: this.ArmoryProfile.CharacterName,
            isMainCharacter: false,
            class: this.ArmoryProfile.CharacterClassName,
            itemLevel: Number(this.ArmoryProfile.ItemMaxLevel.replace(",", "")),
            server: this.ArmoryProfile.ServerName,
            expeditionLevel: this.ArmoryProfile.ExpeditionLevel,
            pvpGradeName: this.ArmoryProfile.PvpGradeName,
            townLevel: this.ArmoryProfile.TownLevel,
            townName: this.ArmoryProfile.TownName,
            toalSkillPoints: this.ArmoryProfile.TotalSkillPoint,
            usingSkillPoints: this.ArmoryProfile.UsingSkillPoint,

            archiveList: this.Collectibles.map((collection):Archivement=>{
                return {
                    archiveCode: collection.Type,
                    maxVal: collection.Point,
                    currentVal: collection.MaxPoint
                }
            }),
            equipList: this.ArmoryEquipment.map((equip):Armor=>{
                let equipBody:Armor = {
                    equipCode: "",
                    level: 0,
                    name: "",
                    imgUrl: "",
                    elixirList: [],
                    imgIdx: null,
                    tooltip: "",
                    transcend: null
                };

                equipBody.tooltip = equip.Tooltip;
                equipBody.equipCode = equip.Type;
                equipBody.name = equip.Name;

                const itemToolTip = JSON.parse(equip.Tooltip);
                Object.getOwnPropertyNames(itemToolTip).forEach(async (element)=>{
                    if(itemToolTip[element]["type"] === "ItemTitle"){
                        const fileUrl = itemToolTip[element]["value"]["slotData"]["iconPath"] as  string;
                        //save to equipBody
                        const itemLevelDataList = /<FONT SIZE='14'>아이템 (.{2} )(\d{1,4}).*/mg.exec(itemToolTip[element]["value"]["leftStr2"]);
                        equipBody.imgUrl = fileUrl;
                        equipBody.level = itemLevelDataList !== null ? Number(itemLevelDataList[2]) : 0;

                    }
                })

                const tooltips = JSON.parse(equip.Tooltip) as Record<string, Object>;
                const elementNames = Object.getOwnPropertyNames(tooltips);
                //remove unused things from array
                const itemFooter = elementNames.splice(-6);


                let header: Record<string, Object> = {}
                elementNames.splice(0, 7).forEach((key) => {
                    let value = tooltips[key];
                    if (value !== undefined) header[key] = value;
                });

                //엘릭서, 엘릭서 활성화, 초월
                elementNames.forEach((key) => {
                    const etcTooltips = tooltips[key] as IndentStringGroup;
                    if (etcTooltips.value["Element_000"]?.topStr !== undefined && etcTooltips.value["Element_000"]?.topStr.includes("초월")) {
                        const targetStr = etcTooltips.value["Element_000"]?.topStr;
                        const imgRemovedStr = targetStr.replace(/<img.*<\/img>/gmi, "");
                        const activationCheck = /<font color='#(.{6})'>/i.exec(imgRemovedStr);
                        if (activationCheck === null) return;
                        if (activationCheck[1] === '787878') return;
                        const refinedStr = imgRemovedStr.replace(/<.*?>/ig, "").replace("[초월] ", "");

                        const levelValueExtractor = /(\d)단계 (\d{1,2})/gm.exec(refinedStr);
                        equipBody.transcend = new Transcend();
                        equipBody.transcend.stage = Number(levelValueExtractor[1]);
                        equipBody.transcend.sum = Number(levelValueExtractor[2]);

                    } else if (etcTooltips.value["Element_000"]?.topStr !== undefined && etcTooltips.value["Element_000"]?.topStr.includes("엘릭서")) {
                        const etcKeyList = Object.getOwnPropertyNames(etcTooltips.value["Element_000"].contentStr);

                        etcKeyList.forEach((etcKey) => {
                            const targetStr = etcTooltips.value["Element_000"]?.contentStr[etcKey]?.contentStr;
                            const imgRemovedStr = targetStr?.replace(/<img.*<\/img>/gmi, " ");
                            if (imgRemovedStr === undefined) return;
                            const activationCheck = /<font color='#(.{6})'>/i.exec(imgRemovedStr);
                            if (activationCheck === null) return;
                            if (activationCheck[1] === '787878') return;
                            const refinedStr = imgRemovedStr.replace(/<.*?>/ig, " ").replace(/  /ig, " ");
                            const levelValueExtractor = /\[..\] (.*) (Lv.\d) (.*)/gm.exec(refinedStr);
                            equipBody.elixirList.push({
                                name: levelValueExtractor[1],
                                effect: levelValueExtractor[2] + " " + levelValueExtractor[3]
                            })
                        })
                    }
                })

                return equipBody;
            }),
            guildIdx: null,
            insertDt: null,
            statList: this.ArmoryProfile.Tendencies.map((stat):Stat=>{
                return {
                    statCode: stat.Type,
                    value: Number(stat.Point),
                    addtionalValue: stat.Point,
                    tooltip: ''
                }
            }).concat(this.ArmoryProfile.Stats.map((stat):Stat=>{
                return {
                    statCode: stat.Type,
                    value: Number(stat.Value),
                    addtionalValue: stat.Value,
                    tooltip: stat.Tooltip.join()
                }
            })),
            userIdx: null,
        }
        
        
        
        return characterData;
    }

}
export class CollectiblePoint {
    PointName	:	string;
    Point	    :	number;
    MaxPoint	:	number;

}
export class Collectible {
    Type	    :	string;
    Icon	    :	string;
    Point	    :	number;
    MaxPoint	:	number;
	CollectiblePoints : CollectiblePoint[];

}

export class Coloseum {
    SeasonName	    :	string | null;
    Competitive	    :	string | null;
    TeamDeathmatch	:	string | null;
    Deathmatch	    :	string | null;
    TeamElimination	:	string | null;
    CoOpBattle	    :	string | null;

}
export class ColosseumInfo {
    Rank	:	number;
    PreRank	:	number;
    Exp    	:	number;
	Colosseums : Coloseum[];

}

export class EquipGems {
    Gems: Gem[];
    Effects: GemDescription[];
}

export class Gem {
    Slot	:	number;
    Name	:	string;
    Icon	:	string;
    Level	:	number;
    Grade	:	string;
    Tooltip	:	string;
}

export class GemDescription {
    GemSlot	    :	number;
    Name	    :	string;
    Description	:	string;
    Icon	    :	string;
    Tooltip	    :   string;
}

export class Effect {
    Index	    : number;
    CardSlots	: number[];
    Items		: NameDescription[];

}
export class Card {
    Slot	    :	number;
    Name	    :	string;
    Icon	    :	string;
    AwakeCount	:	number;
    AwakeTotal	:	number;
    Grade	    :	string;
    Tooltip	    :	string;
    }
export class cards {
    Cards : Card [];
    Effects : Effect[];
}
export class NameDescription {
    Name	    :	string;
    Description	:	string;
}
export class AttachEngrave {
    Slot	: number;
    Name	: string;
    Icon	: string;
    Tooltip	: string;
}

export class Engraving {
    Engravings : AttachEngrave[];
    Effects : NameDescription[];
}

export class Skill {
    Name	: string;
    Icon	: string;
    Level	: number;
    class	: string;
    IsAwakening	:	boolean
	Tripods	: Tripod[]
    Rune	: Rune | null
    Tooltip	: string;

}
export class Rune {
    Name	: string;
    Icon	: string;
    Grade	: string;
    Tooltip	: string;
}
export class Tripod {
    Tier	    : number;
    Slot	    : number;
    Name	    : string;
    Icon	    : string;
    Level	    : number;
    IsSelected	: boolean;
    Tooltip	    : string;
}

export class Profile {
    Stats		        :   TypeValueWithTooltip[];
    Tendencies		    :   TypeValueWithMaxpoint[];
    CharacterImage	    :	string;
    PvpGradeName	    :	string;
    TownName	        :	string;
    Title	            :	string;
    GuildMemberGrade	:	string;
    GuildName	        :	string;
    ServerName	        :	string;
    CharacterName	    :	string;
    CharacterClassName	:	string;
    ExpeditionLevel	    :	number;
    TownLevel	        :	number;
    UsingSkillPoint	    :	number;
    TotalSkillPoint	    :	number;
    CharacterLevel	    :	number;
    ItemAvgLevel	    :	string;
    ItemMaxLevel	    :	string;

}


export class TypeValue {
    Type: string;
    Value: number;
}

class TypeValueWithMaxpoint extends TypeValue  {
    MaxPoint: number; 
    Point: number;
}
class TypeValueWithTooltip extends TypeValue  {
    Tooltip: string[];
    Point: number;
}
export class Equipment{
    Type	: string;
    Name	: string;
    Icon	: string;
    Grade	: string;
    Tooltip : string;
}

export class Avatar {
    class	: string;
    Name	: string;
    Icon	: string;
    Grade	: string;
    IsSet	: string;
    IsInner	: string;
    Tooltip	: string;
}