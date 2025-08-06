const { newDonor } = require("../Services/donorServices");

const createDonor = async (req, res) => {
  const data = req.body;
  const result = await newDonor(data);
  return res.status(result.status).json({ message: result.message });  
}

module.exports = { createDonor };