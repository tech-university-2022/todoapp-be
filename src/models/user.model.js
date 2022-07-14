const { DataTypes } = require('sequelize');
const UserFactory = require('../../database/models/user');
const sequelize = require('../configs/database');

const User = UserFactory(sequelize, DataTypes);

module.exports = User;
