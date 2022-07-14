const Joi = require('joi');

const isPassword = Joi.string().min(6);

module.exports = {
  isPassword,
};
