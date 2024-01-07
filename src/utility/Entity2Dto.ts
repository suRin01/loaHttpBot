const singleEntity2Dto = <T>(entity:any)=>{
    let returnData: T = {} as T;
    Object.getOwnPropertyNames(entity).forEach((key)=>{
        returnData[key] = entity[key];
    })

    return returnData;
}



export const entity2Dto = <T>(entities:any):T[]=>{
    if(entities["length"] !== undefined){

        let entityArray:T[] = [];
        entities.forEach((entity)=>{
            entityArray.push(singleEntity2Dto(entity));
        })

        return entityArray;
    }

    return singleEntity2Dto(entities);
}