import {
  AdminController,
  BaseAdminController,
} from '@awesome-dev/server-admin';
import { Body, Param, ParseIntPipe, Post } from '@nestjs/common';

import { DeployCourseDto } from '@/modules/common/images/dtos';
import { CoursesService } from '@/modules/course/courses/courses.service';
import {
  CourseDeployStatus,
  CourseEntity,
} from '@/modules/course/courses/entities';
import { LessonTransferScheduleService } from '@/modules/course/lesson-transfer-schedules/lesson-transfer-schedule.service';

@AdminController(CourseEntity)
export class AdminCoursesController extends BaseAdminController<CourseEntity> {
  constructor(
    readonly service: CoursesService,
    private readonly lessonTransferScheduleService: LessonTransferScheduleService,
  ) {
    super(service);
  }

  @Post('/:id/deploy')
  async deploy(
    @Param('id', ParseIntPipe) id: number,
    @Body() { deployTime, lessonTransferSchedules }: DeployCourseDto,
  ) {
    for (const ele of lessonTransferSchedules) {
      await this.lessonTransferScheduleService.updateOrCreate(ele, id);
    }

    return this.service.update(id, {
      deployTime,
      deployStatus: CourseDeployStatus.DEPLOYING,
    });
  }

  @Post('/:id/cancel-deploy')
  async cancelDeploy(@Param('id', ParseIntPipe) id: number) {
    return this.service.update(id, {
      deployTime: undefined,
      deployStatus: CourseDeployStatus.PENDING,
    });
  }

  @Post('/:id/stop-deploy')
  async stopDeploy(@Param('id', ParseIntPipe) id: number) {
    return this.service.update(id, {
      deployStatus: CourseDeployStatus.PENDING,
    });
  }
}
