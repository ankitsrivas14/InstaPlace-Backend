const express = require("express");
const placesController = require("../controllers/places-controller");

const router = express.Router();

router.get("/:placeId", placesController.getPlacesByPlaceId);
router.get("/user/:userId", placesController.getPlacesByUserId);

router.post("/", placesController.createPlace);

router.patch("/:placeId", placesController.updatePlaceByPlaceId);

router.delete("/:placeId", placesController.deletePlaceByPlaceId);

module.exports = router;
