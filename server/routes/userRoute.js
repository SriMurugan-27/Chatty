const express = require("express");
const { panel } = require("../controllers/userController");
const router = express.Router();

router.route("/register").post(panel.register);
router.route("/login").post(panel.login);
router.route("/setAvatar/:id").post(panel.setAvatar);
router.route("/getAllUsers/:id").get(panel.getAllUser);

module.exports = router;
