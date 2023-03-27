const express = require("express");
const { check } = require("express-validator");
const fileUpload = require("../middleware/file-upload");
const route = express.Router();

const usersControllers = require("../controllers/users-controllers");
route.get("/", usersControllers.getAllUsers);
route.post("/login", usersControllers.userLogin);
route.post(
  "/signup",
  fileUpload.single("image"),
  [
    check("email").isEmail(),
    check("name").isLength({ min: 3, max: 20 }),
    check("password").isLength({ min: 6, max: 12 }),
  ],
  usersControllers.userSingup
);

module.exports = route;
