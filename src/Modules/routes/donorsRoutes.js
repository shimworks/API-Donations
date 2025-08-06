const express = require("express");

const donorRoute = express.Router();
const { createDonor } = require("../Controller/donorController");

donorRoute.post("/donor", createDonor);

module.exports = donorRoute;