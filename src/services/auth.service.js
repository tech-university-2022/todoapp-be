const logger = require('../configs/logger');
const User = require('../models/user.model');

/**
 *
 * @param {{email: string; password: string}} credential
 */
const logIn = async (credential) => {
  const userFound = await User.findOne({ where: { email: credential.email } });
  if (userFound) {
    logger.info('User instance');
    logger.info(JSON.stringify(userFound.get()));
  }
  return {};
};

module.exports = {
  logIn,
};
