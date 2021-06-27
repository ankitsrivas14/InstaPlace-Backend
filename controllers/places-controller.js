const { v4: uuid } = require("uuid");
const HttpError = require("../models/http-error");
let DUMMY_PLACES = [
  {
    id: "p1",
    title: "India Gate",
    description:
      'The India Gate is a war memorial located astride the Rajpath, on the eastern edge of the "ceremonial axis" of New Delhi, formerly called Kingsway.',
    imageUrl:
      "https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    address: "Rajpath, India Gate, New Delhi, Delhi 110001",
    location: {
      lat: 28.6129167,
      lng: 77.2273157,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Red Fort",
    description:
      "The Red Fort is a historic fort in the city of Delhi in India that served as the main residence of the Mughal Emperors.",
    imageUrl:
      "https://images.pexels.com/photos/4119592/pexels-photo-4119592.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    address:
      "Netaji Subhash Marg, Lal Qila, Chandni Chowk, New Delhi, Delhi 110006",
    location: {
      lat: 28.6561639,
      lng: 77.2388263,
    },
    creator: "u2",
  },
];

const getPlacesByPlaceId = (req, res, next) => {
  const placeId = req.params.placeId;
  const places = DUMMY_PLACES.filter((p) => p.id === placeId);
  if (!places) {
    throw new HttpError(
      "Could not find a place for the provided place id",
      404
    );
  }
  res.json({ places });
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.userId;
  const places = DUMMY_PLACES.filter((p) => p.creator === userId);
  if (!places) {
    return next(
      new HttpError("Could not find a place for the provided user id", 404)
    );
  }
  res.json({ places });
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;
  const createdPlace = {
    id: uuid(),
    title,
    description,
    imageUrl: "",
    address,
    location: coordinates,
    creator,
  };
  DUMMY_PLACES.push(createdPlace);
  res.status(201).json({ place: createdPlace });
};

const updatePlaceByPlaceId = (req, res, next) => {
  const placeId = req.params.placeId;
  const { title, description } = req.body;
  const placeToUpdate = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  placeToUpdate.title = title;
  placeToUpdate.description = description;
  DUMMY_PLACES[placeIndex] = placeToUpdate;
  res.status(200).json({ place: placeToUpdate });
};

const deletePlaceByPlaceId = (req, res, next) => {
  const placeId = req.params.placeId;
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "Place deleted" });
};

exports.getPlacesByPlaceId = getPlacesByPlaceId;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceByPlaceId = updatePlaceByPlaceId;
exports.deletePlaceByPlaceId = deletePlaceByPlaceId;
