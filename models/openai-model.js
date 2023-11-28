const { Schema, model } = require("mongoose");

const OpenAiSchema = new Schema({
  name: { type: String, require: true },
  apiKey: { type: String, require: true },
});

module.exports = model("OpenAi", OpenAiSchema);
