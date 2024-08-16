import { InternalServerErrorException } from '@nestjs/common';

export function getMimeType(url: string) {
  const supportImageTypes = [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'webp',
    'svg',
    'tiff',
  ];

  const mimeType = supportImageTypes.find(
    (imageType) => url.indexOf(imageType) < 0,
  );
  if (!mimeType) {
    throw new InternalServerErrorException('지원하지 않는 이미지 형식입니다.');
  }

  return mimeType;
}

export function getS3Key(url: string) {
  return new URL(url).pathname.substring(1);
}
