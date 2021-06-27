const express = require("express");
const { check } = require("express-validator");
const placesController = require("../controllers/places-controller");

const router = express.Router();

router.get("/:placeId", placesController.getPlacesByPlaceId);
router.get("/user/:userId", placesController.getPlacesByUserId);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").isLength({ min: 5 }),
  ],
  placesController.createPlace
);

router.patch(
  "/:placeId",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placesController.updatePlaceByPlaceId
);

router.delete("/:placeId", placesController.deletePlaceByPlaceId);

module.exports = router;
