const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const AuthServices = require('../../../src/services/auth.service');
const User = require('../../../src/models/user.model');
const { hashPassword } = require('../../../src/utils/security');
require('dotenv').config('../../../.env');

jest.mock('../../../src/models/user.model');
jest.mock('jsonwebtoken');

describe('Testing login API', () => {
  test('TC1 - Incorrect email - Should generate error: incorrect email or password', () => {
    User.findOne.mockResolvedValue(null);

    return AuthServices.logIn({ email: 'TC1', password: 'TC1' }).then((result) =>
      expect(result).toEqual({
        error: {
          status: httpStatus.UNAUTHORIZED,
          message: 'Incorrect email or password',
        },
      })
    );
  });

  test('TC2 - Incorrect password - Should generate error: incorrect email or password', () => {
    User.findOne.mockResolvedValue({
      get: () => ({
        password: 'Not matched password',
      }),
    });

    return AuthServices.logIn({ email: 'TC2', password: 'TC2' }).then((result) =>
      expect(result).toEqual({
        error: {
          status: httpStatus.UNAUTHORIZED,
          message: 'Incorrect email or password',
        },
      })
    );
  });

  test('TC3 - Correct email & password - Return token', () => {
    User.findOne.mockResolvedValue({
      get: () => ({
        id: 'TC3',
        password: hashPassword('TC3-password'),
      }),
    });
    jwt.sign.mockReturnValue('TC3-token');

    return AuthServices.logIn({ email: 'TC2', password: 'TC3-password' }).then((result) =>
      expect(result).toEqual({
        token: {
          token: 'TC3-token',
          expiresIn: process.env.TOKEN_EXPIRES_IN,
        },
        user: {
          id: 'TC3',
        },
      })
    );
  });
});

describe('Testing signup API', () => {
  test('TC4 - User exists - Should generate error: User already exists', () => {
    User.findOne.mockResolvedValue({
      id: 'TC4',
    });

    return AuthServices.signUp({ email: 'TC4', password: 'TC4', firstName: 'TC4', lastName: 'TC4' }).then((result) =>
      expect(result).toEqual({
        error: {
          status: httpStatus.BAD_REQUEST,
          message: 'User already exists',
        },
      })
    );
  });
  test('TC5 - Signup successfully', () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({
      get: () => ({
        id: 'TC5',
        password: 'any password',
      }),
    });

    return AuthServices.signUp({ email: 'TC5', password: 'TC5', firstName: 'TC5', lastName: 'TC5' }).then((result) =>
      expect(result).toEqual({
        user: {
          id: 'TC5',
        },
      })
    );
  });
});

afterAll(() => {
  // TODO: remove mocking
});
