const logger = require('../configs/logger');
const catchAsync = require('../utils/catchAsync');

const getManyTodos = catchAsync(async (req, res) => {
  logger.silly(req.body, req.params, req.query);
  res.send('hello');
});

const getTodo = catchAsync(async (req, res) => {
  logger.silly(req.body, req.params, req.query);
  res.send('hello');
});

const addTodo = catchAsync(async (req, res) => {
  logger.silly(req.body, req.params, req.query);
  res.send('hello');
});

const deleteTodo = catchAsync(async (req, res) => {
  logger.silly(req.body, req.params, req.query);
  res.send('hello');
});

const editTodo = catchAsync(async (req, res) => {
  logger.silly(req.body, req.params, req.query);
  res.send('hello');
});

module.exports = {
  getManyTodos,
  getTodo,
  addTodo,
  deleteTodo,
  editTodo,
};
