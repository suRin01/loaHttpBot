export class TypeValue {
    type: string;
    value: string;
}

export class ContentStr {
    bPoint: boolean;
    contentStr: string;
}

export class SlotData {
    iconGrade: number;
    iconPath: string;
    imagePath: string;
}


export class NameTagBox extends TypeValue{
}
export class SingleTextBox extends TypeValue{
}

export class MultiTextBox extends TypeValue{
}

export class ShowMeTheMoney extends TypeValue{
}

export class SetItemGroup {
    type: string;
    value: {
        firstMsg: string;
        itemData: {
            [key: string]: {
                label: string;
                slotData: SlotData;
            }
        }
    }
}


export class IndentStringGroup { 
    type: string;
    value: {
        [key: string]: {
            contentStr: {
                [key: string]: ContentStr
            };
            topStr: string
        }
    }
}


export class Progress {
    type: string;
    value: {
        forceValue: string;
        maximum: number;
        minimum: number;
        title: string;
        value: number;
        valueType: number;
    }
}

export class ItemPartBox {
    type: string;
    value: {
        Element_000: string;
        Element_001: string;
    }
}

export class ItemTitle {
    type: string;
    value: {
        bEquip: number;
        leftStr0: string;
        leftStr1: string;
        leftStr2: string;
        qualityValue: number;
        rightStr0: string;
        slotData: {
            advBookIcon: number;
            battleItemTypeIcon: number;
            cardIcon: false;
            friendship: number;
            iconGrade: number;
            iconPath: string;
            imagePath: string;
            islandIcon: number;
            rtString: string;
            seal: false;
            temporary: number;
            town: number;
            trash: number
        }
    }
}
export class TooltipHeader {
        /**
         * 전체 장비 이름
         */
        Element_000?: NameTagBox;
        /**
         * 장비 상세 값
         */
        Element_001?: ItemTitle;
        /**
         * 장비 사용 클래스명
         */
        Element_002?: SingleTextBox;
        /**
         * 캐릭터 귀속 여부
         */
        Element_003?: SingleTextBox;
        /**
         * 거래 가능 여부
         */
        Element_004?: MultiTextBox;
        /**
         * 장비 기본 효과
         */
        Element_005?: ItemPartBox;
        /**
         * 장비 추가 효과
         */
        Element_006?: {
            type: string;
            value: {
                Element_000: string;
                Element_001: string;
            }
        };
        /**
         * 장비 명파 수치
         */
        Element_007?: Progress;
}




export class AccessoryTooltip {
    Element_000?: NameTagBox;
    Element_001?: ItemTitle;
    Element_002?: SingleTextBox;
    Element_003?: MultiTextBox;
    Element_004?: ItemPartBox;
    Element_005?: ItemPartBox;
    Element_006?: IndentStringGroup;
    Element_007?: SingleTextBox;
    Element_008?: SingleTextBox;
}