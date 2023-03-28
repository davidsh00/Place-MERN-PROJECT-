const HttpError = require("../models/http-error");
const jwt = require("jsonwebtoken");
const checkAuth = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authentication failed");
    }

    const tokenDecoded = jwt.verify(token, "Dont share with anyOne");
    req.userData = { userId: tokenDecoded.userId };
    next();
  } catch (error) {
    return next(new HttpError("Authentication failed", 401));
  }
};
module.exports = checkAuth;
