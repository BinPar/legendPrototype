const testRegex = '(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$';

module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  testRegex: testRegex,
  transform: {
    '^.+\\.jsx?$': require.resolve('babel-jest'),
    '^.+\\.tsx?$': 'ts-jest',
  },
  coverageReporters: ['text', 'lcov', 'json', 'html'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.jest.json',
    },
  },
};
