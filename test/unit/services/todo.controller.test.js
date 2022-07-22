const httpStatus = require('http-status');
const TodoController = require('../../../src/controllers/todo.controller');
// const sendResponse = require('../../../src/utils/sendResponse');
const sendError = require('../../../src/utils/sendError');
const todoService = require('../../../src/services/todo.service');
const logger = require('../../../src/configs/logger');

// jest.mock('../../../src/utils/sendResponse');
jest.mock('../../../src/utils/sendError');
jest.mock('../../../src/services/todo.service');
jest.mock('../../../src/configs/logger');

describe('Test API: get many todos', () => {
  beforeEach(() => {
    logger.info.mockReturnValue('Logged');
  });

  const res = {
    send: jest.fn((data, message) => ({ message, ...data })),
    json: jest.fn((status, message) => ({ status, message })),
  };

  test('TC1 - Empty userId', () => {
    const req = {
      authorized: {
        user: {
          email: 'TC1@mail.com',
          id: 'TC1',
        },
      },
      query: {
        take: 10,
        page: 1,
      },
    };

    const queryResult = {
      todos: [],
      pagination: {
        take: 10,
        page: 1,
        haveNextPage: false,
        total: 0,
      },
    };

    const correctedResult = {
      message: 'Empty todos',
      data: {
        todos: [],
        pagination: {
          take: 10,
          page: 1,
          haveNextPage: false,
          total: 0,
        },
      },
    };

    todoService.getManyTodos.mockResolvedValue(queryResult);

    return TodoController.getManyTodos(req, res).then((result) => {
      return expect(result).toEqual(correctedResult);
    });
  });

  test('TC2 - Return 1 row', () => {
    const req = {
      authorized: {
        user: {
          email: 'TC1@mail.com',
          id: 'TC1',
        },
      },
      query: {
        take: 10,
        page: 1,
      },
    };

    const queryResult = {
      todos: [
        {
          id: 'defe5f10-2469-4eb7-911d-d930f2e1a5a7',
          title: 'Test 2',
          content: 'Example content 2',
          createdBy: 'e60892d8-0359-11ed-b939-0242ac120002',
          status: 'Pending',
          dueDate: '2022-07-24 15:47:08.02059+00',
          createdAt: '2022-07-14 15:51:41.154884+00',
          updatedAt: '2022-07-14 15:51:41.154884+00',
          categories: null,
        },
      ],
      pagination: {
        take: 10,
        page: 1,
        haveNextPage: false,
        total: 1,
      },
    };

    const correctedResult = {
      message: 'OK',
      data: {
        ...queryResult,
      },
    };

    todoService.getManyTodos.mockResolvedValue(queryResult);

    return TodoController.getManyTodos(req, res).then((result) => {
      return expect(result).toEqual(correctedResult);
    });
  });
});
