const httpStatus = require('http-status');
const TodoController = require('../../../src/controllers/todo.controller');
const todoService = require('../../../src/services/todo.service');
const logger = require('../../../src/configs/logger');

jest.mock('../../../src/services/todo.service');
jest.mock('../../../src/configs/logger');

const { AUTHs, TODOs } = require('./todo.test.data');

describe('Test API: get many todos', () => {
  beforeEach(() => {
    logger.info.mockReturnValue('Logged');
  });

  const res = {
    send: jest.fn((data, message) => ({ message, ...data })),
    json: jest.fn((status, message) => ({ status, message })),
    // status: jest.fn((statusCode) => ({
    //   json: jest.fn((status, message) => ({ status, message })),
    // })),
  };

  test('TC1 - 0 rows', () => {
    const req = {
      authorized: AUTHs[2],
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
      authorized: AUTHs[1],
      query: {
        take: 10,
        page: 1,
      },
    };

    const queryResult = {
      todos: [TODOs[2]],
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
  test('TC3 - Return 2 rows', () => {
    const req = {
      authorized: AUTHs[1],
      query: {
        take: 10,
        page: 1,
      },
    };

    const queryResult = {
      todos: [TODOs[0], TODOs[1]],
      pagination: {
        take: 10,
        page: 1,
        haveNextPage: false,
        total: 2,
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
