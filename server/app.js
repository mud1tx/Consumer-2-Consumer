const path = require("path");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const cors = require("cors");
const User = require("./models/user");
const Order = require("./models/order");
const Product = require("./models/products");

const MONGODB_URI =
  "mongodb+srv://Mudit:firstbest@cluster0.e7bmssl.mongodb.net/shop";

const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});
app.use(
  cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
    credentials: true,
  })
);

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  User.find()
    .then((user) => {
      if (user.lend?.length > 0) {
        const lendArray = user.lend.filter((lendData) => {
          if (lendData.expire > Date.now()) {
            Product.findOne({ _id: lendData.productId })
              .then((prod) => {
                return prod.borrowed = false;
              })
              .catch((err) => {
                console.log(err);
              });
            return lendData;
          }
        });
        user.lend = lendArray;
      }
      if (user.borrow?.length > 0) {
        const borrowArray = user.borrow.filter((borrowData) => {
          if (borrowData.expire > Date.now()) {
            Product.findOne({ _id: borrowData.productId })
              .then((prod) => {
                return prod.borrowed = false;
              })
              .catch((err) => {
                console.log(err);
              });
            return borrowData;
          }
        });
        user.borrow = borrowArray;
      }
    })
    .catch((err) => console.log(err));
  next();
});

// app.use(csrfProtection);

// app.use((req, res, next) => {
//   if (!req.session.user) {
//     return next();
//   }
//   User.findById(req.session.user._id)
//     .then((user) => {
//       req.user = user;
//       next();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

app.use("/admin", adminRoutes);
app.use(authRoutes);
app.use(shopRoutes);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(5000);
    console.log("listening at port 5000");
  })
  .catch((err) => {
    console.log(err);
  });
