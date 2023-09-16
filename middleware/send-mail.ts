import { createTransport, Transporter } from 'nodemailer';

interface mailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  cc?: string | Array<string>;
  bcc?: string | Array<string>;
  attachments?: {
    filename?: string | false | undefined;
    content?: string | Buffer | undefined;
    path?: string | undefined;
    contentType?: string | undefined;
  }[];
}
export class EmailService {
  transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      service: process.env.SMTP_SERVICE,
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      requireTLS: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  //common method to send mail extend interface when needing more control over sending mail
  async sendMail(mailOptions: mailOptions) {
    //sending mail
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.transporter.sendMail(mailOptions, (err: Error | null, info: any) => {
      if (err) {
        //log if error
        console.log('error', `Mail not send for this configuration${mailOptions} `);
        throw new Error("Email not sent.");
      }
    });
  }
}
