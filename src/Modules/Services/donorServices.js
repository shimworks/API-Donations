const { createDonor } = require("../Model/donorModel");

const newDonor = async (donorData) => {
  await createDonor(donorData);
  return {status: 201, message: `Donor successfully created`};
};

module.exports = { newDonor }