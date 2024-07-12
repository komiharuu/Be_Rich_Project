import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getHello(): string {
    return `${this.configService.get('SERVER_PORT')} 트렐로 오픈`;
  }
}
