const auth = require('express').Router();
const { todoController } = require('../controllers');

auth.get('/', todoController.getManyTodos);
auth.get('/:todoId', todoController.getTodo);
auth.post('/', todoController.addTodo);
auth.delete('/:todoId', todoController.deleteTodo);
auth.patch('/:todoId', todoController.editTodo);

module.exports = auth;
