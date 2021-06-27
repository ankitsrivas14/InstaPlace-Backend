const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const UserModel = require("../models/user-model");

const getUsers = async (req, res, next) => {
  let allUsers;
  try {
    allUsers = await UserModel.find({}, "-password");
  } catch {
    const error = new HttpError("Something went wrong", 522);
    return next(error);
  }
  res.json({ users: allUsers.map((u) => u.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError("Please check your inputs", 422);
    return next(error);
  }
  const { name, email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      const error = new HttpError("User already exists!", 422);
      return next(error);
    }
  } catch {
    const error = new HttpError("Something went wrong", 500);
    return next(error);
  }
  const newUser = new UserModel({
    name,
    email,
    password,
    places: [],
    image:
      "https://images.pexels.com/photos/3310695/pexels-photo-3310695.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  });
  try {
    await newUser.save();
  } catch {
    const error = new HttpError("Something went wrong", 500);
    return next(error);
  }
  res.status(201).json({ user: newUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError("Please check your inputs", 422);
    return next(error);
  }
  const { email, password } = req.body;
  let selectedUser;
  try {
    selectedUser = await UserModel.findOne({ email: email });
  } catch {
    const error = new HttpError("Something went wrong", 500);
    return next(error);
  }
  if (!selectedUser) {
    const error = new HttpError("User not found", 404);
    return next(error);
  } else if (selectedUser.password !== password) {
    const error = new HttpError("Invalid Credentials", 422);
    return next(error);
  }
  res.json({ message: "Logged in" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
