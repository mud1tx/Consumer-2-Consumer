const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const User = require("../models/user");
const sendgridTransport = require("nodemailer-sendgrid-transport");
// const jwt = require("jsonwebtoken");

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
        // req.flash("error", "Invalid email or password.");
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          }
        //   req.flash("error", "Invalid email or password.");
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
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
        req.flash(
          "error",
          "E-Mail exists already, please pick a different one."
        );
        return res.redirect("/signup");
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
          res.redirect("/login");
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

// exports.postSignup = (req, res, next) => {
//   // const firstname = req.body.first_name;
//   // const lastname = req.body.last_name;
//   // const email = req.body.email;
//   // const password = req.body.password;
//   // const confirmPassword = req.body.confirmPassword;
//   try {
//     const { first_name, last_name, email, password, confirmPassword } =
//       req.body;
//     // console.log(first_name, last_name, email, password);
//     User.findOne({ email: email }).then((userDoc) => {
//       if (userDoc) {
//         req.flash(
//           "error",
//           "E-Mail exists already, please pick a different one."
//         );
//         return res.redirect("/signup");
//       }
//     });
//     const user = new User({
//       first_name: first_name,
//       last_name: last_name,
//       email: email,
//       password: password,
//       cart: { items: [] },
//     });
//     user.save();
    // const token = createToken(user._id);
    // res.cookie("jwt", token, {
    //   withCredentials: true,
    //   httpOnly: false,
    //   maxAge: maxAge * 1000,
    // });
//     res.status(201).json({ user: user._id, created: true });
//     // transporter.sendMail(
//     //   {
//     //     to: email,
//     //     from: "c2c16@outlook.com",
//     //     subject: "Signup succeeded",
//     //     html: "<h1>You successfully signed up!</h1>",
//     //   },
//     //   function (err, res) {
//     //     if (err) {
//     //       console.log(err);
//     //     }
//     //     console.log(res);
//     //   }
//     // );
//   } catch (err) {
//     console.log(err);
//     const errors = handleErrors(err);
//     res.json({ errors, created: false });
//   }
// };

exports.postLogin = (req, res, next) => {
  // const email = req.body.email;
  // const password = req.body.password;
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid email or password.");
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            // console.log("start", req.session);
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          }
          req.flash("error", "Invalid email or password.");
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
};

exports.getLogin = (req, res, next) => {
  // console.log("req from other side", checker);
  // console.log("karo yaar", res.locals);
  res.send(JSON.stringify(req.session));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
