import {
  MessagemeConfig,
  MessagemeModule,
} from '@awesome-dev/server-messageme';
import { Module } from '@nestjs/common';

import {
  MessagemeConfigModule,
  MessagemeConfigService,
} from '@/config/providers/messageme';

@Module({
  imports: [
    MessagemeModule.forRootAsync({
      imports: [MessagemeConfigModule],
      useFactory: async (configService: MessagemeConfigService) =>
        new MessagemeConfig({
          apiKey: configService.apiKey!,
          sms: {
            callingNumber: configService.callingNumber!,
          },
        }),
      inject: [MessagemeConfigService],
    }),
  ],
})
export class MessagemeProviderModule {}
