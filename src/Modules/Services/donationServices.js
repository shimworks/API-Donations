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
    console.log(error);
    return { status: 400, message: 'Error creating donation' };
  }
}

module.exports = {
  newDonation,
}