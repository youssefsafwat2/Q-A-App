const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
// log in , sign up , forgot password, reset password

router.route("/signup").post(authController.signup);

router.route("/login").post(authController.login);

router.route("/forgot-password").post(authController.forgotPassword);
router.route("/reset-password/:token").patch(authController.resetPassword);
router
  .route("/update-password")
  .patch(authMiddleware.protect, authController.updatePassword);

router.route("/logout").get(authController.logout);
module.exports = router;
