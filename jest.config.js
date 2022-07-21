module.exports = {
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  restoreMocks: true,
  rootDir: './',
  coveragePathIgnorePatterns: ['node_modules', 'src/config', 'src/index.js', 'tests'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
};
