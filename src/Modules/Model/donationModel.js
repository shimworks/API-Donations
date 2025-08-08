const { Donation } = require("../../sequelize/models");

const createDonation = async (donationData) => {
  const response = await Donation.create(donationData)
  return response;
}

const getAllDonationsByDonorId = async (donorId) => {
  const find = await Donation.findAll({ where: { donorId } });
  return find;
}

const updateDonationWithId = async (data, id) => {
  try {
    await Donation.update({value: data},{ where: { id } });
    return true;
  } catch (err) {
    return false;
  }
};

const deleteDonationWithId = async (id) => {
  try {
    await Donation.destroy({ where: { id } });
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = {
  createDonation,
  getAllDonationsByDonorId,
  deleteDonationWithId,
  updateDonationWithId
};