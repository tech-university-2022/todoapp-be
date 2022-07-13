const routers = require('express').Router();

const auth = require('./auth');
const user = require('./user');
const todos = require('./todos');

routers.use('/auth', auth);
routers.use('/user', user);
routers.use('/todos', todos);

routers.get('/', (req, res) => {
  res.status(200).json({ message: 'Routers page!' });
});

module.exports = routers;
