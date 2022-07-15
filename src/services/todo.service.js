const Todo = require('../models/todo.model');

/**
 * *
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
 * @param {{title, content, createdBy, category, status, dueDate}} todo information
 */
const addTodo = async (todoInfo) => {
  const { title, content, createdBy, category, status, dueDate } = todoInfo;
  const todoFound = await Todo.create({ title, content, createdBy, category, status, dueDate });
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
 * @param {{title, content, createdBy, category, status, dueDate}} todo information
 */
const editTodo = async (todoInfo) => {
  const { todoId, title, content, category, status, dueDate } = todoInfo;
  const todoFound = await Todo.update(
    { title, content, category, status, dueDate },
    {
      where: {
        id: todoId,
      },
    }
  );
  return todoFound[0];
};

module.exports = {
  getManyTodos,
  getTodo,
  addTodo,
  deleteTodo,
  editTodo,
};
