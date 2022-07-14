const { DataTypes } = require('sequelize');
const UserFactory = require('../../database/models/user');
const sequelize = require('../configs/database');
const { hashPassword } = require('../utils/security');

const User = UserFactory(sequelize, DataTypes);

User.beforeSave((user) => {
  const hashedPassword = hashPassword(user.password);
  // eslint-disable-next-line no-param-reassign
  user.password = hashedPassword;
});

module.exports = User;
