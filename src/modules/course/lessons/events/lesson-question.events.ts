import { BaseEvent } from '@awesome-dev/server-event-emitter';

import { CompanyMemberEntity } from '@/modules/company/company-members/domain';

export class NextQuestionTransferRequestedEvent extends BaseEvent {
  constructor(
    public readonly payload: {
      lessonId: number;
      questionId?: number;
      companyMember: CompanyMemberEntity;
    },
  ) {
    super(payload);
  }
}
