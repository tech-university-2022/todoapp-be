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

describe('Test API: get todo', () => {
  beforeEach(() => {
    logger.info.mockReturnValue('Logged');
  });

  const res = {
    send: jest.fn((data, message) => ({ message, ...data })),
    json: jest.fn((status, message) => ({ status, message })),
    status: jest.fn((statusCode) => ({
      json: jest.fn(({ status, message }) => ({ status, message })),
    })),
  };

  test('TC1 - todoId is not exist', () => {
    const req = {
      authorized: AUTHs[0],
      params: {
        todoId: 'Test',
      },
    };

    const queryResult = null;

    const correctedResult = {
      status: httpStatus.BAD_REQUEST,
      message: 'The requested todo is not exists on database',
    };

    todoService.getTodo.mockResolvedValue(queryResult);

    return TodoController.getTodo(req, res).then((result) => {
      return expect(result).toEqual(correctedResult);
    });
  });

  test('TC2 - user do not have permission', () => {
    const req = {
      authorized: AUTHs[1],
      params: {
        todoId: 'todo1',
      },
    };

    const queryResult = TODOs[0];

    const correctedResult = {
      status: httpStatus.BAD_REQUEST,
      message: 'The user do not have permission to reveal this todo',
    };

    todoService.getTodo.mockResolvedValue(queryResult);

    return TodoController.getTodo(req, res).then((result) => {
      return expect(result).toEqual(correctedResult);
    });
  });

  test('TC3 - got todo successfully', () => {
    const req = {
      authorized: AUTHs[0],
      params: {
        todoId: 'todo1',
      },
    };

    const queryResult = TODOs[0];

    const correctedResult = {
      message: 'OK',
      todo: queryResult,
    };

    todoService.getTodo.mockResolvedValue(queryResult);

    return TodoController.getTodo(req, res).then((result) => {
      return expect(result).toEqual(correctedResult);
    });
  });
});

describe('Test API: add todo', () => {
  beforeEach(() => {
    logger.info.mockReturnValue('Logged');
  });

  const res = {
    send: jest.fn((data, message) => ({ message, ...data })),
    json: jest.fn((status, message) => ({ status, message })),
    status: jest.fn((statusCode) => ({
      json: jest.fn(({ status, message }) => ({ status, message })),
    })),
  };

  test('TC1 - Add successfully', () => {
    const req = {
      authorized: AUTHs[0],
      body: {
        title: 'Add from postman 6',
        content: 'I am sleepy',
        category: 'Heheh',
        status: 'Wait',
        dueDate: '2022-07-24 15:47:08.02059+00',
      },
    };

    const queryResult = {
      message: 'Add todo successfully',
      addedTodo: {
        id: 'A test id',
        ...req.body,
        createdBy: 'user id',
        updatedAt: 'time 1',
        createdAt: 'time 2',
      },
    };

    const correctedResult = {
      message: 'Add todo successfully',
      addedTodo: queryResult,
    };

    todoService.addTodo.mockResolvedValue(queryResult);

    return TodoController.addTodo(req, res).then((result) => {
      return expect(result).toEqual(correctedResult);
    });
  });
});
describe('Test API: delete todo', () => {
  beforeEach(() => {
    logger.info.mockReturnValue('Logged');
  });

  const res = {
    send: jest.fn((data, message) => ({ message, ...data })),
    json: jest.fn((status, message) => ({ status, message })),
    status: jest.fn((statusCode) => ({
      json: jest.fn(({ status, message }) => ({ status, message })),
    })),
  };

  test('TC1 - todoId is not exist', () => {
    const req = {
      authorized: AUTHs[0],
      params: {
        todoId: 'Test',
      },
    };

    const queryResult = null;

    const correctedResult = {
      status: httpStatus.BAD_REQUEST,
      message: 'The requested todo is not exists on database',
    };

    todoService.getTodo.mockResolvedValue(queryResult);

    return TodoController.deleteTodo(req, res).then((result) => {
      return expect(result).toEqual(correctedResult);
    });
  });

  test('TC2 - user do not have permission', () => {
    const req = {
      authorized: AUTHs[1],
      params: {
        todoId: 'todo1',
      },
    };

    const queryResult = TODOs[0];

    const correctedResult = {
      status: httpStatus.BAD_REQUEST,
      message: 'The user do not have permission to reveal this todo',
    };

    todoService.getTodo.mockResolvedValue(queryResult);

    return TodoController.deleteTodo(req, res).then((result) => {
      return expect(result).toEqual(correctedResult);
    });
  });

  test('TC3 - delete todo fail', () => {
    const req = {
      authorized: AUTHs[0],
      params: {
        todoId: 'todo1',
      },
    };

    const queryResult = 0;

    const correctedResult = {
      message: 'Can not delete todo!',
    };

    todoService.getTodo.mockResolvedValue(TODOs[0]);
    todoService.deleteTodo.mockResolvedValue(queryResult);

    return TodoController.deleteTodo(req, res).then((result) => {
      return expect(result).toEqual(correctedResult);
    });
  });

  test('TC4 - delete todo successfully', () => {
    const req = {
      authorized: AUTHs[0],
      params: {
        todoId: 'todo1',
      },
    };

    const queryResult = 1;

    const correctedResult = {
      message: 'Delete todo successfully!',
    };

    todoService.deleteTodo.mockResolvedValue(queryResult);

    return TodoController.deleteTodo(req, res).then((result) => {
      return expect(result).toEqual(correctedResult);
    });
  });
});

