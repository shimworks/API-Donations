const express = require("express");

const routes = express.Router();
const { createDonor, loginDonor } = require("../Controller/donorController");
const { createDonation, getDonations, updateDonation } = require("../Controller/donationController");
const { authenticate } = require("../Controller/authentication");

routes.post("/signup", createDonor);
routes.post("/login", loginDonor);
routes.post("/donation", authenticate, createDonation);
routes.get("/donation", authenticate, getDonations);
routes.put("/donation/:id", authenticate, updateDonation);

module.exports = routes;