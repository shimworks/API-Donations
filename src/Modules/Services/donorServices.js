const { createDonor, getByEmail } = require("../Model/donorModel");

const newDonor = async (donorData) => {
  const emailCheck = await checkDuplicateEmail(donorData);
  if (!emailCheck) {
    await createDonor(donorData);
    return {status: 201, message: `Donor successfully created`};
  } else {
    return emailCheck;
  }
};

const checkDuplicateEmail = async ({email}) => {
  const donor = await getByEmail(email);
  if (donor) {
    return {status: 409, message: 'Email already exists'};
  }
  return null;
}

module.exports = { newDonor }