const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = process.env.SALT || 10;
const secret = process.env.SECRET

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(parseInt(saltRounds));
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function checkPassword(password, hashedPassword) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

function generateToken(payload) {
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
}

function decodeToken(auth) {
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    return null;
  }
}

module.exports = { hashPassword, checkPassword, generateToken, decodeToken };