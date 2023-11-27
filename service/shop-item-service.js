const ItemModel = require("../models/shop-item-model");
// const bcrypt = require("bcrypt");
// const uuid = require("uuid");
// const mailService = require("../service/mail-sevice");
// const tokenService = require("./token-service");
// const UserDto = require("../dtos/user-dto");
// const ApiError = require("../exceptions/api-error");

class ShopItemService {
  async addItem(name, image, description, price) {
    const item = await ItemModel.create({
      name: name,
      image: image,
      description: description,
      price: price,
    });
    return item;
  }
  async getAllItems() {
    const items = await ItemModel.find();
    console.log(items);
    return items;
  }
}
module.exports = new ShopItemService();
