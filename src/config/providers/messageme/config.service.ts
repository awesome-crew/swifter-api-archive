import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MessagemeConfigService {
  constructor(private configService: ConfigService) {}

  get apiKey() {
    return this.configService.get<string>('messageme.apiKey');
  }
  get callingNumber() {
    return this.configService.get<string>('messageme.callingNumber');
  }
}
