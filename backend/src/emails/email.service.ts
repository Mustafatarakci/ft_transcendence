import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService
  ) {}

  async _send(
    tos: string[],
    subject: string,
    templateName: string,
    context: any = {},
  ): Promise<boolean> {
    await this.mailerService.sendMail({
      to: tos.join(', '),
      subject,
      template: `${templateName}`,
      context,
    });
    return true;
  }

  async sendEmail(to: string, emailAuthCode: number) {
    await this._send([to], 'domodachi 2차 인증번호', 'sendEmail.ejs', {
      email: to,
      emailpassword: emailAuthCode,
    });
  }

}
