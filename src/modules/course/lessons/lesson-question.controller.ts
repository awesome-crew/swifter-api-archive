import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ListOptions, ListOptionsQuery } from '@awesome-dev/server-common';

import {
  SmsTransferHistoryEntity,
  SmsTransferStatus,
} from '../sms-transfer-histories/domain';
import { LessonQuestionMetadataResponseDto } from './dtos';

import { SmsTransferHistoryService } from '../sms-transfer-histories/sms-transfer-history.service';
import { LessonQuestionService } from './lesson-question.service';

@Controller('/lesson-questions')
export class LessonQuestionController {
  constructor(
    private readonly service: LessonQuestionService,
    private readonly smsTransferHistoryService: SmsTransferHistoryService,
  ) {}

  @ApiTags('학습리포트')
  @ApiOperation({ summary: '단건 질문의 메타데이터 조회' })
  @ApiResponse({ type: LessonQuestionMetadataResponseDto })
  @Get('/:id/metadata')
  getMetadata(@Param('id', ParseIntPipe) id: number) {
    return this.service.getMetadata(id);
  }

  @ApiTags('학습리포트')
  @ApiOperation({ summary: '단건 질문의 답변목록 조회' })
  @ApiResponse({ type: [SmsTransferHistoryEntity] })
  @Get('/:id/sms-transfer-histories')
  async listSmsTransferHistories(
    @Param('id', ParseIntPipe) id: number,
    @ListOptionsQuery() listOptions: ListOptions<SmsTransferHistoryEntity>,
  ) {
    return this.smsTransferHistoryService.list(
      listOptions
        .where({
          lessonQuestionId: id,
          status: SmsTransferStatus.ANSWERED,
        })
        .relation(['companyMember']),
    );
  }
}
