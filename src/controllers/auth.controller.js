const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService } = require('../services');

const signUp = catchAsync(async (req, res) => {
  const userInfo = req.body;
  const { user, error } = await authService.signUp(userInfo);

  if (error) {
    return res.status(error.status).json(error);
  }

  res.status(httpStatus.OK).json({ user });
});

const logIn = catchAsync(async (req, res) => {
  const credential = req.body;
  const { token, user, error } = await authService.logIn(credential);

  if (error) {
    return res.status(error.status).json(error);
  }

  res.status(httpStatus.OK).json({ token, user });
});

module.exports = {
  signUp,
  logIn,
};
