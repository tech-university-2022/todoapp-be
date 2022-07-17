const Todo = require('../models/todo.model');

/**
 *
 * @param {userId: number}
 * @param {{take: number; page: number}} pagination
 */
const getManyTodos = async (userId, pagination) => {
  const { take, page } = pagination;
  const todoFound = await Todo.findAll({
    where: {
      createdBy: userId,
    },
    order: [['updatedAt', 'DESC']],
    offset: (page - 1) * take,
    limit: take,
  });
  return todoFound;
};

/**
 *
 * @param {todoId: number}
 */
const getTodo = async (todoId) => {
  const todoFound = await Todo.findByPk(todoId);
  return todoFound;
};

/**
 *
 * @param {todoContent} todo content
 */
const addTodo = async (todoContent) => {
  const todoFound = await Todo.create(todoContent);
  return todoFound;
};

/**
 *
 * @param {{todoId}} Todo ID
 */
const deleteTodo = async (todoInfo) => {
  const { todoId } = todoInfo;
  const todoFound = await Todo.destroy({
    where: {
      id: todoId,
    },
  });
  return todoFound;
};

/**
 *
 * @param {todoID}
 * @param {todoContent}
 */
const editTodo = async (todoId, todoContent) => {
  const todoFound = await Todo.update(todoContent, {
    where: {
      id: todoId,
    },
  });
  return todoFound[0];
};

module.exports = {
  getManyTodos,
  getTodo,
  addTodo,
  deleteTodo,
  editTodo,
};
