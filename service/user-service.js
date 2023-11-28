const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");
const userModel = require("../models/user-model");
const shopItemService = require("./shop-item-service");

class UserService {
  async registration(
    name,
    surname,
    email,
    password,
    points,
    isAddicted,
    role,
    subscribtion
  ) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await UserModel.create({
      name,
      surname,
      email,
      password: hashPassword,
      points,
      isAddicted,
      role,
      subscribtion,
      activationLink,
    });
    //await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  // async addPoints(newpoints, email) {
  //   const user = await UserModel.updateOne(
  //     { email: email },
  //     { points: newpoints }
  //   );
  //   const candidate = await userModel.findOne({ email });
  //   return candidate;
  // }

  // async removeItem(name, newcount) {
  //   const beforeItem = await ItemModel.findOne({ name });

  //   const updateItem = await ItemModel.updateOne(
  //     { name },
  //     { count: beforeItem.count - newcount }
  //   );
  //   const candidate = await ItemModel.findOne({ name });
  //   return candidate;
  // }

  async buyItem({ email, itemName, itemCost, icount = 1 }) {
    const data = await shopItemService.removeItem(itemName, icount);
    const beforeUser = await UserModel.findOne({ email });
    const newpoints = beforeUser.points - itemCost;
    console.log(itemCost);
    console.log(newpoints);
    if (beforeUser.points < itemCost) {
      return "недостаточно средств!";
    } else {
      const user = await UserModel.updateOne({
        email: email,
        points: newpoints,
      });
      return "Товар был куплен успешно";
    }
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async subscribe(type, email) {
    const user = await UserModel.updateOne(
      { email: email },
      { subscribtion: type }
    );
    const candidate = await userModel.findOne({ email });
    return candidate;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError();
    }
    const user = UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async addPoints(newpoints, email) {
    const user = await UserModel.updateOne(
      { email: email },
      { points: newpoints }
    );
    const candidate = await userModel.findOne({ email });
    return candidate;
  }

  async substractPoints(subpoints, email) {
    const userbefore = await UserModel.findOne({ email: email });
    const user = await UserModel.updateOne(
      { email: email },
      { points: userbefore.points - subpoints }
    );
    const candidate = await userModel.findOne({ email });
    return candidate;
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }
}
module.exports = new UserService();
