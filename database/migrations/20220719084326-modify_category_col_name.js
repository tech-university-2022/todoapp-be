module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Todos', 'categories', Sequelize.STRING);
    await queryInterface.removeColumn('Todos', 'category');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('Todos', 'category', Sequelize.STRING);
    await queryInterface.removeColumn('Todos', 'categories');
  },
};
