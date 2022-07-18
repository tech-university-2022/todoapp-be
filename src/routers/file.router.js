const file = require('express').Router();
const { fileController } = require('../controllers');
const authorize = require('../middlewares/authorize');
const validate = require('../middlewares/validate');
const { getFile } = require('../schemas/file.schema');

file.get('/:fileId', authorize, validate(getFile), fileController.getFile);

module.exports = file;
