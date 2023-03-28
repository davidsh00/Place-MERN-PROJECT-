const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");
const userModel = require("../models/user-model");

const getAllUsers = async (req, res, next) => {
  const usersByPlaces = await userModel
    .find({}, "-password")
    .populate("places");
  if (!usersByPlaces) {
    return next(new HttpError("there is no user found ", 404));
  }
  res.json({
    users: usersByPlaces.map((user) => user.toObject({ getters: true })),
  });
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

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return next(new HttpError("could not signup ", 500));
  }
  const newUser = new userModel({
    email,
    name,
    password: hashedPassword,
    places: [],
    image: req.file.path,
  });

  let token;
  try {
    token = jwt.sign({ userId: newUser.id, email }, "Dont share with anyOne", {
      expiresIn: "1h",
    });
  } catch (error) {
    return next(new HttpError("could not signup ", 500));
  }
  try {
    await newUser.save();
  } catch (error) {
    return next(new HttpError("signup faild,try again later", 500));
  }

  res.status(201).json({
    user: { email: newUser.email, name: newUser.name, id: newUser.id, token },
  });
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
  let isValidPassword;

  try {
    isValidPassword = await bcrypt.compare(password, existUser.password);
  } catch (error) {
    return next(new HttpError("could not login ", 500));
  }
  if (!isValidPassword) {
    return next(new HttpError("your userPasswoerd is invalid", 401));
  }
  let token;
  try {
    token = jwt.sign(
      { userId: existUser.id, email: existUser.email },
      "Dont share with anyOne",
      {
        expiresIn: "1h",
      }
    );
  } catch (error) {
    return next(new HttpError("could not logging in ", 500));
  }

  res.json({
    user: {
      email: existUser.email,
      name: existUser.name,
      id: existUser.id,
      token,
    },
    expiresToken: Date.now() + 1000 * 60 * 60,
  });
};

exports.userLogin = userLogin;
exports.getAllUsers = getAllUsers;
exports.userSingup = userSingup;
