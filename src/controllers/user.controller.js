const _ = require('lodash');

const httpStatus = require('http-status');
const logger = require('../configs/logger');
const catchAsync = require('../utils/catchAsync');

const getUserDetails = catchAsync(async (req, res) => {
  const { user } = req.authorized;
  res.status(httpStatus.OK).send({ user: _.omit(user, 'password') });
});

const editUser = catchAsync(async (req, res) => {
  logger.silly(req.body, req.params, req.query);
  res.send('hello');
});

module.exports = {
  getUserDetails,
  editUser,
};
