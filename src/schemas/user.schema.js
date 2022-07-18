const Joi = require('joi');

const { isPassword } = require('../constants/schema');

const updateUser = {
  body: Joi.object({
    firstName: Joi.string().allow(null).allow(''),
    lastName: Joi.string().allow(null).allow(''),
    oldPassword: isPassword.allow(null).allow(''),
    newPassword: isPassword.allow(null).allow(''),
  }),
};

module.exports = {
  updateUser,
};
