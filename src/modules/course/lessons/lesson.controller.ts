import { ListOptions } from '@awesome-dev/server-common';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LessonQuestionEntity } from './entities';

import { LessonQuestionService } from './lesson-question.service';

@Controller('/lessons')
export class LessonController {
  constructor(private readonly lessonQuestionService: LessonQuestionService) {}

  @ApiTags('학습리포트')
  @ApiOperation({ summary: '단일 레슨의 질문목록과 선택지목록 조회' })
  @ApiResponse({ type: [LessonQuestionEntity] })
  @Get('/:id/questions')
  async read(@Param('id') id: number) {
    return this.lessonQuestionService.list(
      new ListOptions<LessonQuestionEntity>()
        .where({ lessonId: id })
        .relation(['choices']),
    );
  }
}
