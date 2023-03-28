const express = require("express");
const { check } = require("express-validator");
const checkAuth = require("../middleware/check-auth");
const placesControllers = require("../controllers/places-controllers");
const { upload } = require("../middleware/file-upload");
const router = express.Router();
router.get("/:pid", placesControllers.getPlaceById);
router.get("/users/:uid", placesControllers.getUserPlaces);
router.use(checkAuth);

router.post(
  "/",
  upload("places").single("image"),
  [
    check("title").not().isEmpty(),
    check("description").isLength({ max: 500, min: 2 }),
    check("address").not().isEmpty(),
  ],
  placesControllers.createPlace
);
router.patch(
  "/:pid",
  upload("places").single("image"),
  [check("title").not().isEmpty(), check("description").not().isEmpty()],
  placesControllers.updatePlace
);
router.delete("/:pid", placesControllers.removePlace);

module.exports = router;
