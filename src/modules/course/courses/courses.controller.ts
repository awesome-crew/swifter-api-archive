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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtPayload } from '@/auth/interfaces';
import { DeployCourseDto } from '@/modules/common/images/dtos';

import {
  CourseMetadataResponseDto,
  CreateCourseDto,
  SaveCourseLessonsDto,
  UpdateCourseDto,
} from './dtos';
import { CourseDeployStatus, CourseAttendanceEntity, CourseEntity } from './entities';

import { LessonTransferScheduleService } from '../lesson-transfer-schedules/lesson-transfer-schedule.service';
import { CoursesService } from './courses.service';
import { CourseAttendanceService } from './course-attendance.service';

@Controller('/courses')
export class CoursesController {
  constructor(
    private readonly service: CoursesService,
    private readonly courseAttendanceService: CourseAttendanceService,
    private readonly lessonTransferScheduleService: LessonTransferScheduleService,
  ) {}

  @ApiTags('코스')
  @ApiOperation({ summary: '내 코스 목록 조회' })
  @ApiResponse({ type: [CourseEntity] })
  @ApiBearerAuth()
  @UseGuards(VerifyGuard)
  @Get('/')
  list(
    @CurrentUser() { companyId }: JwtPayload,
    @ListOptionsQuery() listOptions: ListOptions<CourseEntity>,
  ) {
    return this.service.list(listOptions.where({ companyId }));
  }

  @ApiTags('코스')
  @ApiOperation({ summary: '내 코스 단건 생성' })
  @ApiResponse({ type: CourseEntity })
  @ApiBearerAuth()
  @UseGuards(VerifyGuard)
  @Post('/')
  create(
    @CurrentUser() { companyId }: JwtPayload,
    @Body() body: CreateCourseDto,
  ) {
    return this.service.create({ companyId, ...body });
  }

  @ApiTags('코스')
  @ApiOperation({ summary: '내 코스 단건 조회' })
  @ApiResponse({ type: CourseEntity })
  @ApiBearerAuth()
  @UseGuards(VerifyGuard)
  @Get('/:id')
  async read(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() { companyId }: JwtPayload,
  ) {
    await this.service.assertBelongsTo(id, companyId);

    return this.service.get(id, ['lessons']);
  }

  @ApiTags('학습리포트')
  @ApiOperation({ summary: '내 코스 단건 메타데이터 조회' })
  @ApiResponse({ type: CourseMetadataResponseDto })
  @ApiBearerAuth()
  @UseGuards(VerifyGuard)
  @Get('/:id/metadata')
  async getMetadata(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() { companyId }: JwtPayload,
  ) {
    await this.service.assertBelongsTo(id, companyId);

    return this.service.getMetadata(id);
  }

  @ApiTags('코스')
  @ApiOperation({ summary: '내 코스 레슨 저장' })
  @ApiResponse({ type: CourseEntity })
  @ApiBearerAuth()
  @UseGuards(VerifyGuard)
  @Patch('/:id/save-lessons')
  async saveLessons(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() { companyId }: JwtPayload,
    @Body() { lessons }: SaveCourseLessonsDto,
  ) {
    await this.service.assertBelongsTo(id, companyId);

    return this.service.update(id, { lessons });
  }

  @ApiTags('코스')
  @ApiOperation({ summary: '내 코스 단건 수정' })
  @ApiResponse({ type: CourseEntity })
  @ApiBearerAuth()
  @UseGuards(VerifyGuard)
  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() { companyId }: JwtPayload,
    @Body() body: UpdateCourseDto,
  ) {
    await this.service.assertBelongsTo(id, companyId);

    return this.service.update(id, body);
  }

  @ApiTags('코스')
  @ApiOperation({ summary: '내 코스 단건 삭제' })
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
  @ApiOperation({ summary: '코스 수강자 수 조회' })
  @ApiResponse({ type: Number })
  @Get('/:id/attendance-count')
  async attendanceCount(@Param('id', ParseIntPipe) id: number) {
    return this.courseAttendanceService.count(
      new ListOptions({ courseId: id }),
    );
  }

  @ApiTags('코스')
  @ApiOperation({ summary: '내 코스 단건 배포' })
  @ApiResponse({ type: CourseEntity })
  @ApiBearerAuth()
  @UseGuards(VerifyGuard)
  @Post('/:id/deploy')
  async deploy(
    @Param('id', ParseIntPipe) id: number,
    @Body() { deployTime, lessonTransferSchedules }: DeployCourseDto,
    @CurrentUser() { companyId }: JwtPayload,
  ) {
    await this.service.assertBelongsTo(id, companyId);

    for (const ele of lessonTransferSchedules) {
      await this.lessonTransferScheduleService.updateOrCreate(ele, id);
    }

    return this.service.update(id, {
      deployTime,
      deployStatus: CourseDeployStatus.DEPLOYING,
    });
  }

  @ApiTags('코스')
  @ApiOperation({ summary: '내 코스 단건 배포 취소' })
  @ApiResponse({ type: CourseEntity })
  @ApiBearerAuth()
  @UseGuards(VerifyGuard)
  @Post('/:id/cancel-deploy')
  async cancelDeploy(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() { companyId }: JwtPayload,
  ) {
    await this.service.assertBelongsTo(id, companyId);

    return this.service.update(id, {
      deployTime: undefined,
      deployStatus: CourseDeployStatus.PENDING,
    });
  }

  @ApiTags('코스')
  @ApiOperation({ summary: '내 코스 단건 배포 중지' })
  @ApiResponse({ type: CourseEntity })
  @ApiBearerAuth()
  @UseGuards(VerifyGuard)
  @Post('/:id/stop-deploy')
  async stopDeploy(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() { companyId }: JwtPayload,
  ) {
    await this.service.assertBelongsTo(id, companyId);

    return this.service.update(id, {
      deployStatus: CourseDeployStatus.PENDING,
    });
  }

  @ApiTags('코스')
  @ApiOperation({ summary: '내 코스 수강자 벌크 추가' })
  @ApiResponse({ type: CourseAttendanceEntity })
  @ApiBearerAuth()
  @UseGuards(VerifyGuard)
  @Post('/:id/attendance')
  async addAttendance(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: number[],
    @CurrentUser() { companyId }: JwtPayload,
  ) {
    await this.service.assertBelongsTo(id, companyId);

    return this.courseAttendanceService.bulkInsert(id, body);
  }
}
