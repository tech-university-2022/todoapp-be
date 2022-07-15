const { DataTypes } = require('sequelize');
const FileFactory = require('../../database/models/file');
const sequelize = require('../configs/database');

const File = FileFactory(sequelize, DataTypes);

module.exports = File;
