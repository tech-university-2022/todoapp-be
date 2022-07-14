const routers = require('express').Router();

const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const todoRouter = require('./todo.router');
const fileRouter = require('./file.router');

routers.use('/auth', authRouter);
routers.use('/user', userRouter);
routers.use('/todo', todoRouter);
routers.use('/file', fileRouter);

module.exports = routers;
