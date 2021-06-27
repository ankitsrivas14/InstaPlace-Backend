const express = require("express");
const placesController = require("../controllers/places-controller");

const router = express.Router();

router.get("/:placeId", placesController.getPlaceByPlaceId);
router.get("/user/:userId", placesController.getPlaceByUserId);

router.post("/", placesController.createPlace);

module.exports = router;
