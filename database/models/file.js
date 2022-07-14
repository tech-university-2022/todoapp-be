const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  File.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      mime: DataTypes.STRING,
      size: DataTypes.FLOAT,
      provider: DataTypes.STRING,
      path: DataTypes.STRING,
      pipeFrom: DataTypes.STRING,
      thumbnailPipeFrom: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'File',
      timestamps: true,
    }
  );
  return File;
};
