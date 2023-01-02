// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./jest.config');

config.rootDir = 'test';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
config.testMatch = ['**/*\\.e2e-spec\\.ts'];

module.exports = config;
