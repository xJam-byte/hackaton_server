const openai = require("openai");
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
    return completion.choices[0].message.content;
  }
}
module.exports = new OpenAiService();
