const httpStatus = require('http-status');
const { fileService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const sendError = require('../utils/sendError');

const getFile = catchAsync(async (req, res) => {
  const { user } = req.authorized;
  const { fileId } = req.params;

  if (fileId !== user.avatar) {
    return sendError(res, httpStatus.FORBIDDEN, 'Access denied');
  }

  const { error, stream, file } = await fileService.getFile(fileId);

  if (error) {
    return res.status(error.status).json(error);
  }

  res.writeHead(200, {
    'Content-Type': file.mime,
    'Content-Length': file.size,
  });
  stream.pipe(res);
});

module.exports = {
  getFile,
};
