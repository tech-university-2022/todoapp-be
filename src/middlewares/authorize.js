const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { hashPwdFingerprint } = require('../utils/security');
const sendError = require('../utils/sendError');

const authorize = async (req, res, next) => {
  const authHeader = req.headers.authorization || (req.query || {}).token || '';
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7, authHeader.length);
    try {
      const payload = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

      // verify jwt payload
      const { userId, pwdFingerprint } = payload;
      let userFound = await User.findByPk(userId);
      if (!userFound) {
        return sendError(res, httpStatus.UNAUTHORIZED, 'User not found');
      }

      // check if password was changed or not
      userFound = userFound.get({ plain: true });
      if (hashPwdFingerprint(userFound.password) !== pwdFingerprint) {
        return sendError(res, httpStatus.UNAUTHORIZED, 'Password was changed');
      }

      // assign and next
      req.authorized = {
        user: userFound,
        token,
      };
      next();
    } catch (error) {
      sendError(res, httpStatus.UNAUTHORIZED, 'Token expired');
    }
  } else {
    sendError(res, httpStatus.UNAUTHORIZED, 'Invalid token');
  }
};

module.exports = authorize;
