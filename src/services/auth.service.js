const _ = require('lodash');
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const User = require('../models/user.model');
const { hashPassword, hashPwdFingerprint } = require('../utils/security');

/**
 *
 * @param {{email: string; password: string}} credential
 */
const logIn = async (credential) => {
  let userFound = await User.findOne({ where: { email: credential.email } });
  if (userFound) {
    userFound = userFound.get({ plain: true });
    if (userFound.password === hashPassword(credential.password)) {
      // provide token here
      const token = jwt.sign(
        {
          userId: userFound.id,
          pwdFingerprint: hashPwdFingerprint(userFound.password), // incase user change password => make token invalid
        },
        process.env.TOKEN_SECRET_KEY,
        {
          expiresIn: process.env.TOKEN_EXPIRES_IN,
        }
      );
      return {
        token: {
          token,
          expiresIn: process.env.TOKEN_EXPIRES_IN,
        },
        user: _.omit(userFound, 'password'),
      };
    }
  }
  return {
    error: {
      status: httpStatus.UNAUTHORIZED,
      message: 'Incorrect email or password',
    },
  };
};

/**
 *
 * @param {{email: string; password: string; firstName: string; lastName: string}} userInfo
 */
const signUp = async (userInfo) => {
  const userFound = await User.findOne({ where: { email: userInfo.email } });
  if (userFound) {
    return {
      error: {
        status: httpStatus.BAD_REQUEST,
        message: 'User already exists',
      },
    };
  }
  const createdUser = await User.create(userInfo);
  return { user: _.omit(createdUser.get({ plain: true }), 'password') };
};

module.exports = {
  logIn,
  signUp,
};
