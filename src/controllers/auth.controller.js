const logger = require('../configs/logger');
const catchAsync = require('../utils/catchAsync');

const signUp = catchAsync(async (req, res) => {
  logger.silly(req.body, req.params, req.query);
  res.send('hello');
});

const logIn = catchAsync(async (req, res) => {
  logger.silly(req.body, req.params, req.query);
  res.send('hello');
});

module.exports = {
  signUp,
  logIn,
};
