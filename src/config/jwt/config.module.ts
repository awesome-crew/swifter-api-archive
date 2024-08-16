import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

import configuration from './configuration';
import { JwtConfigService } from './config.service';

/**
 * Import and provide jwt configuration related classes.
 *
 * @module
 */
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        JWT_ACCESS_SECRET_KEY: Joi.string().default('JWT_ACCESS_SECRET_KEY'),
        JWT_ACCESS_EXPIRES_IN: Joi.string().default('7d'),
        JWT_REFRESH_SECRET_KEY: Joi.string().default('JWT_REFRESH_SECRET_KEY'),
        JWT_REFRESH_EXPIRES_IN: Joi.string().default('31d'),
      }),
    }),
  ],
  providers: [ConfigService, JwtConfigService],
  exports: [ConfigService, JwtConfigService],
})
export class JwtConfigModule {}
