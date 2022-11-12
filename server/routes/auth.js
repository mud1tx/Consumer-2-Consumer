const express = require("express");

const authController = require("../controllers/auth");

// console.log(authController)

const router = express.Router();

// router.get("/login", authController.getLogin);

// router.get("/signup", authController.getSignup);

// router.post("/login", authController.postLogin);

router.post("/signup", authController.postSignup);

// router.post("/logout", authController.postLogout);

module.exports = router;
