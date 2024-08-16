import { PickType } from '@nestjs/swagger';

import { CourseEntity } from '../entities';

export class CreateCourseDto extends PickType(CourseEntity, [
  'title',
  'description',
  'imageUrl',
]) {}
