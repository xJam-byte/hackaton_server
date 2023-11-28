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
          content: content,
        },
      ],
      model: "gpt-3.5-turbo",
    });
    // console.log(completion);
    // console.log(candidate.name);
    return completion.choices[0].message.content;
    // return candidate.apiKey;
  }
}
module.exports = new OpenAiService();
