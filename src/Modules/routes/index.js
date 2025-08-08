const express = require("express");

const routes = express.Router();
const { createDonor, loginDonor } = require("../Controller/donorController");
const { createDonation } = require("../Controller/donationController");
const { authenticate } = require("../Controller/authentication");

routes.post("/signup", createDonor);
routes.post("/login", loginDonor);
routes.post("/donation", authenticate, createDonation);

module.exports = routes;