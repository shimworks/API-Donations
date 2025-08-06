const { newDonor, checkLogin } = require("../Services/donorServices");

const createDonor = async (req, res) => {
  const data = req.body;
  const result = await newDonor(data);
  return res.status(result.status).json({ message: result.message });  
}

const loginDonor = async (req, res) => {
  const data = req.body;
  const result = await checkLogin(data);
  return res.status(result.status).json(result.message);
}

module.exports = { createDonor, loginDonor };