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
  // convert images into base64 encoding
  // let imgArray = images.map((file) => {
  //   let img = fs.readFileSync(file.path);
  //   return (en = img.toString("base64"));
  // });
  // const imageArray = [];
  // const imageTypeArray = [];
  // const imageNameArray = [];
  // imgArray.map((src, index) => {
  //   imageNameArray.push(images[index].originalname);
  //   imageTypeArray.push(images[index].mimetype);
  //   imageArray.push(src);
  // });
  const imagess = req.body.images.map((image) => new Image(image));
  // console.log("lksmdmkl", imagess);
  console.log("imagesdhfjknbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", imagess);
  const product = new Product({
    title: title,
    category: category,
    // imageName: imageNameArray,
    // imageType: imageTypeArray,
    image: imagess,
    price: price,
    description: description,
    userId: userId,
    borrowed: false,
  });
  product
    .save()
    .then((result) => {
      console.log("Created Product");
      console.log("imagesdhfjknbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", result);
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
      console.log("ksadjnfkjsfnnkjdf", products);
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
  console.log(userId, productData.userId, days);
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
  console.log("df;l,g,kl;dmglkdsm", prodData);
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

exports.accessChat = async (req, res, next) => {
  const currentUserId = req.body.senderId;
  const userId = req.body.receiverId;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: currentUserId } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "first_name last_name email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [currentUserId, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.json({ ok: true, data: FullChat });
    } catch (error) {
      res.json({ ok: false, msg: "Conversation already created" });
    }
  }
};

exports.fetchChats = async (req, res, next) => {
  const currentUserId = req.headers.currentuserid;
  try {
    Chat.find({ users: { $elemMatch: { $eq: currentUserId } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "first_name last_name email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

exports.allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "first_name last_name email")
      .populate("chat");
    res.send(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

exports.sendMessage = async (req, res) => {
  const { currentUserId, content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: currentUserId,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "first_name last_name email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};
