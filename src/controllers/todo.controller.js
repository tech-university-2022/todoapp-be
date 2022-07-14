const logger = require('../configs/logger');
const catchAsync = require('../utils/catchAsync');
const { todoService } = require('../services');

const getManyTodos = catchAsync(async (req, res) => {
  logger.info(`Get many todos: ${JSON.stringify(req.body)}`);
  const todos = await todoService.getManyTodos(req.body);
  logger.info(`Get many todos: ${JSON.stringify(req.body)}\n => Result: ${JSON.stringify(todos)}`);
  res.send(todos);
});

const getTodo = catchAsync(async (req, res) => {
  logger.info(`Get todo: ${JSON.stringify(req.params)}`);
  const todo = await todoService.getTodo(req.params);
  logger.info(`Get todo: ${JSON.stringify(req.params)}\n => Result: ${JSON.stringify(todo)}`);
  res.send(todo);
});

const addTodo = catchAsync(async (req, res) => {
  logger.info(`Add todo: ${JSON.stringify(req.body)}`);
  const addedTodo = await todoService.addTodo(req.body);
  logger.info(`Add todos: ${JSON.stringify(req.body)}\n => Result: ${JSON.stringify(addedTodo)}`);
  res.send(addedTodo);
});

const deleteTodo = catchAsync(async (req, res) => {
  logger.info(`Delete todo: ${JSON.stringify(req.params)}`);
  const todo = await todoService.deleteTodo(req.params);
  logger.info(`Delete todo: ${JSON.stringify(req.params)}\n => Result: ${JSON.stringify(todo)}`);
  res.send(todo ? 'true' : 'false');
});

const editTodo = catchAsync(async (req, res) => {
  logger.info(`Add todo: ${JSON.stringify({ ...req.params, ...req.body })}`);
  const editedTodo = await todoService.editTodo({ ...req.params, ...req.body });
  logger.info(`Add todos: ${JSON.stringify(req.body)}\n => Result: ${JSON.stringify(editedTodo)}`);
  res.send(editedTodo ? 'true' : 'false');
});

module.exports = {
  getManyTodos,
  getTodo,
  addTodo,
  deleteTodo,
  editTodo,
};
