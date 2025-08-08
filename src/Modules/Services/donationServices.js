const { createDonation,  getAllDonationsByDonorId,  deleteDonationWithId,  updateDonationWithId } = require('../Model/donationModel');

const newDonation = async (data, donor) => {
  try {
    const donationData = {
      ...data,
      donorId: donor.id,
    };
    const donation = await createDonation(donationData);
    return { status: 201, message: `Successfully donated, the donation Id is ${donation.id}` };
  } catch (error) {
    return { status: 400, message: 'Error creating donation' };
  }
}

const getDonationsByDonor = async (donor) => {
  try {
    const donations = await getAllDonationsByDonorId(donor.id);
    return { status: 200, data: donations };
  } catch (error) {
    return { status: 500, message: 'Error retrieving donations' };
  }
}

module.exports = {
  newDonation,
  getDonationsByDonor,
}