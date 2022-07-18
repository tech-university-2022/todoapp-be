module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Todos', [
      {
        title: 'Test 1',
        content: 'Example content 1',
        createdBy: 'e6089026-0359-11ed-b939-0242ac120002',
        category: 'Work',
        status: 'Done',
        dueDate: '2022-07-20 15:47:08.02059+00',
      },
      {
        title: 'Test 2',
        content: 'Example content 2',
        createdBy: 'e60892d8-0359-11ed-b939-0242ac120002',
        category: 'Play',
        status: 'Pending',
        dueDate: '2022-07-24 15:47:08.02059+00',
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Todos', null, {});
  },
};
