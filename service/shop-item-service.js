const ItemModel = require("../models/shop-item-model");
// const bcrypt = require("bcrypt");
// const uuid = require("uuid");
// const mailService = require("../service/mail-sevice");
// const tokenService = require("./token-service");
// const UserDto = require("../dtos/user-dto");
// const ApiError = require("../exceptions/api-error");

class ShopItemService {
  async addItem(name, image, description, price, type, count) {
    const item = await ItemModel.create({
      name: name,
      image: image,
      description: description,
      price: price,
      type: type,
      count: count,
    });
    return item;
  }

  async removeItem(name, newcount) {
    const beforeItem = await ItemModel.findOne({ name });

    const updateItem = await ItemModel.updateOne(
      { name },
      { count: beforeItem.count - newcount }
    );
    const candidate = await ItemModel.findOne({ name });
    return candidate;
  }

  async getAllItems() {
    const items = await ItemModel.find();
    console.log(items);
    return items;
  }
}
module.exports = new ShopItemService();
