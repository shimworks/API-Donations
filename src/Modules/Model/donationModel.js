const { Donation } = require("../../sequelize/models");

const createDonation = async (donationData) => {
  const response = await Donation.create(donationData)
  return response;
}

const getAllDonationsByDonorId = async (donorId) => {
  const find = await Donation.findAll({ where: { donorId } });
  return find;
}

const updateDonationWithId = async (data, id, donorId) => {
  try {
    const res = await Donation.update({ value: data.value }, { where: { id, donorId } });
    return res;
  } catch (err) {
    return false;
  }
};

const deleteDonationWithId = async (id, donorId) => {
  try {
    const res = await Donation.destroy({ where: { id, donorId } });
    return res;
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