module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    // console.log("isAuth", req.session.isLoggedIn);
    return res.redirect("/login");
  }
  // console.log("isAuth2", req.session.isLoggedIn);
  next();
};
