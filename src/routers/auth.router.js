const auth = require('express').Router();
const validate = require('../middlewares/validate');
const authSchema = require('../schemas/auth.schema');
const { authController } = require('../controllers');

auth.post('/login', validate(authSchema.logIn), authController.logIn);
auth.post('/signup', validate(authSchema.signUp), authController.signUp);

module.exports = auth;
