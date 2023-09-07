const Product = require("../models/products");
const Order = require("../models/order");
const User = require("../models/user");
const Message = require("../models/message");
const Chat = require("../models/chat");
const stripe = require("stripe")(process.env.STRIPE_KEY_SERVER);
const mongoose = require("mongoose");
const Image = mongoose.model("Image", {
  data: Buffer,
});

// const idempotencyKey = uuid();

exports.postAddProduct = async (req, res, next) => {
  const title = req.body.title;
  const category = req.body.category;
  const images = req.files;
  const price = req.body.price;
  const description = req.body.description;
  const userId = req.body.userId;
  if (!images) {
    const error = new Error("Please choose files");
    error.httpStatusCode = 400;
    return next(error);
  }
  const imagess = req.body.images.map((image) => new Image(image));
  const product = new Product({
    title: title,
    category: category,
    image: imagess,
    price: price,
    description: description,
    userId: userId,
    borrowed: false,
  });
  product
    .save()
    .then((result) => {
      res.json({ ok: true, message: "Product Added Successfully🙂" });
    })
    .catch((err) => {
      console.log(err);
      res.json({ ok: true, message: "Some Error Occured!!" });
    });
};

exports.getProducts = (req, res, next) => {
  Product.find({ userId: req.body.userId })
    .then((products) => {
      return res.json({ ok: true, userProducts: products });
    })
    .catch((err) => console.log(err));
};

exports.postOrderData = (req, res, next) => {
  const userId = req.body.userId;
  const productData = req.body.prodData;
  const days = Number(req.body.days);
  const currentTime = Date.now();
  const prodId = productData._id;
  Order.findOne({ userId: userId }).then((user) => {
    if (!user) {
      const prodArray = [];
      prodArray.push({
        productId: productData._id,
        expire: currentTime + days * 24 * 60 * 60 * 1000,
      });
      const order = new Order({
        products: prodArray,
        userId: userId,
      });
      order.save();
      Product.findOne({ _id: prodId })
        .then((prod) => {
          prod.borrowed = true;
          prod.borrowedUserId = userId;
          return prod.save();
        })
        .catch((err) => {
          console.log(err);
        });
      const borrowArray = [];
      const lendArray = [];
      borrowArray.push({
        productId: productData._id,
        expire: currentTime + days * 24 * 60 * 60 * 1000,
      });
      lendArray.push({
        productId: productData._id,
        expire: currentTime + days * 24 * 60 * 60 * 1000,
      });
      User.findOne({ _id: userId })
        .then((user) => {
          user.borrow = borrowArray;
          return user.save();
        })
        .catch((err) => {
          console.log(err);
        });
      const productOwnerId = productData.userId;
      User.findOne({ _id: productOwnerId })
        .then((user) => {
          user.lend = lendArray;
          return user.save();
        })
        .catch((err) => {
          console.log(err);
        });
      return res.json({ ok: true, message: "data aa gaya yaar pehle baar" });
    } else {
      user.products.push({
        productId: productData._id,
        expire: currentTime + days * 24 * 60 * 60 * 1000,
      });
      user.save();
      Product.findOne({ _id: prodId })
        .then((prod) => {
          prod.borrowed = true;
          prod.borrowedUserId = userId;
          return prod.save();
        })
        .catch((err) => {
          console.log(err);
        });
      User.findOne({ _id: userId })
        .then((user) => {
          user.borrow.push({
            productId: productData._id,
            expire: currentTime + days * 24 * 60 * 60 * 1000,
          });
          return user.save();
        })
        .catch((err) => {
          console.log(err);
        });
      const productOwnerId = productData.userId;
      User.findOne({ _id: productOwnerId })
        .then((user) => {
          user.lend.push({
            productId: productData._id,
            expire: currentTime + days * 24 * 60 * 60 * 1000,
          });
          return user.save();
        })
        .catch((err) => {
          console.log(err);
        });
      return res.json({ ok: true, message: "data aa gaya yaar doosre baar" });
    }
  });
  return;
};

exports.getCheckout = (req, res, next) => {
  const { token, prodData, days } = req.body;
  stripe.checkout.sessions
    .create({
      payment_method_types: ["card"],
      line_items: [
        {
          name: prodData.title,
          currency: "inr",
          amount: prodData.price * days * 100,
          quantity: 1,
        },
      ],
      success_url: req.protocol + "://" + req.get("host") + "/orders",
      cancel_url: req.protocol + "://" + req.get("host") + "/",
    })
    .then((session) => {
      return res.json({ ok: true, sessionId: session.id });
    })
    .catch((err) => console.log(err));
};

exports.getOrderData = async (req, res, next) => {
  const currentUserId = req.headers.currentuserid;
  try {
    var isOrder = await Order.find({ userId: currentUserId })
      .populate({
        path: "products.productId",
        model: "Product",
        populate: { path: "userId", model: "User" },
      })
      .populate("userId");
    if (isOrder) {
      res.json({ ok: true, data: isOrder });
    } else {
      res.json({ ok: false, msg: "No Order Placed" });
    }
  } catch (err) {
    console.log(err);
    res.json({ ok: false, msg: err });
  }
};

exports.postLendData = async (req, res, next) => {
  const userId = req.body.userId;
  User.findOne({ _id: userId })
    .then(async (user) => {
      if (user.lend.length === 0) {
        return res.json({ ok: false, msg: "No product is lended to anyone" });
      }
      try {
        var islendProduct = await Product.find({
          userId: userId,
          borrowed: true,
        })
          .populate({
            path: "borrowedUserId",
            model: "Product",
            populate: { path: "borrowedUserId", model: "User" },
          })
          .populate("borrowedUserId");
        if (islendProduct) {
          res.json({ ok: true, data: islendProduct });
        }
      } catch (err) {
        console.log(err);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postBorrowData = async (req, res, next) => {
  const userId = req.body.userId;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.json({ ok: false, msg: "No Item is Borrowed" });
      }
      user
        .populate("borrow.productId")
        .then((user) => {
          const products = user.borrow;
          return res.json({
            ok: true,
            data: products,
          });
        })
        .catch((err) => {
          console.log(err);
          res.json({ ok: false, msg: err });
        });
    })
    .catch((err) => {
      console.log(err);
      res.json({ ok: false, msg: err });
    });
};

/////////////////////////////////////////////////////////////////

exports.createChat = async (req, res) => {
  const chat = await Chat.find({
    $or: [
      { members: [req.body.senderId, req.body.receiverId] },
      { members: [req.body.receiverId, req.body.senderId] },
    ],
  });
  if (chat.length) {
    return res.status(201).json("Already present in chatBox");
  }
  const newChat = new Chat({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.userChats = async (req, res) => {
  try {
    const chat = await Chat.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.findChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body.message;
  const message = new Message({
    chatId,
    senderId,
    text,
  });
  try {
    const result = await message.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const result = await Message.find({ chatId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await User.findOne({ _id: userId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
