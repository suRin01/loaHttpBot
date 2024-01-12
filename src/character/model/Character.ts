export interface Character{
    characterIdx: number;
    userIdx: number;
    guildIdx: number;
    name: string;
    isMainCharacter: string;
    class: string;
    itemLevel: string;
    server: string;
    insertDt: Date;
    expeditionLevel: string;
    pvpGradeName: string;
    townLevel: number;
    townName: string;
    toalSkillPoints: number;
    usingSkillPoints: number;
}


export interface Archivement{
    archivementIdx: number;
    characterIdx: number;
    archiveCode: string;
    maxVal: number;
    currentVal: number;
}

export interface Stat{
    statIdx: number;
    characterIdx: number;
    statCode: string;
    value: number;
    addtionalValue: number;
}


export interface Armor{
    armorIdx: number;
    characterIdx: number;
    name: string;
    level: number;
    imgIdx: number;
    equipCode: string;
    setLevel: number;
}

export interface Elixir{
    armorIdx: number;
    elixirIdx: number;
    name: string;
    effect: string;
}

export interface Transcend{
    armorIdx: number;
    transcendIdx: number;
    stage: number;
    sum: number;
}