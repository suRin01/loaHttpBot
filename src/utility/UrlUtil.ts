export const searchQuery2Obj = <T>(urlQuery: any):T=>{
    let userSearchData = {} as T;
    Object.getOwnPropertyNames(urlQuery).forEach((key)=>{
        userSearchData[key] = urlQuery[key];
    })

    return userSearchData;
}