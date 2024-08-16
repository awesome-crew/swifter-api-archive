import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Service dealing with mysql config based operations.
 *
 * @class
 */
@Injectable()
export class AwsS3ConfigService {
  constructor(private configService: ConfigService) {}

  get region() {
    return this.configService.get<string>('aws-s3.region');
  }
  get accessKeyId() {
    return this.configService.get<string>('aws-s3.accessKeyId');
  }
  get secretAccessKey() {
    return this.configService.get<string>('aws-s3.secretAccessKey');
  }
  get publicBucketName() {
    return this.configService.get<string>('aws-s3.publicBucketName');
  }
  get cloudfrontUrl() {
    return this.configService.get<string>('aws-s3.cloudfrontUrl');
  }
}
