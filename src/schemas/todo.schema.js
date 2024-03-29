const Joi = require('joi');
const { isUUID } = require('../constants/schema');

const getManyTodos = {
  query: Joi.object({
    take: Joi.number().allow(null).optional().default(Number.MAX_SAFE_INTEGER),
    page: Joi.number().allow(null).optional().default(1),
    search: Joi.string().allow('').allow(null).optional(),
  }).required(),
};

const getTodo = {
  params: Joi.object({
    todoId: Joi.string().custom(isUUID, 'Check todo ID format').required(),
  }).required(),
};

const addTodo = {
  body: Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categories: Joi.string().allow('').required(),
    status: Joi.string().required(),
    dueDate: Joi.date().required(),
  }).required(),
};

const deleteTodo = {
  params: Joi.object({
    todoId: Joi.string().custom(isUUID, 'Check todo ID format').required(),
  }).required(),
};

const editTodo = {
  body: Joi.object({
    title: Joi.string(),
    content: Joi.string(),
    categories: Joi.string().allow(''),
    status: Joi.string(),
    dueDate: Joi.date(),
  })
    .or('title', 'content', 'categories', 'status', 'dueDate')
    .required(),
};

module.exports = {
  getManyTodos,
  getTodo,
  addTodo,
  deleteTodo,
  editTodo,
};
