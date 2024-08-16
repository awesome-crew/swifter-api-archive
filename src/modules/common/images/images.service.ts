import { AwsS3Service } from '@awesome-dev/server-aws-s3';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as https from 'https';
import { firstValueFrom } from 'rxjs';

import { getMimeType, getS3Key } from './helpers';

export type UploadBufferPayload = {
  buffer: Buffer;
  mimetype: string;
  prefix?: string;
};

@Injectable()
export class ImagesService {
  constructor(
    private readonly httpService: HttpService,
    private awsS3Service: AwsS3Service,
  ) {}

  async uploadBufferDatas(payloads: UploadBufferPayload[]) {
    return await Promise.all(
      payloads.map((payload) =>
        new Promise<{ url: string; key: string }>(async (resolve) => {
          const { buffer, mimetype, prefix } = payload;
          resolve(
            await this.awsS3Service.uploadBuffer(buffer, mimetype, prefix),
          );
        }).catch(() => null),
      ),
    );
  }

  async uploadUrls(urls: string[], prefix?: string) {
    const bufferPayloads = await Promise.all<UploadBufferPayload>(
      urls.map(
        (url) =>
          new Promise(async (resolve, reject) => {
            try {
              const { data: buffer } = await firstValueFrom(
                this.httpService.get<Buffer>(url, {
                  responseType: 'arraybuffer',
                  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
                }),
              );
              const mimetype = getMimeType(url);

              resolve({
                buffer,
                mimetype,
                prefix,
              });
            } catch (err) {
              reject(err);
            }
          }),
      ),
    );

    return await this.uploadBufferDatas(bufferPayloads);
  }

  async removeByKeys(keys: string[]) {
    await this.awsS3Service.deleteObjects(keys);
  }

  async removeByUrls(urls: string[]) {
    await this.removeByKeys(urls.map((url) => getS3Key(url)));
  }
}
