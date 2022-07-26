const { Sequelize } = require('sequelize');
const configs = require('../../database/config/config');

const config = configs[process.env.NODE_ENV || 'development'];
const { url, ...options } = config;
const sequelize = new Sequelize(url, options);

module.exports = sequelize;
