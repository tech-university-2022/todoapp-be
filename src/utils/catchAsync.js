const httpStatus = require('http-status');

const catchAsync = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch((err) => {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: err.message || 'Unknown error',
    });
  });
};

module.exports = catchAsync;
