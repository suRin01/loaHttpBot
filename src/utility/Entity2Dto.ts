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
    }else{
        throw new Error("might be no data?")
    }
    
}

export const convertObjectPropertiesSnakeCaseToCamelCase = (
    obj: Record<string, any>,
  ): Record<string, any> => {
    const convertedObject: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
      const camelCaseKey = convertSnakeCaseToCamelCase(key);
      convertedObject[camelCaseKey] = value;
    }
  
    return convertedObject;
  };


  export const convertSnakeCaseToCamelCase = (str: string): string => {
    const words = str.split('_');
    const camelCaseWord = words
      .map((word, index) => {
        if (index === 0) {
          return word;
        }
        const firstLetterCap = word.charAt(0).toUpperCase();
        const remainingLetters = word.slice(1);
        return firstLetterCap + remainingLetters;
      })
      .join('');
  
    return camelCaseWord;
  };