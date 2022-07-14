const file = require('express').Router();
const { fileController } = require('../controllers');

file.get('/:fileId', fileController.getFile);

module.exports = file;
