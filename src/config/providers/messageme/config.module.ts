import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

import configuration from './configuration';
import { MessagemeConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        MESSAGEME_API_KEY: Joi.string(),
        callingNumber: Joi.string(),
      }),
    }),
  ],
  providers: [ConfigService, MessagemeConfigService],
  exports: [ConfigService, MessagemeConfigService],
})
export class MessagemeConfigModule {}
