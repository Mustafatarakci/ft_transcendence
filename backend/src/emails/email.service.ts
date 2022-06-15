import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service'

@Injectable()
export class EmailService {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService,
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

  async sendEmail(to: string) {
    await this._send([to], 'domodachi 2차 인증번호', 'sendEmail.ejs', {
      email: to,
      emailpassword: (await this.usersService.getUserByEmail(to)).secondAuthCode,
    });
  }

  
  async emailVerify(code: Number) {
    //if (secondAuthCode === code) 맞는지 비교하고 true, false 리턴.
    if (code)
    {
      console.log(code);
      return (true);
    }
    else
      return (false);
  }
}
