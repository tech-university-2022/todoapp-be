module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Files', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn('gen_random_uuid'),
      },
      name: {
        type: Sequelize.STRING,
      },
      mime: {
        type: Sequelize.STRING,
      },
      size: {
        type: Sequelize.FLOAT,
      },
      provider: {
        type: Sequelize.STRING,
      },
      path: {
        type: Sequelize.STRING,
      },
      pipeFrom: {
        type: Sequelize.STRING,
      },
      thumbnailPipeFrom: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Files');
  },
};
