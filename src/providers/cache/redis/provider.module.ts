import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

import { CacheService } from './provider.service';

@Global()
@Module({
  imports: [CacheModule.register()],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheProviderModule {}
