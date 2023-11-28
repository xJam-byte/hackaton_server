const mailService = require("../service/mail-sevice");

class MailController {
  async sendEmail(req, res, next) {
    try {
      const { toemail } = req.body;
      const data = await mailService.sendDailyMail(toemail);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MailController();
