const users = require('express').Router();

const avatar = require('./avatar');
const detail = require('./detail');

users.use('/avatar', avatar);
users.use('/detail', detail);

users.get('/', (req, res) => {
  res.status(200).json({ message: 'Users page!' });
});

module.exports = users;
