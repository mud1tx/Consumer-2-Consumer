require("dotenv").config();
const express = require("express");
const cors = require("cors");
const User = require("./models/user");
const Product = require("./models/products");
const connectDB = require("./config/connectDB");
const PORT = process.env.PORT || 5000;
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

connectDB();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000", 
    method: ["GET", "POST"],
    credentials: true,
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
                    prod.borrowedUserId = null;
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
                    prod.borrowedUserId = null;
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

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  // add new User
  socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("New User Connected", activeUsers);
    }
    // send all active users to new user
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnect", () => {
    // remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected", activeUsers);
    // send all active users to all users
    io.emit("get-users", activeUsers);
  });

  // send message to a specific user
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log("Sending from socket to :", receiverId);
    console.log("Data: ", data);
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });
});