const { DataTypes } = require('sequelize');
const TodoFactory = require('../../database/models/todo');
const sequelize = require('../configs/database');

const Todo = TodoFactory(sequelize, DataTypes);

module.exports = Todo;
