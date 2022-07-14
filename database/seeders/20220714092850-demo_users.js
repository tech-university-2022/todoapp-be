const { hashPassword } = require('../../src/utils/security');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: 'e6089026-0359-11ed-b939-0242ac120002',
        firstName: 'Thuc',
        lastName: 'Le',
        email: 'thuc_le@mckinsey.com',
        password: hashPassword('test123'),
      },
      {
        id: 'e60892d8-0359-11ed-b939-0242ac120002',
        firstName: 'Duong',
        lastName: 'Nguyen',
        email: 'duong_nguyen_xuan@mckinsey.com',
        password: hashPassword('test123'),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
