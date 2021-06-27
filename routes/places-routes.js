const express = require("express");
const placesController = require("../controllers/places-controller");

const router = express.Router();

router.get("/:placeId", placesController, placesController.getPlaceByPlaceId);
router.get("/user/:userId", placesController.getPlaceByUserId);

module.exports = router;
