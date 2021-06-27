const axios = require("axios");
const HttpError = require("../models/http-error");
const API_KEY = "AIzaSyDbfpnghOBCCIPhxJls0vRECx2kR5svIbM";

const addressToCoords = async (address) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=1${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );
  const data = response.data;
  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find coordinates of specified address",
      422
    );
    throw error;
  }
  const coordinates = data.results[0].geometry.location;
  return coordinates;
};

module.exports = addressToCoords;
