const logger = require('../configs/logger');
const catchAsync = require('../utils/catchAsync');

const getUserDetails = catchAsync(async (req, res) => {
  logger.silly(req.body, req.params, req.query);
  res.send('hello');
});

const editUser = catchAsync(async (req, res) => {
  logger.silly(req.body, req.params, req.query);
  res.send('hello');
});

module.exports = {
  getUserDetails,
  editUser,
};
