export interface CommonCode{
    detailCodeIdx?: number;
    codeGroupIdx?: number;
    detailCode: string;
    codeValue: string;
    inputId: string;
    inputDt: Date;
    updateId: string;
    updateDt: Date;
    isUsed: boolean;
}

export interface CommonCodeGroup{
    codeGroupIdx?: number;
    codeGroupName: number;
    inputId: string;
    inputDt: Date;
    updateId: string;
    updateDt: Date;
    isUsed: boolean;
}


/**
 * Common Code List with LPadded Common Code Group
 * use with mapper code.selectCodepDetails
 */
export interface CommonCodeWithCode extends CommonCode{
    code: string;
}