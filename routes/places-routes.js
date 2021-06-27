const express = require("express");

const HttpError = require("../models/http-error");

const router = express.Router();

const DUMMY_PLACES = [
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

router.get("/:placeId", (req, res, next) => {
  const placeId = req.params.placeId;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);
  if (!place) {
    throw new HttpError(
      "Could not find a place for the provided place id",
      404
    );
  }
  res.json({ place });
});

router.get("/user/:userId", (req, res, next) => {
  const userId = req.params.userId;
  const place = DUMMY_PLACES.find((p) => p.creator === userId);
  if (!place) {
    return next(
      new HttpError("Could not find a place for the provided user id", 404)
    );
  }
  res.json({ place });
});

module.exports = router;
