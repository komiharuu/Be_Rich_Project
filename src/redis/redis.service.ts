import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { EmailService } from './email.service';

@Injectable()
export class RedisService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly emailService: EmailService
  ) {}

  async get(key: string): Promise<any> {
    return await this.cacheManager.get(key);
  }

  async set(key: string, value: any, options?: any): Promise<void> {
    await this.cacheManager.set(key, value, options);
  }

  async del(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async reset(): Promise<void> {
    const keys = await this.cacheManager.store.keys();
    await Promise.all(keys.map((key) => this.cacheManager.del(key)));
  }

  async sendEmail(email: string, subject: string, html: string): Promise<void> {
    await this.emailService.sendEmail(email, subject, html);
  }
}
