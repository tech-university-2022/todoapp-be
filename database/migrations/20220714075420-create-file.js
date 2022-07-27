module.exports = {
  async up(queryInterface, Sequelize) {
    // Install uuid
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    // create file entity
    await queryInterface.createTable('Files', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn('uuid_generate_v4'),
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
