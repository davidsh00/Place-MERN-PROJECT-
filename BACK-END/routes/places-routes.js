const express = require("express");
const { check } = require("express-validator");

const placesControllers = require("../controllers/places-controllers");
const fileUpload = require("../middleware/file-upload");

const route = express.Router();

route.get("/:pid", placesControllers.getPlaceById);
route.get("/users/:uid", placesControllers.getUserPlaces);
route.post(
  "/",
  fileUpload.single("image"),
  [
    check("title").not().isEmpty(),
    check("description").isLength({ max: 500, min: 2 }),
    check("address").not().isEmpty(),
  ],
  placesControllers.createPlace
);
route.patch(
  "/:pid",
  fileUpload.single("image"),
  [check("title").not().isEmpty(), check("description").not().isEmpty()],
  placesControllers.updatePlace
);
route.delete("/:pid", placesControllers.removePlace);

module.exports = route;
