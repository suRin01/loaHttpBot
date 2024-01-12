
import { Injectable } from '@nestjs/common';
import { tsbatis } from 'src/utility/Tsbatis';
import { ConfigService } from '@nestjs/config';
import { pbkdf2Sync } from 'crypto';
import { decrypt, encrypt } from 'src/utility/Aes256Util';

@Injectable()
export class GuildService {
    constructor(
        private configService: ConfigService,
    ){}



}