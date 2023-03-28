const express = require("express");
const { check } = require("express-validator");
const { upload } = require("../middleware/file-upload");
const router = express.Router();

const usersControllers = require("../controllers/users-controllers");
router.get("/", usersControllers.getAllUsers);
router.post("/login", usersControllers.userLogin);
router.post(
  "/signup",
  upload("users").single("image"),
  [
    check("email").isEmail(),
    check("name").isLength({ min: 3, max: 20 }),
    check("password").isLength({ min: 6, max: 12 }),
  ],
  usersControllers.userSingup
);

module.exports = router;
