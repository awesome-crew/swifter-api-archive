import { BaseEvent } from '@awesome-dev/server-event-emitter';

import {
  LessonEntity,
  LessonQuestionChoiceEntity,
  LessonQuestionEntity,
} from '../../lessons/entities';
import { CompanyMemberEntity } from '@/modules/company/company-members/domain';

export class LessonSmsTransferedEvent extends BaseEvent {
  constructor(
    public readonly payload: {
      lesson: LessonEntity;
      companyMember: CompanyMemberEntity;
    },
  ) {
    super(payload);
  }
}

export class LessonSmsTransferFailedEvent extends BaseEvent {
  constructor(
    public readonly payload: {
      lesson: LessonEntity;
      companyMember: CompanyMemberEntity;
    },
  ) {
    super(payload);
  }
}

export class QuestionSmsTransferedEvent extends BaseEvent {
  constructor(
    public readonly payload: {
      question: LessonQuestionEntity;
      companyMember: CompanyMemberEntity;
    },
  ) {
    super(payload);
  }
}

export class QuestionSmsTransferFailedEvent extends BaseEvent {
  constructor(
    public readonly payload: {
      question: LessonQuestionEntity;
      companyMember: CompanyMemberEntity;
    },
  ) {
    super(payload);
  }
}

export class QuestionSmsAnsweredEvent extends BaseEvent {
  constructor(
    public readonly payload: {
      question: LessonQuestionEntity;
      choice?: LessonQuestionChoiceEntity;
      companyMember: CompanyMemberEntity;
      answerText: string;
      isCorrect: boolean;
    },
  ) {
    super(payload);
  }
}
