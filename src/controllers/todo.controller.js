const httpStatus = require('http-status');
const sendError = require('../utils/sendError');
const sendResponse = require('../utils/sendResponse');
const logger = require('../configs/logger');
const catchAsync = require('../utils/catchAsync');
const { todoService } = require('../services');

const getManyTodos = catchAsync(async (req, res) => {
  const { user } = req.authorized;
  const pagination = req.body;

  logger.info(`Get many todos:\n\tUser: ${user.email}\n\tPagination: ${JSON.stringify(pagination)}`);
  const todos = await todoService.getManyTodos(user.id, pagination);
  logger.info(`Get many todos:\n\tResult: ${JSON.stringify(todos)}`);

  if (todos.length === 0) {
    return sendResponse({ todos }, 'Empty todos');
  }
  return sendResponse({ todos });
});

const getTodo = catchAsync(async (req, res) => {
  const { user } = req.authorized;
  const { todoId } = req.params;

  logger.info(`Get todo:\n\tUser: ${user.email}\n\tTodoId: ${todoId}`);
  const todo = await todoService.getTodo(todoId);
  logger.info(`Get todo:\n\tResult: ${JSON.stringify(todo)}`);

  if (todo === null) {
    return sendError(res, httpStatus.BAD_REQUEST, 'The requested todo is not exists on database');
  }
  if (todo.createdBy !== user.id) {
    return sendError(res, httpStatus.BAD_REQUEST, 'The user do not have permission to reveal this todo');
  }
  return sendResponse({ todo });
});

const addTodo = catchAsync(async (req, res) => {
  logger.info(`Add todo: ${JSON.stringify(req.body)}`);
  const addedTodo = await todoService.addTodo(req.body);
  logger.info(`Add todos: ${JSON.stringify(req.body)}\n => Result: ${JSON.stringify(addedTodo)}`);
  res.send(addedTodo);
});

const deleteTodo = catchAsync(async (req, res) => {
  const { user } = req.authorized;
  const { todoId } = req.params;

  logger.info(`Delete todo:\n\tUser: ${user.email}\n\tTodoId: ${todoId}`);

  const willDeleteTodo = await todoService.getTodo(todoId);
  if (willDeleteTodo === null) {
    return sendError(res, httpStatus.BAD_REQUEST, 'The requested todo is not exists on database');
  }
  if (willDeleteTodo.createdBy !== user.id) {
    return sendError(res, httpStatus.BAD_REQUEST, 'The user do not have permission to reveal this todo');
  }

  const deletedTodo = await todoService.deleteTodo(req.params);
  logger.info(`Delete todo:\n\tResult: ${JSON.stringify(deletedTodo)}`);

  if (deletedTodo.some((v) => v === 0)) {
    return sendResponse({}, 'Can not delete todo!');
  }
  res.send('OK');
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
