const auth = require('express').Router();
const { authController } = require('../controllers');

auth.post('/login', authController.logIn);
auth.post('/signup', authController.signUp);

module.exports = auth;
