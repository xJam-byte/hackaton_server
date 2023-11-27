const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, require: true },
  surname: { type: String, require: true },
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  points: { type: Number },
  isAddicted: { type: Boolean, require: true },
  role: { type: String, require: true },
  subscribtion: { type: String, require: true },
  IsActivated: { type: Boolean, default: false },
  activationLink: { type: String },
});

module.exports = model("User", UserSchema);
