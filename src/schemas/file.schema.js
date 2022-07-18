const Joi = require('joi');

const getFile = {
  params: Joi.object({
    fileId: Joi.string().required(),
  }).required(),
};

module.exports = {
  getFile,
};
