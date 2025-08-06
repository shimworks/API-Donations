const express = require("express");

const donorRoute = express.Router();
const { createDonor, loginDonor } = require("../Controller/donorController");

donorRoute.post("/signup", createDonor);
donorRoute.post("/login", loginDonor);

module.exports = donorRoute;