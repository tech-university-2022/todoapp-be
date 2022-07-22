const uuidv4 = require('uuid').v4;
const fs = require('fs');
const httpStatus = require('http-status');
const path = require('path');

const File = require('../../../src/models/file.model');
const FileService = require('../../../src/services/file.service');

jest.mock('../../../src/models/file.model');

describe('Testing write file api', () => {
  test('TC1 - Write file successfully', () => {
    const fileId = uuidv4();
    const testFileBuffer = fs.readFileSync('./test/unit/services/test.txt');
    return FileService.writeFile(fileId, {
      buffer: testFileBuffer,
      originalname: 'test.txt',
    }).then(() => expect(fs.readFileSync(`./public/${fileId}_test.txt`)).toEqual(testFileBuffer));
  });
});

describe('Testing read file api', () => {
  test('TC2 - Write file then read file successfully', async () => {
    const fileId = uuidv4();
    const testFileBuffer = fs.readFileSync('./test/unit/services/test.txt');

    const fileInDb = {
      id: fileId,
      path: `${fileId}_test.txt`,
    };
    File.findByPk.mockResolvedValue({
      get: () => fileInDb,
    });

    await FileService.writeFile(fileId, {
      buffer: testFileBuffer,
      originalname: 'test.txt',
    });

    const result = await FileService.getFile(fileId);

    return expect(JSON.stringify(result)).toEqual(
      JSON.stringify({
        file: fileInDb,
        stream: fs.createReadStream(path.join(process.cwd(), 'public', fileInDb.path)),
      })
    );
  });

  test('TC3 - File not found', async () => {
    const fileId = uuidv4();
    File.findByPk.mockResolvedValue(undefined);

    const result = await FileService.getFile(fileId);

    return expect(result).toEqual({
      error: {
        status: httpStatus.BAD_REQUEST,
        message: 'File not found',
      },
    });
  });
});
