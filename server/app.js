const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cors = require("cors");
const Product = require("./models/products");
const User = require("./models/user");

// mongodb+srv://Mudit:firstbest@cluster0.e7bmssl.mongodb.net/shop?retryWrites=true&w=majority
const MONGODB_URI =
  "mongodb+srv://Mudit:firstbest@cluster0.e7bmssl.mongodb.net/shop";

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

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

const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

app.use((req, res, next) => {
  User.findById("636e9d0592d063470b9e2265")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(authRoutes);
app.use("/", async (req, res, next) => {
  const allAddedProducts = await Product.find();
  res.send(allAddedProducts);
});

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(5000);
    console.log("listening at port 5000");
  })
  .catch((err) => {
    console.log(err);
  });
