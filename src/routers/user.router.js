const auth = require('express').Router();
const { userController } = require('../controllers');

auth.get('/', userController.getUserDetails);
auth.patch('/', userController.editUser);

module.exports = auth;
