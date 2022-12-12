const express = require("express");

const adminController = require("../controllers/admin");

const store = require("../util/multer");

const router = express.Router();

router.post(
  "/add-product",
  store.array("images", 12),
  adminController.postAddProduct
);

router.post("/products", adminController.getProducts);

router.post("/orders", adminController.postOrderData);

router.post("/lend", adminController.postLendData);

router.post("/borrow", adminController.postBorrowData);

router.get("/chatUser/:friendId", adminController.getFriendId);

router.post("/conversation", adminController.postNewConv);

router.get("/conversation/:userId", adminController.getUserConv);

router.post("/message/chat", adminController.postChatData);

router.get("/messages/:conversationId", adminController.getChatData);

module.exports = router;
