import { Module, Injectable } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  CacheModule,
  CacheModuleOptions,
  CacheOptionsFactory,
  CacheStore,
} from '@nestjs/cache-manager';
import { RedisService } from './redis.service';
import { EmailModule } from './email.module';
import { createClient } from 'redis';
import { EmailService } from './email.service';

@Injectable()
class RedisCacheOptionsFactory implements CacheOptionsFactory {
  private readonly redisClient; // Redis 클라이언트를 담을 변수

  constructor(private configService: ConfigService) {
    // Redis 클라이언트 설정
    const HOST = this.configService.get<string>('REDIS_HOST');
    const PORT = this.configService.get<number>('REDIS_PORT');

    this.redisClient = createClient({
      url: `redis://${HOST}:${PORT}`,
    });

    // Redis 클라이언트 연결
    this.redisClient.connect().catch(console.error);
  }

  createCacheOptions(): CacheModuleOptions {
    return {
      store: {
        create: () => this.redisClient,
      } as unknown as CacheStore, // Redis 클라이언트를 CacheStore로 캐스팅
      ttl: 1000, // 캐시 유지 시간
    };
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useClass: RedisCacheOptionsFactory,
    }),
    EmailModule,
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
