const express = require("express");
const router = express.Router();
const {
  addMessage,
  getAllMessage,
} = require("../controllers/messageController");

router.route("/addMessage").post(addMessage);
router.route("/getAllMessage").post(getAllMessage);

module.exports = router;
