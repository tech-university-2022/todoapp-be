const httpStatus = require('http-status');
const catchAsync = require('../../../src/utils/catchAsync');

describe('Async catching', () => {
  test("TC1 - don't generate error", () => {
    return catchAsync(() => new Promise((resolve) => resolve(true)))({}, {}, () => {}).then((result) =>
      expect(result).toEqual(true)
    );
  });

  test('TC2 - generate error', async () => {
    const json = jest.fn(() => {});
    await catchAsync(() => new Promise((_, reject) => reject(new Error('error'))))(
      {},
      {
        status: () => ({
          json,
        }),
      },
      () => {}
    );

    return expect(json.mock.calls[0][0]).toEqual({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'error',
    });
  });

  test('TC2 - generate unknown error', async () => {
    const json = jest.fn(() => {});
    await catchAsync(() => new Promise((_, reject) => reject(new Error())))(
      {},
      {
        status: () => ({
          json,
        }),
      },
      () => {}
    );

    return expect(json.mock.calls[0][0]).toEqual({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Unknown error',
    });
  });
});
