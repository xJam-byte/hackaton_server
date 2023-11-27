const mailService = require("../service/mail-sevice");

class MailController {
  async sendEmail(req, res, next) {
    try {
      const { tomail } = req.body;
      const data = await mailService.sendDailyMail(tomail);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MailController();
