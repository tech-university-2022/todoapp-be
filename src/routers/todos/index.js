const todos = require('express').Router();

const all = require('./all');
const single = require('./single');

todos.param('TodoId', (req, res, next, value) => {
  req.name = value;
  next();
});

todos.get('/', all);
todos.get('/:TodoId', single);

module.exports = todos;
