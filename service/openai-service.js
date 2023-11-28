const openai = require("openai");
const apiModel = require("../models/openai-model");
const candidate = apiModel.findOne({ name: "openai" });
const openai2 = new openai({
  apiKey: "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",
});
class OpenAiService {
  async sendRequest(role, content) {
    const completion = await openai2.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Ты квалифицированный психолог помогающий наркозависимым ",
        },
        {
          role: role,
          content: content + "(максимум 50 слов)",
        },
      ],
      model: "gpt-3.5-turbo",
    });
    return completion.choices[0].message.content;
  }
}
module.exports = new OpenAiService();
