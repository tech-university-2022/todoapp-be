module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Todos', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn('gen_random_uuid'),
      },
      title: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.STRING,
      },
      createdBy: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      category: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      dueDate: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Todos');
  },
};
