const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const { protect, restrictTo } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(userController.getAllUsers).post();
