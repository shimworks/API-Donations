const express = require("express");

const donorRoute = express.Router();
const { createDonor } = require("../Controller/donorController");

donorRoute.post("/signup", createDonor);

module.exports = donorRoute;