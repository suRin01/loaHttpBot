
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { tsbatis } from 'src/utility/Tsbatis';
import { File } from '../model/File';

@Injectable()
export class FileService {
    constructor(
    ){}


    async insertFile(fileData: File): Promise<number>{
        const data = await tsbatis.insert<File>("file", "insertFile", fileData);
        return data;
    }

}