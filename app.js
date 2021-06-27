const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const HttpError = require("./models/http-error");
const placesRoutes = require("./routes/places-routes");
const userRoutes = require("./routes/users-routes");

const MongoDbConnectUrl =
  "mongodb+srv://ankitsrivas14:rRGWeCszwScSi4Kq@cluster0.lyltn.mongodb.net/InstaPlaces?retryWrites=true&w=majority";

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes);
app.use("/api/user", userRoutes);

//Error handling for any unwanted route
//This middleware will be triggered when there is no 'next' sent insude any route
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "Something went wrong!" });
});

mongoose
  .connect(MongoDbConnectUrl)
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
