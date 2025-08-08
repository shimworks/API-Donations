const { decodeToken } = require('../Services/auth');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  const decoded = decodeToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Login required' });
  } else {
    req.user = decoded;
    next();
  }
}

module.exports = { authenticate };