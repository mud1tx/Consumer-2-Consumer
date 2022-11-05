const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const adminRoutes = require("./routes/admin");

app.get("/", (req, res) => {
  res.send("hello from root side");
});

app.use("/admin", adminRoutes);

mongoose
  .connect(
    "mongodb+srv://Mudit:firstbest@cluster0.e7bmssl.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(5000);
    console.log("listening at port 5000");
  })
  .catch((err) => {
    console.log(err);
  });
