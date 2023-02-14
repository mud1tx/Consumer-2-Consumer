const path = require("path");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cors = require("cors");
const User = require("./models/user");
const Product = require("./models/products");
const connectDB = require("./config/connectDB");
const stripe = require("./routes/stripe");
// const stripe = require("stripe")(process.env.STRIPE_KEY_SERVER);
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL;
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

connectDB();
const app = express();
// app.use(express.json());

app.use(
  cors({
    origin: "https://consumer-2-consumer.vercel.app",
    method: ["GET", "POST"],
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "5mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

User.find()
  .then((user) => {
    for (let i = 0; i < user.length; i++) {
      if (user[i].lend?.length > 0) {
        User.findOne({ _id: user[i]._id })
          .then((us) => {
            for (let i = 0; i < us.lend.length; i++) {
              if (us.lend[i].expire < Date.now()) {
                Product.findOne({ _id: us.lend[i].productId })
                  .then((prod) => {
                    prod.borrowed = false;
                    prod.save();
                    return;
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                us.lend.splice(i, 1);
              }
            }
            us.save();
          })
          .catch((err) => console.log(err));
      }
      if (user[i].borrow?.length > 0) {
        User.findOne({ _id: user[i]._id })
          .then((us) => {
            for (let i = 0; i < us.borrow.length; i++) {
              if (us.borrow[i].expire < Date.now()) {
                Product.findOne({ _id: us.borrow[i].productId })
                  .then((prod) => {
                    prod.borrowed = false;
                    prod.save();
                    return;
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                us.borrow.splice(i, 1);
              }
            }
            us.save();
          })
          .catch((err) => console.log(err));
      }
    }
    return;
  })
  .catch((err) => console.log(err));

app.use("/admin", adminRoutes);
app.use(authRoutes);
app.use(shopRoutes);
app.use("/payment", stripe);

// const __dirname1 = path.resolve();

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname1, "/client/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running..");
//   });
// }

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);

// mongoose
//   .connect(process.env.MONGODB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then((result) => {
//     server;
//     console.log(`listening at port ${PORT}`);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://consumer-2-consumer.vercel.app",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    console.log("kya aaya hai user se", userData?.user?._id);
    socket.join(userData?.user?._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
