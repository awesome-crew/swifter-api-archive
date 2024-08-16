import { CurrentUser, VerifyGuard } from '@awesome-dev/server-auth';
import { ListOptions, ListOptionsQuery } from '@awesome-dev/server-common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtPayload } from '@/auth/interfaces';
import { CourseEntity } from '@/modules/course/courses/entities';
import { SmsTransferHistoryEntity } from '@/modules/course/sms-transfer-histories/domain';

import { CompanyMemberEntity } from './domain';
import {
  BulkUpsertCompanyMemberDto,
  CompanyMemberMetadataResponseDto,
  CreateCompanyMemberDto,
  UpdateCompanyMemberDto,
} from './dtos';

import { CompanyMemberService } from './company-member.service';

@Controller('/company-members')
export class CompanyMembersController {
  constructor(private readonly service: CompanyMemberService) {}

  @ApiTags('구성원')
  @ApiOperation({ summary: '내 회사 구성원 목록 조회' })
  @ApiResponse({ type: [CompanyMemberEntity] })
  @ApiBearerAuth()
  @UseGuards(VerifyGuard)
  @Get('/')
  list(
    @CurrentUser() { companyId }: JwtPayload,
    @ListOptionsQuery() listOptions: ListOptions<CompanyMemberEntity>,
  ) {
    return this.service.list(listOptions.where({ companyId }));
  }

  @ApiTags('구성원')
  @ApiOperation({ summary: '내 회사 구성원 단건 생성' })
  @ApiResponse({ type: CompanyMemberEntity })
  @ApiBearerAuth()
  @UseGuards(VerifyGuard)
  @Post('/')
  create(
    @CurrentUser() { companyId }: JwtPayload,
    @Body() body: CreateCompanyMemberDto,
  ) {
    return this.service.create({ companyId, ...body });
  }

  @ApiTags('구성원')
  @ApiOperation({
    summary: '내 회사 구성원 벌크 생성/수정',
    description: `이름+휴대폰번호로 매칭해 이미 존재하는 경우 수정하고, 존재하지 않는 경우 생성합니다.<br/>
      엑셀 업로드 기능에서 사용합니다.`,
  })
  @ApiResponse({ type: [CompanyMemberEntity] })
  @ApiBearerAuth()
  @UseGuards(VerifyGuard)
  @Post('/bulk-upsert')
  async bulkUpsert(
    @CurrentUser() { companyId }: JwtPayload,
    @Body() { companyMembers }: BulkUpsertCompanyMemberDto,
  ) {
    const res = [];

    for (const payload of companyMembers) {
      const upserted = await this.service.upsert({ companyId, ...payload });
      res.push(upserted);
    }

    return res;
  }

  @ApiTags('구성원')
  @ApiOperation({ summary: '내 회사 구성원 단건 조회' })
  @ApiResponse({ type: CompanyMemberEntity })
  @ApiBearerAuth()
  @UseGuards(VerifyGuard)
  @Get('/:id')
  async read(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() { companyId }: JwtPayload,
  ) {
    await this.service.assertBelongsTo(id, companyId);

    return this.service.get(id);
  }

  @ApiTags('구성원')
  @ApiOperation({ summary: '내 회사 구성원 단건 수정' })
  @ApiResponse({ type: CompanyMemberEntity })
  @ApiBearerAuth()
  @UseGuards(VerifyGuard)
  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() { companyId }: JwtPayload,
    @Body() body: UpdateCompanyMemberDto,
  ) {
    await this.service.assertBelongsTo(id, companyId);

    return this.service.update(id, body);
  }

  @ApiTags('구성원')
  @ApiOperation({ summary: '내 회사 구성원 단건 삭제' })
  @ApiResponse({ type: Boolean })
  @ApiBearerAuth()
  @UseGuards(VerifyGuard)
  @Delete('/:id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() { companyId }: JwtPayload,
  ) {
    await this.service.assertBelongsTo(id, companyId);

    this.service.remove(id);

    return true;
  }

  @ApiTags('학습리포트')
  @ApiOperation({ summary: '내 회사 단건 구성원의 코스목록 조회' })
  @ApiResponse({ type: [CourseEntity] })
  @ApiBearerAuth()
  @UseGuards(VerifyGuard)
  @Get('/:id/courses')
  async findAttendings(
    @Param('id', ParseIntPipe) id: number,
    @ListOptionsQuery() listOptions: ListOptions<CourseEntity>,
    @CurrentUser() { companyId }: JwtPayload,
  ) {
    await this.service.assertBelongsTo(id, companyId);

    return this.service.listAttendingCourses(id, listOptions);
  }

  @ApiTags('학습리포트')
  @ApiOperation({
    summary: '내 회사 단건 구성원의 코스별 메타데이터 목록 조회',
    description:
      '코스의 응답률, 정답률 을 나타내기 위해 사용됩니다.',
  })
  @ApiResponse({ type: [CompanyMemberMetadataResponseDto] })
  @ApiBearerAuth()
  @UseGuards(VerifyGuard)
  @Get('/:id/courses/metadata')
  async findAttendingCoursesMetadatas(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() { companyId }: JwtPayload,
  ) {
    await this.service.assertBelongsTo(id, companyId);

    const courseIds = await this.service.getAttendingCourseIds(id);

    return Promise.all(
      courseIds.map((courseId) => this.service.getCourseMetadata(id, courseId)),
    );
  }

  @ApiTags('학습리포트')
  @ApiOperation({
    summary: '내 회사 단건 구성원의 코스별 메타데이터 조회',
    description: '코스의 응답률, 정답률 을 나타내기 위해 사용됩니다.',
  })
  @ApiResponse({ type: CompanyMemberMetadataResponseDto })
  @ApiBearerAuth()
  @UseGuards(VerifyGuard)
  @Get('/:id/courses/:courseId/metadata')
  async findAttendingCourseMetadata(
    @Param('id', ParseIntPipe) id: number,
    @Param('courseId', ParseIntPipe) courseId: number,
    @CurrentUser() { companyId }: JwtPayload,
  ) {
    await this.service.assertBelongsTo(id, companyId);
    await this.service.assertAttendingCourse(id, courseId);

    return this.service.getCourseMetadata(id, courseId);
  }

  @ApiTags('학습리포트')
  @ApiOperation({ summary: '해당 문제에 대한 구성원의 답변' })
  @ApiResponse({ type: SmsTransferHistoryEntity })
  @ApiBearerAuth()
  @UseGuards(VerifyGuard)
  @Get('/:id/lesson-questions/:lessonQuestionId/sms-transfer-history')
  async getSmsTransferHistory(
    @Param('id', ParseIntPipe) id: number,
    @Param('lessonQuestionId', ParseIntPipe) lessonQuestionId: number,
    @CurrentUser() { companyId }: JwtPayload,
  ) {
    await this.service.assertBelongsTo(id, companyId);

    return this.service.getSmsTransferHistory(id, lessonQuestionId);
  }
}
