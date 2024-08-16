import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfigService {
  constructor(private configService: ConfigService) {}

  get accessSecretKey() {
    return this.configService.get<string>('jwt.accessSecretKey');
  }
  get accessExpiresIn() {
    return this.configService.get<string>('jwt.accessExpiresIn');
  }
  get refreshSecretKey() {
    return this.configService.get<string>('jwt.refreshSecretKey');
  }
  get refreshExpiresIn() {
    return this.configService.get<string>('jwt.refreshExpiresIn');
  }
}
