export const searchQuery2Obj = <T>(urlQuery: any):T=>{
    let userSearchData = {} as T;
    Object.getOwnPropertyNames(urlQuery).forEach((key)=>{
        userSearchData[key] = urlQuery[key];
    })

    return userSearchData;
}


import { Request } from 'express';
export const extractTokenFromHeader = (request: Request): string | undefined =>{
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
}