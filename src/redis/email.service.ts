import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor(private readonly configService: ConfigService) {
    // Transporter 생성 (SMTP 설정)
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: this.configService.get<string>('GMAIL_CLIENT_ID'),
        pass: this.configService.get<string>('GMAIL_CLIENT_SECRET'),
      },
    });
  }

  async sendEmail(email: string, subject: string, html: string) {
    // 이메일 옵션 설정
    const mailOptions = {
      from: this.configService.get<string>('GMAIL_CLIENT_ID'), // 발신자
      to: email, // 수신자
      subject: subject, // 이메일 제목
      html: html, // HTML 본문
    };

    // 이메일 전송
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('메일 전송이 완료되었습니다.');
    } catch (error) {
      console.error('메일 전송 오류:', error);
    }
  }
}
