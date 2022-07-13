const auth = require('express').Router();

const login = require('./log_in');
const signup = require('./sign_up');
const accessToken = require('./access_token');

auth.use('/log_in', login);
auth.use('/sign_up', signup);
auth.use('/access_token', accessToken);

auth.get('/', (req, res) => {
  res.status(200).json({ message: 'Auth page!' });
});

module.exports = auth;
