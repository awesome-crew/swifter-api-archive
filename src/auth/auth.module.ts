import { Module } from '@nestjs/common';
import {
  AuthConfig,
  AuthModule as AwesomeAuthModule,
} from '@awesome-dev/server-auth';

import { JwtConfigModule, JwtConfigService } from '@/config/jwt';
import { UsersModule } from '@/modules/user/users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    AwesomeAuthModule.forRootAsync({
      imports: [JwtConfigModule],
      useFactory: async (configService: JwtConfigService) =>
        new AuthConfig({
          jwt: {
            accessSecretKey: configService.accessSecretKey!,
            accessExpiresIn: configService.accessExpiresIn!,
            refreshSecretKey: configService.refreshSecretKey!,
            refreshExpiresIn: configService.refreshExpiresIn!,
          },
        }),
      inject: [JwtConfigService],
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
