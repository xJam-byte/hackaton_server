const userService = require("../service/user-service");
const { validationResult } = require("express-validator");
const ApiErrors = require("../exceptions/api-error");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiErrors.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      const {
        name,
        surname,
        email,
        password,
        points,
        isAddicted,
        role,
        subscribtion,
      } = req.body;
      const userData = await userService.registration(
        name,
        surname,
        email,
        password,
        points,
        isAddicted,
        role,
        subscribtion
      );
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async buyItem(req, res, next) {
    try {
      const { email, itemName, itemCost, buycount } = req.body;
      const items = await userService.buyItem(
        email,
        itemName,
        itemCost,
        buycount
      );
      return res.json(items);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async subscribe(req, res, next) {
    try {
      const { typeOfSubscribtion, email } = req.body;
      const data = await userService.subscribe(typeOfSubscribtion, email);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async gainPoints(req, res, next) {
    try {
      const { newPoints, email } = req.body;
      const data = await userService.addPoints(newPoints, email);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async substractPoints(req, res, next) {
    try {
      const { subPoints, email } = req.body;
      const data = await userService.substractPoints(subPoints, email);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }
  async activate(req, res, next) {
    try {
    } catch (e) {
      next(e);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
