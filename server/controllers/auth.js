const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const User = require("../models/user");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.json({ ok: false, message: "User does not exists" });
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            // req.session.isLoggedIn = true;
            // req.session.user = user;
            // req.session.save((err) => {
            //   if (err) {
            //     console.log(err);
            //   }
            // });
            // console.log("nahi yaar", req.session);
            // let data = req.session;
            return res.json({ ok: true, user, isLoggedIn: true });
          }
          res.json({
            ok: false,
            message: "Error !! Invalid email or password.",
          });
        })
        .catch((err) => {
          console.log(err);
          res.json({ ok: false, message: "Error" });
        });
    })
    .catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const firstname = req.body.first_name;
  const lastname = req.body.last_name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        return res.json({
          ok: false,
          message: "error E-Mail exists already, please pick a different one.",
        });
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            first_name: firstname,
            last_name: lastname,
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then((result) => {
          res.json({ ok: true, message: "Successfull" });
          return transporter.sendMail(
            {
              to: email,
              from: "c2c16@outlook.com",
              subject: "Signup succeeded",
              html: "<h1>You successfully signed up!</h1>",
            },
            function (err, res) {
              if (err) {
                console.log(err);
              }
              console.log(res);
            }
          );
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  // console.log("nahi yaar", req.session);
  // req.session.destroy((err) => {
  //   console.log(err);
  //   res.redirect("/");
  // });
  res.json({ ok: true, isLoggedIn: false });
};
