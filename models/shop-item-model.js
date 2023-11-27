const { Schema, model } = require("mongoose");

const ShopItemSchema = new Schema({
  name: { type: String, require: true },
  image: { type: String },
  description: { type: String },
  price: { type: String, require: true },
  type: { type: String, require: true },
  count: { type: Number, require: true },
});

module.exports = model("ShopItem", ShopItemSchema);
