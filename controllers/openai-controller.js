const openai = require("../service/openai-service");

class OpenAiController {
  async sendRequest(req, res, next) {
    try {
      const { role, content } = req.body;
      const aiData = await openai.sendRequest(role, content);
      return res.json(aiData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OpenAiController();
