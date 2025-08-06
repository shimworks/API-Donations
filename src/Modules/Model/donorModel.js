const { Donor } = require("../../sequelize/models");

const createDonor = async (donorData) => {
  const response = await Donor.create(donorData)
  return response;
}

const getByEmail = async (email) => {
  const find = await Donor.findOne({ where: { email } });
  return find;
};

const getDonorById = async (id) => {
  const find = await Donor.findByPk(id);
  return find;
}

const getAllDonors = async () => {
  const donors = await Donor.findAll();
  return donors;
};

module.exports = {
  createDonor,
  getByEmail,
  getDonorById,
  getAllDonors,
};