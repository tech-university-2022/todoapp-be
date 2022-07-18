const _ = require('lodash');

const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const getUserDetails = catchAsync(async (req, res) => {
  const { user } = req.authorized;
  res.status(httpStatus.OK).json({ user: _.omit(user, 'password') });
});

const editUser = catchAsync(async (req, res) => {
  const {
    user: { id, password: currentPassword },
  } = req.authorized;
  const updatedInfo = req.body || {};
  const avatar = req.file;
  const { user, error } = await userService.updateUser({
    id,
    currentPassword,
    ...updatedInfo,
    avatar,
  });

  if (error) {
    return res.status(error.status).json(error);
  }
  res.status(httpStatus.OK).json({ user });
});

module.exports = {
  getUserDetails,
  editUser,
};
