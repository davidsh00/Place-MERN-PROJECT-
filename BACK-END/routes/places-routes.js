const express = require("express");
const { check } = require("express-validator");

const placesControllers = require("../controllers/places-controllers");

const route = express.Router();

route.get("/:pid", placesControllers.getPlaceById);
route.get("/users/:uid", placesControllers.getUserPlaces);
route.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ max: 500, min: 2 }),
    check("address").not().isEmpty(),
  ],
  placesControllers.createPlace
);
route.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").not().isEmpty()],
  placesControllers.updatePlace
);
route.delete("/:pid", placesControllers.removePlace);

module.exports = route;
