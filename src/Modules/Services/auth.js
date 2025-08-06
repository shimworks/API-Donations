const bcrypt = require('bcrypt');
const saltRounds = process.env.SALT || 10;

async function hashPassword (password)  {
  const salt = await bcrypt.genSalt(parseInt(saltRounds));
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

module.exports = { hashPassword };