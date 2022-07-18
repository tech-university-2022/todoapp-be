const Joi = require('joi');
const validator = require('validator');

const isPassword = Joi.string().min(6);

const isUUID = (value, helpers) => {
  if (!validator.isUUID(value)) return helpers.error('any.invalid');
  return value;
};

module.exports = {
  isPassword,
  isUUID,
};
