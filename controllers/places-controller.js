const { validationResult } = require("express-validator");
const addressToCoords = require("../util/location");

const HttpError = require("../models/http-error");
const PlaceModel = require("../models/place-model");
const UserModel = require("../models/user-model");

const getPlacesByPlaceId = async (req, res, next) => {
  const placeId = req.params.placeId;
  let place;
  try {
    place = await PlaceModel.findById(placeId);
  } catch (err) {
    const error = new HttpError("Something went wrong", 500);
    return next(error);
  }
  if (!place) {
    const error = new HttpError(
      "Could not find a place for the provided place id",
      404
    );
    return next(error);
  }
  res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.userId;
  let places;
  try {
    places = await PlaceModel.find({ creator: userId });
  } catch (err) {
    const error = new HttpError("Something went wrong", 500);
    return next(error);
  }
  if (!places) {
    return next(
      new HttpError("Could not find a place for the provided user id", 404)
    );
  }
  res.json({ places: places.map((p) => p.toObject({ getters: true })) });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Please check your inputs", 422));
  }
  const { title, description, address, creator } = req.body;
  let coordinates;
  try {
    coordinates = await addressToCoords(address);
  } catch (error) {
    return next(error);
  }
  const createdPlace = new PlaceModel({
    title,
    description,
    image:
      "https://images.pexels.com/photos/7567946/pexels-photo-7567946.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    address,
    location: coordinates,
    creator,
  });
  let user;
  try {
    user = await new UserModel.findById({ creator });
  } catch {
    const error = new HttpError("Something went wrong", 500);
    return next(error);
  }
  if (!user) {
    const error = new HttpError("No such user found", 422);
    return next(error);
  }
  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError("Creating place failed", 500);
    return next(error);
  }
  res.status(201).json({ place: createdPlace });
};

const updatePlaceByPlaceId = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError("Please check your inputs", 422);
    return next(error);
  }
  const placeId = req.params.placeId;
  const { title, description } = req.body;

  let place;
  try {
    place = await PlaceModel.findById(placeId);
  } catch {
    const error = new HttpError("Something went wromg", 500);
    return next(error);
  }
  let updatedPlace;
  if (place) {
    place.title = title;
    place.description = description;
    try {
      await place.save();
    } catch {
      const error = new HttpError("Something went wromg", 500);
      return next(error);
    }
  } else {
    const error = new HttpError("Place not found", 404);
    return next(error);
  }
  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlaceByPlaceId = async (req, res, next) => {
  const placeId = req.params.placeId;
  let place;
  try {
    place = await PlaceModel.findById(placeId);
  } catch {
    const error = new HttpError("Something went wrong", 500);
    return next(error);
  }
  if (!place) {
    const error = new HttpError("No such place found", 404);
    return next(error);
  }
  try {
    await place.remove();
  } catch {
    const error = new HttpError("Something went wrong", 500);
    return next(error);
  }
  res.status(200).json({ message: "Place deleted" });
};

exports.getPlacesByPlaceId = getPlacesByPlaceId;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceByPlaceId = updatePlaceByPlaceId;
exports.deletePlaceByPlaceId = deletePlaceByPlaceId;
