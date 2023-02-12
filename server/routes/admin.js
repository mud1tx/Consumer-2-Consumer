const express = require("express");

const adminController = require("../controllers/admin");

const store = require("../util/multer");
const upload = require("../util/multer");
const compress = require("../util/sharp");

const router = express.Router();

router.post(
  "/add-product",
  // store.array("images", 12),
  upload,
  compress,
  adminController.postAddProduct
);

router.post("/products", adminController.getProducts);

router.post("/orders", adminController.postOrderData);

router.get("/orders", adminController.getOrderData);

router.post("/lend", adminController.postLendData);

router.post("/borrow", adminController.postBorrowData);

router.post("/checkout", adminController.getCheckout);

router.post("/chats", adminController.accessChat);

router.get("/chats", adminController.fetchChats);

router.get("/message/:chatId", adminController.allMessages);

router.post("/message", adminController.sendMessage);

module.exports = router;
