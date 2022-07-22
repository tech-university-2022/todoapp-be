const AUTHs = [
  {
    user: {
      email: 'user1@mail.com',
      id: 'user1',
    },
  },
  {
    user: {
      email: 'user2@mail.com',
      id: 'user2',
    },
  },
  {
    user: {
      email: 'user3@mail.com',
      id: 'user3',
    },
  },
];

const TODOs = [
  {
    id: 'todo1',
    title: 'Title 1',
    content: 'Content 1',
    createdBy: 'user1',
    status: 'Done',
    dueDate: '2022-07-24 15:47:08.02059+00',
    createdAt: '2022-07-14 15:51:41.154884+00',
    updatedAt: '2022-07-14 15:51:41.154884+00',
    categories: 'Work',
  },
  {
    id: 'todo2',
    title: 'Title 2',
    content: 'Content 2',
    createdBy: 'user1',
    status: 'Pending',
    dueDate: '2022-07-24 15:47:08.02059+00',
    createdAt: '2022-07-14 15:51:41.154884+00',
    updatedAt: '2022-07-14 15:51:41.154884+00',
    categories: 'Play',
  },
  {
    id: 'todo3',
    title: 'Title 3',
    content: 'Content 3',
    createdBy: 'user2',
    status: 'Pending',
    dueDate: '2022-07-24 15:47:08.02059+00',
    createdAt: '2022-07-14 15:51:41.154884+00',
    updatedAt: '2022-07-14 15:51:41.154884+00',
    categories: 'Play',
  },
];

module.exports = { AUTHs, TODOs };
