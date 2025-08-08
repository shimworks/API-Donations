const { newDonation, getDonationsByDonor, updateDonationValue  } = require("../Services/donationServices");

const createDonation = async (req, res) => {
  const data = req.body;
  const donor = req.user;
  const result = await newDonation(data, donor);
  return res.status(result.status).json({ message: result.message });  
}

const getDonations = async (req, res) => {
  const donor = req.user;
  const result = await getDonationsByDonor(donor);
  if (result.status === 200) {
    return res.status(result.status).json({ data: result.data });  
  }
  return res.status(result.status).json({ message: result.message });  
}

const updateDonation = async (req, res) => {
  const data = req.body;
  const donor = req.user;
  const donationId = req.params.id;
  const result = await updateDonationValue(data, donationId, donor);
  return res.status(result.status).json({ message: result.message });
}

const deleteDonation = async (req, res) => {
  const data = req.body;
  const result = await checkLogin(data);
  return res.status(result.status).json(result.message);
}

module.exports = { createDonation, getDonations, updateDonation, deleteDonation };