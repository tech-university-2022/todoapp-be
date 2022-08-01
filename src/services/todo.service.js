const { Op } = require('sequelize');
const Todo = require('../models/todo.model');

/**
 *
 * @param {userId: number}
 * @param {{take: number; page: number}} pagination
 */
const getManyTodos = async (userId, pagination, search) => {
  const { take, page } = pagination;
  const { rows, count } = await Todo.findAndCountAll({
    where: {
      createdBy: userId,
      ...(search
        ? {
            [Op.or]: [
              {
                title: { [Op.iLike]: `%${search}%` },
              },
              {
                content: { [Op.iLike]: `%${search}%` },
              },
            ],
          }
        : {}),
    },
    order: [['dueDate', 'DESC']],
    offset: (page - 1) * take,
    limit: take,
  });
  const haveNextPage = page * take < count;
  return {
    todos: rows,
    pagination: {
      take,
      page,
      haveNextPage,
      total: count,
    },
  };
};

/**
 *
 * @param {todoId: number}
 */
const getTodo = async (todoId) => {
  // TODO: add userid to filter
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
