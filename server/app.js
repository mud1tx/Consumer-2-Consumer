const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
