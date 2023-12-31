const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const mailController = require("../controllers/mail-controller");
const openaiController = require("../controllers/openai-controller");
const router = new Router();
const shopItemController = require("../controllers/shop-item-controller");
const { body } = require("express-validator");
const authMiddleware = require("../middlewears/auth-middleware");

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);
router.get("/shopItems", shopItemController.getItems);
router.post("/addItems", shopItemController.addItem);
router.post("/subscribe", userController.subscribe);
router.post("/addPoints", userController.gainPoints);
router.post("/substractPoints", userController.substractPoints);
router.post("/removeItem", shopItemController.removeItem);
router.post("/sendDaily", mailController.sendEmail);
router.post("/sendToAi", openaiController.sendRequest);
router.post("/buyItem", userController.buyItem);
router.get("/seminars");
router.get("/contactUs");
router.get("/material");

module.exports = router;
