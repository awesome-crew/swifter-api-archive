import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  async get<T = unknown>(key: string) {
    // cache server에서 key에 해당하는 value를 가져옵니다.
    return await this.cache.get<T>(key);
  }
  async set(key: string, value: any, ttl?: number) {
    // cache server에 key-value 형태로 데이터를 저장합니다.
    await this.cache.set(key, value, ttl);
  }

  async getOrSet<T = unknown>(params: {
    key: string;
    ttl: number;
    cb: () => Promise<T>;
  }) {
    const { key, ttl, cb } = params;

    const cached = await this.get<T>(key);

    if (cached != null) {
      return cached;
    }

    const value = await cb();

    await this.set(key, value, ttl);

    return value;
  }
}
