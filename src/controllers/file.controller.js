const logger = require('../configs/logger');
const catchAsync = require('../utils/catchAsync');

const getFile = catchAsync(async (req, res) => {
  logger.silly(req.body, req.params, req.query);
  res.send('hello');
});

module.exports = {
  getFile,
};
