const { createDonor, getByEmail } = require("../Model/donorModel");
const { hashPassword } = require("./auth");

const newDonor = async (donorData) => {
  let donor = donorData
  const emailCheck = await checkDuplicateEmail(donor);
  const hashedPassword = await hashPassword(donor.password);
  donor.password = hashedPassword;
  if (!emailCheck) {
    await createDonor(donor);
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