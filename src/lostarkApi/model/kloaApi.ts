export class korlarkResponse {
    merchants: merchant[];
}

export class merchant {
    id: number;
    state: number;
    user: userInfo;
    server: number;
    continent: string;
    items: item[];
    created_at: string;
    updated_at: string | null;
    heart_count: number;
    is_hearted: null

}
export class item {
    type: number;
    content: string;

}

export class userInfo {
    id: number;
    nickname: string;
    stove: stoveInfo;
}

export class stoveInfo {
    nickname: string;
    server: number;
    job: number;
}