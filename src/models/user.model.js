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

User.beforeBulkUpdate((data) => {
  if (data.attributes.password) {
    const hashedPassword = hashPassword(data.attributes.password);
    // eslint-disable-next-line no-param-reassign
    data.attributes.password = hashedPassword;
  }
});

module.exports = User;
