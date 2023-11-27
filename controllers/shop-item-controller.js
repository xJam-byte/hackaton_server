const shopItemService = require("../service/shop-item-service");
const { validationResult } = require("express-validator");
const ApiErrors = require("../exceptions/api-error");
class ShopItemController {
  async addItem(req, res, next) {
    try {
      const { name, image, description, price, type } = req.body;

      const itemData = shopItemService.addItem(name, image, description, price);

      return res.json(itemData);
    } catch (e) {
      next(e);
    }
  }

  async getItems(req, res, next) {
    try {
      const items = await shopItemService.getAllItems();
      console.log("this is item controller ");
      return res.json(items);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ShopItemController();
