const multer = require('multer')();

const auth = require('express').Router();
const { userController } = require('../controllers');
const authorize = require('../middlewares/authorize');
const validate = require('../middlewares/validate');
const { updateUser } = require('../schemas/user.schema');

auth.get('/', authorize, userController.getUserDetails);
auth.patch('/', multer.single('avatar'), authorize, validate(updateUser), userController.editUser);

module.exports = auth;
