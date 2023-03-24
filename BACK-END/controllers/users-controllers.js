const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const userModel = require("../models/user-model");

const getAllUsers = async (req, res, next) => {
  const usersByPlaces = await userModel
    .find({}, "-password")
    .populate("places");
  if (!usersByPlaces) {
    return next(new HttpError("there is no user found ", 404));
  }
  res.json({ users: usersByPlaces });
};

const userSingup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("your input Data is invalid", 422));
  }
  const { name, email, password } = req.body;
  let existUser;
  try {
    existUser = await userModel.findOne({ email });
  } catch (error) {
    return next(new HttpError("signup faild,try again later", 500));
  }
  if (existUser) {
    return next(
      new HttpError(
        "your userEmail is exist , try another email or sign in",
        422
      )
    );
  }

  const newUser = new userModel({
    email,
    name,
    password,
    places: [],
  });

  try {
    await newUser.save();
  } catch (error) {
    return next(new HttpError("signup faild,try again later", 500));
  }
  res.status(201).json({ user: newUser, message: "signUp successfully" });
};

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  let existUser;
  try {
    existUser = await userModel.findOne({ email });
  } catch (error) {
    return next(new HttpError("could not login ", 500));
  }

  if (!existUser) {
    return next(new HttpError("your userEmail is invalid", 401));
  }
  if (existUser.password !== password) {
    return next(new HttpError("your userPasswoerd is invalid", 401));
  }
  res.json({
    user: existUser.toObject({ getters: true }),
    message: "logged In...",
  });
};

exports.userLogin = userLogin;
exports.getAllUsers = getAllUsers;
exports.userSingup = userSingup;
