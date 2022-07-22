const httpStatus = require('http-status');
const User = require('../../../src/models/user.model');
const File = require('../../../src/models/file.model');
const UserService = require('../../../src/services/user.service');
const FileService = require('../../../src/services/file.service');
const { hashPassword } = require('../../../src/utils/security');
require('dotenv').config('../../../.env');

jest.mock('../../../src/models/user.model');
jest.mock('../../../src/models/file.model');
jest.mock('../../../src/services/file.service');

describe('Testing update API', () => {
  test('TC1 - Update password - Incorrect current password', () => {
    return UserService.updateUser({
      id: 'TC1',
      currentPassword: hashPassword('TC1-password'),
      firstName: 'TC1',
      lastName: 'TC1',
      oldPassword: 'incorrect password',
      newPassword: 'TC1',
      avatar: undefined,
    }).then((result) =>
      expect(result).toEqual({
        error: {
          status: httpStatus.FORBIDDEN,
          message: 'Current password is incorrect',
        },
      })
    );
  });

  test('TC2 - Update password - Correct current password', () => {
    User.update.mockResolvedValue();
    User.findByPk.mockResolvedValue({
      get: () => ({
        id: 'TC2',
      }),
    });

    return UserService.updateUser({
      id: 'TC2',
      currentPassword: hashPassword('TC2-password'),
      firstName: 'TC2',
      lastName: 'TC2',
      oldPassword: 'TC2-password',
      newPassword: 'TC2-new password',
      avatar: undefined,
    }).then((result) =>
      expect(result).toEqual({
        user: {
          id: 'TC2',
        },
      })
    );
  });

  test('TC3 - Update password - Cover undefined old password case', () => {
    return UserService.updateUser({
      id: 'TC3',
      currentPassword: hashPassword('TC3-password'),
      firstName: 'TC3',
      lastName: 'TC3',
      oldPassword: undefined,
      newPassword: 'TC3',
      avatar: undefined,
    }).then((result) =>
      expect(result).toEqual({
        error: {
          status: httpStatus.FORBIDDEN,
          message: 'Current password is incorrect',
        },
      })
    );
  });

  test('TC4 - update avatar', () => {
    User.update.mockResolvedValue();
    User.findByPk.mockResolvedValue({
      get: () => ({
        id: 'TC4',
        avatar: 'TC4-avatar',
      }),
    });
    FileService.writeFile.mockResolvedValue(true);
    File.create.mockResolvedValue({
      get: () => ({
        id: 'TC4-avatar',
      }),
    });

    return UserService.updateUser({
      id: 'TC4',
      avatar: {
        originalname: 'test avatar.jpg',
        mimetype: 'image/jpeg',
        size: 34000,
      },
    }).then((result) =>
      expect(result).toEqual({
        user: {
          id: 'TC4',
          avatar: 'TC4-avatar',
        },
      })
    );
  });
});
