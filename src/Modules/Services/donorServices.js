const { createDonor, getByEmail } = require("../Model/donorModel");
const { hashPassword, checkPassword, generateToken } = require("./auth");

const newDonor = async (donorData) => {
  let donor = donorData
  const emailCheck = await checkDuplicateEmail(donor);
  if (!emailCheck) {
  const hashedPassword = await hashPassword(donor.password);
  donor.password = hashedPassword;
    await createDonor(donor);
    return {status: 201, message: `Donor successfully created`};
  } else {
    return emailCheck;
  }
};

const checkLogin = async ({password, email}) => {
  const donor = await getByEmail(email);
  if (!donor) {
    return {status: 404, message: {message: 'Donor not found'}};
  }
  const isPasswordValid = await checkPassword(password, donor.password);
  if (!isPasswordValid) {
    return {status: 401, message: {message: 'Password is incorrect'}};
  } else {
    const token = generateToken({ id: donor.id, email: donor.email });
    return {status: 200, message: {token}};
  }
}

const checkDuplicateEmail = async ({email}) => {
  const donor = await getByEmail(email);
  if (donor) {
    return {status: 409, message: 'Email already exists'};
  }
  return null;
}

module.exports = { newDonor, checkLogin }