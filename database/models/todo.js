const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Todo.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      createdBy: {
        type: DataTypes.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      categories: DataTypes.STRING,
      status: DataTypes.STRING,
      dueDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Todo',
      timestamps: true,
    }
  );
  return Todo;
};
