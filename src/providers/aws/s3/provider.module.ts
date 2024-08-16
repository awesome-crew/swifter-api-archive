import { AwsS3Module, S3Config } from '@awesome-dev/server-aws-s3';
import { Module } from '@nestjs/common';

import {
  AwsS3ConfigModule,
  AwsS3ConfigService,
} from '@/config/providers/aws/s3';

@Module({
  imports: [
    AwsS3Module.forRootAsync({
      imports: [AwsS3ConfigModule],
      useFactory: async (configService: AwsS3ConfigService) =>
        new S3Config({
          region: configService.region!,
          publicBucketName: configService.publicBucketName!,
          accessKeyId: configService.accessKeyId!,
          secretAccessKey: configService.secretAccessKey!,
          cloudfrontUrl: configService.cloudfrontUrl!,
        }),
      inject: [AwsS3ConfigService],
    }),
  ],
})
export class AwsS3ProviderModule {}
