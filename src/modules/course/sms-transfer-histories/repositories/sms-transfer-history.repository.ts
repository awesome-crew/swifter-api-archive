import { BaseRepository } from '@awesome-dev/server-common';
import { CustomRepository } from '@awesome-dev/server-typeorm';

import { SmsTransferHistoryEntity } from '../domain';

@CustomRepository(SmsTransferHistoryEntity)
export class SmsTransferHistoryRepository extends BaseRepository<SmsTransferHistoryEntity> {}
