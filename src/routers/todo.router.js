const auth = require('express').Router();
const validate = require('../middlewares/validate');
const todoSchema = require('../schemas/todo.schema');
const { todoController } = require('../controllers');
const authorize = require('../middlewares/authorize');

auth.get('/', validate(todoSchema.getManyTodos), authorize, todoController.getManyTodos);
auth.get('/:todoId', validate(todoSchema.getTodo), authorize, todoController.getTodo);
auth.post('/', validate(todoSchema.addTodo), authorize, todoController.addTodo);
auth.delete('/:todoId', validate(todoSchema.deleteTodo), authorize, todoController.deleteTodo);
auth.patch('/:todoId', validate(todoSchema.editTodo), authorize, todoController.editTodo);

module.exports = auth;
