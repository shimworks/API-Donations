const { newDonation  } = require("../Services/donationServices");

const createDonation = async (req, res) => {
  const data = req.body;
  const donor = req.user;
  const result = await newDonation(data, donor);
  return res.status(result.status).json({ message: result.message });  
}

const getDonations = async (req, res) => {
  const data = req.body;
  const donor = req.user;
  const result = await newDonation(data, donor);
  return res.status(result.status).json({ message: result.message });  
}

const updateDonation = async (req, res) => {
  const data = req.body;
  const result = await checkLogin(data);
  return res.status(result.status).json(result.message);
}

const deleteDonation = async (req, res) => {
  const data = req.body;
  const result = await checkLogin(data);
  return res.status(result.status).json(result.message);
}

module.exports = { createDonation, updateDonation, deleteDonation };