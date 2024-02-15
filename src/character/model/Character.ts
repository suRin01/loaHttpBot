export class Character{
    userIdx?: number;
    guildIdx?: number;
    name: string;
    isMainCharacter: boolean;
    class: string;
    itemLevel: number;
    server: string;
    insertDt?: Date;
    expeditionLevel: number;
    pvpGradeName: string;
    townLevel: number;
    townName: string;
    toalSkillPoints: number;
    usingSkillPoints: number;

    equipList?: Armor[];
    archiveList?: Archivement[];
    statList?: Stat[];

}


export class Archivement{
    archiveCode: string;
    maxVal: number;
    currentVal: number;
    tooltip?: string;
}

export class Stat{
    statCode: string;
    value: number;
    addtionalValue: number;
    tooltip?: string;
}


export class Armor{
    name: string;
    level: number;
    imgUrl: string;
    imgIdx?: number;
    equipCode: string;
    elixirList?: Elixir[];
    transcend?: Transcend;
    tooltip?: string;
}

export class Elixir{
    name: string;
    effect: string;
    tooltip?: string;
}

export class Transcend{
    stage: number;
    sum: number;
    tooltip?: string;
}


export const characterInfo2Charater = ()=>{

}