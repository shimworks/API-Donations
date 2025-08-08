const express = require("express");

const routes = express.Router();
const { createDonor, loginDonor } = require("../Controller/donorController");
const { createDonation, getDonations } = require("../Controller/donationController");
const { authenticate } = require("../Controller/authentication");

routes.post("/signup", createDonor);
routes.post("/login", loginDonor);
routes.post("/donation", authenticate, createDonation);
routes.get("/donation", authenticate, getDonations);

module.exports = routes;