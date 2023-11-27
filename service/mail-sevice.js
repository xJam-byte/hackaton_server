const nodemailer = require("nodemailer");
class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: "abylaimalako@gmail.com",
        pass: "LOLKEK1234",
      },
    });
  }

  async sendDailyMail(to) {
    const mailOptions = {
      from: "abylaimalako@gmail.com",
      to,
      subject: "Ежедневное сообщение",
      text: `Привет ${to}! Это ежедневное сообщение.`,
    };

    const info = await this.transporter.sendMail(mailOptions);
    return info;
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Активация аккаунта " + process.env.API_URL,
      text: "",
      html: `
                <div>
                    <h1>Для активации перейдите по ссылке</h1>
                    <a href="${link}">${link}</a>
                </div>

            `,
    });
  }
}
module.exports = new MailService();
