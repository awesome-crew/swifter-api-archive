import { VerifyGuard } from '@awesome-dev/server-auth';
import {
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

import { FileUploadDto } from './dtos';

import { ImagesService } from './images.service';

@ApiTags('업로드')
@Controller('/upload')
@ApiBearerAuth()
@UseGuards(VerifyGuard)
export class ImagesController {
  constructor(private readonly service: ImagesService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
    description:
      '이미지/일반파일 모두 이 API를 사용해주세요!\nFormData에 Javascript File객체를 배열로 담아 보내주시면 됩니다',
  })
  @ApiResponse({ type: [String], description: '업로드된 URL의 배열' })
  @Post('/')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadImages(@UploadedFiles() files: Array<Express.Multer.File>) {
    const results = await this.service.uploadBufferDatas(
      files.map((file) => ({
        buffer: file.buffer,
        mimetype: file.mimetype,
      })),
    );

    return results.map((result) => result?.url ?? null);
  }
}
