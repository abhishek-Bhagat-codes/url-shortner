const { checkLoginUser } = require("../services/auth.js");

const checkIsLoginOrNot = (req, res, next) => {
  const sessionId = req.cookies.sessionId;
  if (!sessionId) return res.redirect("/user/login");

  const user = checkLoginUser(sessionId); 
  if (!user) {
    res.clearCookie("sessionId");
    return res.redirect("/user/login");
  }

  req.user = user;
  next();
};

module.exports = { checkIsLoginOrNot };
