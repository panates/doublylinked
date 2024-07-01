module.exports = {
  testEnvironment: 'node',
  verbose: true,
  maxWorkers: 1,
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageReporters: ['lcov', 'text'],
  coverageDirectory: '<rootDir>/coverage/',
  testRegex: '.*\\.spec\\.js$',
  moduleNameMapper: {
    '(\\..+)\\.js': '$1',
    doublylinked: '<rootDir>/lib',
  },
};
