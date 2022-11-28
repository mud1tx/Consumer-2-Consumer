const crypto = require("crypto");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const User = require("../models/user");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { validationResult } = require("express-validator");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        // "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",
        // "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",
        process.env.SENDGRID_API_KEY,
    },
  })
);

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      ok: false,
      message: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.json({
          ok: false,
          message: "User does not exists",
          validationErrors: [],
        });
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            return res.json({ ok: true, user, isLoggedIn: true });
          }
          res.json({
            ok: false,
            message: "Error !! Invalid email or password.",
            validationErrors: [],
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log(errors.array()[0].msg);
    return res.json({
      ok: false,
      message: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }
  // User.findOne({ email: email })
  //   .then((userDoc) => {
  //     if (userDoc) {
  //       return res.json({
  //         ok: false,
  //         message: "error E-Mail exists already, please pick a different one.",
  //       });
  //     }
  bcrypt
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
            console.log({ ok: false, message: err });
          }
          // console.log(res);
        }
      );
    })
    .catch((err) => {
      console.log(err);
      res.json({ ok: false, message: err });
    });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.json({ ok: false, message: "Some error occured" });
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return res.json({
            ok: false,
            message: "No account with that email found",
          });
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then((result) => {
        res.json({ ok: true, message: "Successfull" });
        return transporter.sendMail(
          {
            to: req.body.email,
            from: "c2c16@outlook.com",
            subject: "Password Reset",
            html: `<p>You requested a password reset</p>
            <p>Click this <a href="http://localhost:3000/new-password/${token}">link</a> to set a new password.</p>`,
          },
          function (err, res) {
            if (err) {
              console.log(err);
            }
            console.log(res);
          }
        );
      })
      .catch((err) => console.log(err));
  });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then((user) => {
      res.json({ ok: true, userId: user._id.toString(), passwordToken: token });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.newPassword;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  console.log(newPassword, userId, passwordToken);
  let resetUser;

  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId,
  })
    .then((user) => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then((hashedPassword) => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then((result) => {
      res.json({ ok: true, message: "Password change successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.json({ ok: false, message: `Some error occured` });
    });
};

exports.postLogout = (req, res, next) => {
  res.json({ ok: true, isLoggedIn: false });
};
