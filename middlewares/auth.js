const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const { handleAuthError } = require('../utils/errors');

// const extractToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  console.log('authorization header:', authorization); // Add this line to debug

  if (!authorization || !authorization.startsWith('Bearer ')) {
    handleAuthError(res);
  }
  const token = authorization.replace('Bearer ', '');
  console.log('token:', token); // Add this line to debug

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    handleAuthError(res);
  }
  console.log('payload:', payload); // Add this line to debug

  req.user = payload;
  next();
};
