import { WhatsappService } from '@awesome-dev/server-whatsapp';
import { EventEmitter } from '@awesome-dev/server-event-emitter';
import { BaseService } from '@awesome-dev/server-common';
import { Injectable } from '@nestjs/common';

import { CompanyMemberEntity } from '@/modules/company/company-members/domain';

import {
  LessonSmsTransferedEvent,
  LessonSmsTransferFailedEvent,
} from '../sms-transfer-histories/events';

import { LessonEntity } from './entities';
import { LessonRepository } from './repositories';

@Injectable()
export class LessonService extends BaseService<LessonEntity> {
  constructor(
    readonly repository: LessonRepository,

    private readonly eventEmitter: EventEmitter,
    private readonly whatsappService: WhatsappService,
  ) {
    super();
  }

  async transfer(id: number, to: CompanyMemberEntity) {
    const lesson = await this.repository.findOne({
      where: { id },
      select: ['title', 'description', 'imageUrl'],
    });

    if (!lesson) {
      return;
    }

    try {
      await this.whatsappService.sendImageMessage({
        to: to.phoneNumber,
        url: lesson.imageUrl,
      });
      await this.whatsappService.sendTextMessage({
        to: to.phoneNumber,
        body: `${lesson.title}\n\n${lesson.description}`,
      });

      this.eventEmitter.emit(
        new LessonSmsTransferedEvent({ lesson, companyMember: to }),
      );
    } catch {
      this.eventEmitter.emit(
        new LessonSmsTransferFailedEvent({ lesson, companyMember: to }),
      );
    }
  }
}
