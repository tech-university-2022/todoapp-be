const httpStatus = require('http-status');
const sendError = require('../utils/sendError');
const sendResponse = require('../utils/sendResponse');
const logger = require('../configs/logger');
const catchAsync = require('../utils/catchAsync');
const { todoService } = require('../services');

const getManyTodos = catchAsync(async (req, res) => {
  const { user } = req.authorized;
  const pagination = req.query;

  logger.info(`Get many todos:\n\tUser: ${user.email}\n\tPagination: ${JSON.stringify(pagination)}`);
  const data = await todoService.getManyTodos(user.id, pagination);
  logger.info(`Get many todos: Done`);

  if (data.todos.length === 0) {
    return sendResponse(res, { data }, 'Empty todos');
  }
  return sendResponse(res, { data });
});

const getTodo = catchAsync(async (req, res) => {
  const { user } = req.authorized;
  const { todoId } = req.params;

  logger.info(`Get todo:\n\tUser: ${user.email}\n\tTodoId: ${todoId}`);

  const todo = await todoService.getTodo(todoId);
  logger.info(`Get todo: Done`);

  if (todo === null) {
    return sendError(res, httpStatus.BAD_REQUEST, 'The requested todo is not exists on database');
  }
  if (todo.createdBy !== user.id) {
    return sendError(res, httpStatus.BAD_REQUEST, 'The user do not have permission to reveal this todo');
  }
  return sendResponse(res, { todo });
});

const addTodo = catchAsync(async (req, res) => {
  const { user } = req.authorized;
  const todoContent = {
    ...req.body,
    createdBy: user.id,
  };

  logger.info(`Add todo:\n\tUser: ${user.email}\n\tContent: ${JSON.stringify(todoContent)}`);

  const addedTodo = await todoService.addTodo(todoContent);

  logger.info(`Add todos: Done`);

  return sendResponse(res, { addedTodo }, 'Add todo successfully');
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
  logger.info(`Delete todo: Done`);

  if (deletedTodo.some((v) => v === 0)) {
    return sendResponse({}, 'Can not delete todo!');
  }
  return sendResponse(res, {}, 'Delete todo successfully!');
});

const editTodo = catchAsync(async (req, res) => {
  const { user } = req.authorized;
  const { todoId } = req.params;
  const todoContent = req.body;

  logger.info(`Edit todo:\n\tUser: ${user.email}\n\tContent: ${JSON.stringify(todoContent)}`);

  const willEditTodo = await todoService.getTodo(todoId);
  if (willEditTodo === null) {
    return sendError(res, httpStatus.BAD_REQUEST, 'The requested todo is not exists on database');
  }
  if (willEditTodo.createdBy !== user.id) {
    return sendError(res, httpStatus.BAD_REQUEST, 'The user do not have permission to reveal this todo');
  }

  const editedTodo = await todoService.editTodo(todoId, todoContent);

  logger.info(`Edit todos: Done`);

  if (!editedTodo) return sendResponse(res, {}, 'Edit failed!');

  return sendResponse(res, {}, 'Edit successfully!');
});

module.exports = {
  getManyTodos,
  getTodo,
  addTodo,
  deleteTodo,
  editTodo,
};
