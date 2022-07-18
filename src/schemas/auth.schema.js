const Joi = require('joi');
const { isPassword } = require('../constants/schema');

const signUp = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: isPassword.required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }).required(),
};

const logIn = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: isPassword.required(),
  }).required(),
};

module.exports = {
  signUp,
  logIn,
};
