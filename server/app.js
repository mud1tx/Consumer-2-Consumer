const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");
const cors = require("cors");
const Product = require("./models/products");
const User = require("./models/user");
const cookieParser = require("cookie-parser");

// const isAuth = require("../middleware/is_auth");
// mongodb+srv://Mudit:firstbest@cluster0.e7bmssl.mongodb.net/shop?retryWrites=true&w=majority
const MONGODB_URI =
  "mongodb+srv://Mudit:firstbest@cluster0.e7bmssl.mongodb.net/shop";

// const csrfProtection = csrf({});

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
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      // console.log("reQ", req.session);
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});


app.use("/admin", adminRoutes);
app.use(authRoutes);
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});
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
