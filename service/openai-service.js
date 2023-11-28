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
    console.log(completion);
    console.log(candidate);
    return completion.choices[0].message.content;
    // return candidate.apiKey;
  }
}
module.exports = new OpenAiService();
