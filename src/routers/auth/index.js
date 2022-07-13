const auth = require('express').Router();

const login = require('./login');
const signup = require('./signup');
const accessToken = require('./access_token');

auth.use('/login', login);
auth.use('/signup', signup);
auth.use('/access-token', accessToken);

auth.get('/', (req, res) => {
  res.status(200).json({ message: 'Auth page!' });
});

module.exports = auth;
