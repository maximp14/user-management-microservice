import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class EmailService {
  constructor(
    private mailerService: MailerService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async sendVerificationMail(email: string, name: string) {
    const payload = { email: email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>("JWT_SECRET"),
      expiresIn: this.configService.get<string>("JWT_EXPIRES"),
    });
    const url = `${this.configService.get(
      "EMAIL_CONFIRMATION_URL"
    )}?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: "Welcome to the maxi online bank system",
      template: "./confirmation.hbs",
      context: {
        name: name,
        url: url,
      },
    });
  }
}
