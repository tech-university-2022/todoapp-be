const logger = require('../configs/logger');
const catchAsync = require('../utils/catchAsync');
const { authService } = require('../services');

const signUp = catchAsync(async (req, res) => {
  res.send('OK');
});

const logIn = catchAsync(async (req, res) => {
  const credential = req.body;
  const { token, user } = await authService.logIn(credential);
  res.send('OK');
});

module.exports = {
  signUp,
  logIn,
};
