import { AuthService as AwesomeAuthService } from '@awesome-dev/server-auth';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly awesomeAuthService: AwesomeAuthService) {}

  createJwt(userId: number, companyId: number) {
    return this.awesomeAuthService.createToken({
      sub: userId,
      companyId,
      isExpired: false,
    });
  }
}
