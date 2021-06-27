const { v4: uuid } = require("uuid");
const HttpError = require("../models/http-error");

let DUMMY_USERS = [
  {
    id: "u1",
    name: "qwertyuiop",
    email: "qwertyuiop@asdfghjkl.com",
    password: "1234567890",
  },
  {
    id: "u2",
    name: "asdfghjkl",
    email: "zxcvbnm@qwertyuiop.com",
    password: "1234567890",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const { name, email, password } = req.body;
  if (DUMMY_USERS.find((u) => u.email === email)) {
    throw new HttpError("User Already Exists", 422);
  }
  const newUser = {
    id: uuid(),
    name,
    email,
    password,
  };
  DUMMY_USERS.push(newUser);
  res.status(201).json({ user: newUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const selectedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!selectedUser) {
    throw new HttpError("No user found", 401);
  } else if (selectedUser.password !== password) {
    throw new HttpError("Invalid Password", 401);
  }
  res.json({ message: "Logged in" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