describe('Test API: edit todo', () => {
  beforeEach(() => {
    logger.info.mockReturnValue('Logged');
  });

  const res = {
    send: jest.fn((data, message) => ({ message, ...data })),
    json: jest.fn((status, message) => ({ status, message })),
    status: jest.fn((statusCode) => ({
      json: jest.fn(({ status, message }) => ({ status, message })),
    })),
  };

  test('TC1 - todoId is not exist', () => {
    const req = {
      authorized: AUTHs[0],
      params: {
        todoId: 'Test',
      },
    };

    const queryResult = null;

    const correctedResult = {
      status: httpStatus.BAD_REQUEST,
      message: 'The requested todo is not exists on database',
    };

    todoService.getTodo.mockResolvedValue(queryResult);

    return TodoController.editTodo(req, res).then((result) => {
      return expect(result).toEqual(correctedResult);
    });
  });

  test('TC2 - user do not have permission', () => {
    const req = {
      authorized: AUTHs[1],
      params: {
        todoId: 'todo1',
      },
    };

    const queryResult = TODOs[0];

    const correctedResult = {
      status: httpStatus.BAD_REQUEST,
      message: 'The user do not have permission to reveal this todo',
    };

    todoService.getTodo.mockResolvedValue(queryResult);

    return TodoController.editTodo(req, res).then((result) => {
      return expect(result).toEqual(correctedResult);
    });
  });

  test('TC3 - edit todo fail', () => {
    const req = {
      authorized: AUTHs[0],
      params: {
        todoId: 'todo1',
      },
    };

    const queryResult = 0;

    const correctedResult = {
      message: 'Edit failed!',
    };

    todoService.getTodo.mockResolvedValue(TODOs[0]);
    todoService.editTodo.mockResolvedValue(queryResult);

    return TodoController.editTodo(req, res).then((result) => {
      return expect(result).toEqual(correctedResult);
    });
  });

  test('TC4 - edit todo successfully', () => {
    const req = {
      authorized: AUTHs[0],
      params: {
        todoId: 'todo1',
      },
    };

    const queryResult = 1;

    const correctedResult = {
      message: 'Edit successfully!',
      todo: TODOs[0],
    };
    todoService.getTodo.mockResolvedValue(TODOs[0]);
    todoService.editTodo.mockResolvedValue(queryResult);

    return TodoController.editTodo(req, res).then((result) => {
      return expect(result).toEqual(correctedResult);
    });
  });
});
