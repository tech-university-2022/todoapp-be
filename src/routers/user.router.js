const auth = require('express').Router();
const { userController } = require('../controllers');

const authorize = require('../middlewares/authorize');

auth.get('/', authorize, userController.getUserDetails);
auth.patch('/', userController.editUser);

module.exports = auth;
