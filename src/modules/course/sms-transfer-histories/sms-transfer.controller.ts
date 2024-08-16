import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CompanyMemberService } from '@/modules/company/company-members/company-member.service';

import { LessonQuestionService } from '../lessons/lesson-question.service';

import { SmsTransferStatus, SmsTransferType } from './domain';

import { SmsTransferHistoryService } from './sms-transfer-history.service';
import { WhatsappWebhookDto } from '@awesome-dev/server-whatsapp';

function getMessage(body: WhatsappWebhookDto) {
  return body.entry[0].changes[0].value.messages[0];
}

@ApiTags('메시지미 문자수신')
@Controller('/sms-transfer')
export class SmsTransferController {
  constructor(
    private readonly service: SmsTransferHistoryService,
    private readonly companyMemberService: CompanyMemberService,
    private readonly lessonQuestionService: LessonQuestionService,
  ) {}

  @Get('/whatsapp-webhook')
  verifyWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') verifyToken: string,
    @Query('hub.challenge') challenge: string,
  ) {
    if (mode === 'subscribe' && verifyToken === 'WHATSAPP_VERIFY_TOKEN') {
      return challenge;
    }

    throw new BadRequestException();
  }

  @ApiOperation({ summary: '문자 수신' })
  @Post('/whatsapp-webhook')
  @HttpCode(200)
  async receiveMo(@Body() body: WhatsappWebhookDto) {
    const message = getMessage(body);

    const member = await this.companyMemberService.getByPhoneNumber(
      message.from.replace('+82', '0'),
    );

    if (member == null) {
      throw new NotFoundException();
    }

    const transferHistory = await this.service.getLatestByMemberId(member.id);

    if (transferHistory == null) {
      throw new NotFoundException();
    }

    if (transferHistory.status !== SmsTransferStatus.NOT_ANSWERED) {
      return;
    }

    if (
      transferHistory.type !== SmsTransferType.QUESTION ||
      transferHistory.lessonQuestionId == null
    ) {
      throw new BadRequestException();
    }

    await this.lessonQuestionService.transferFeedback(
      transferHistory.lessonQuestionId,
      message.text.body,
      member,
    );

    return true;
  }
}
