const { writeFile: writeFilePromise } = require('fs').promises;
const fs = require('fs');
const httpStatus = require('http-status');
const path = require('path');
const File = require('../models/file.model');

/**
 * @param {string} id
 * @param {import('../types').MulterFile} file
 */
const writeFile = (id, file) =>
  writeFilePromise(path.join(process.cwd(), 'public', `${id}_${file.originalname}`), file.buffer);

/**
 *
 * @param {string} id
 */
const getFile = async (id) => {
  let file = await File.findByPk(id);
  if (!file) {
    return {
      error: {
        status: httpStatus.BAD_REQUEST,
        message: 'File not found',
      },
    };
  }

  file = file.get({ plain: true });
  return {
    file,
    stream: fs.createReadStream(path.join(process.cwd(), 'public', file.path)),
  };
};

module.exports = {
  writeFile,
  getFile,
};
