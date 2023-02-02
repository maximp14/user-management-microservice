import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(email: string, name: string) {
    console.log(email);
    await this.mailerService.sendMail({
      to: email,
      subject: 'Greeting from NestJS NodeMailer',
      template: '/confirmation',
      context: {
        name: name,
      },
    });
  }
}
