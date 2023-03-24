const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const placeModel = require("../models/place-model");
const userModel = require("../models/user-model");
const getPlaceById = async (req, res, next) => {
  const pid = req.params.pid;
  let place;
  try {
    place = await placeModel.findById(pid).populate('creatorId','-password');
  } catch (error) {
    console.log(error);
    return next(new HttpError("could not find your place by id ", 500));
  }
  if (!place) {
    return next(new HttpError("could not find any place for this id", 404));
  }
  res.json({ place: place.toObject({ getters: true }) });
};

const getUserPlaces = async (req, res, next) => {
  const uid = req.params.uid;
  let places;
  try {
    places = await placeModel.find({ creatorId: uid });
  } catch (error) {
    return next(new HttpError("could not get user places", 500));
  }
  if (places.length === 0) {
    return next(new HttpError("could not find places for your user id", 404));
  }
  res.json({
    length: places.length,
    places: places.map((place) => place.toObject({ getters: true })),
  });
};
const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("input invalid", 422));
  }
  const { creatorId, title, description, address } = req.body;
  let user;
  try {
    user = await userModel.findById(creatorId);
    if (!user) {
      return next(
        new HttpError("your creator id for save place is not invalid", 401)
      );
    }
  } catch (error) {
    return next(new HttpError("colud not save place,try again later", 500));
  }
  const newPlace = new placeModel({
    title,
    description,
    address,
    creatorId: user,
    image:
      "https://www.elegantthemes.com/blog/wp-content/uploads/2019/12/401-error-wordpress-featured-image.jpg",
  });
  try {
    // const sess = await mongoose.startSession();
    // sess.startTransaction();
    await newPlace.save();
    user.places.push(newPlace);
    await user.save();
    // await sess.commitTransaction();
    res.json({ newPlace: newPlace.toObject({ getters: true }) });
  } catch (error) {
    console.log(error);
    return next(new HttpError("colud not save place,try again later", 500));
  }
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("invalid Data", 422));
  }
  const { pid } = req.params;
  const { title, description } = req.body;
  let updatedPlace;
  try {
    updatedPlace = await placeModel.findById(pid);
    console.log(updatedPlace);
    updatedPlace.title = title;
    updatedPlace.description = description;
    await updatedPlace.save();
  } catch (error) {
    return next(new HttpError("could not update your place", 500));
  }
  if (!updatePlace) {
    res.status(404).json({ message: "could not find your place for update" });
  }
  res
    .status(401)
    .json({ updatedPlace: updatedPlace.toObject({ getters: true }) });
};
const removePlace = async (req, res, next) => {
  const { pid } = req.params;
  let removedPlace;
  try {
    removedPlace = await placeModel.findById(pid);
    console.log(removedPlace);
    if (!removedPlace) {
      return next(
        new HttpError("your place you want to delete is not found", 404)
      );
    }
    await placeModel.findByIdAndDelete(pid);
  } catch (error) {
    return next(new HttpError("could not delete item", 500));
  }
  res.json({ message: "your place successfully removed" });
};
exports.getUserPlaces = getUserPlaces;
exports.getPlaceById = getPlaceById;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.removePlace = removePlace;
