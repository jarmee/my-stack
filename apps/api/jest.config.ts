/* eslint-disable */
export default {
  displayName: 'api',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      isolatedModules: true,
    },
  },
  testEnvironment: 'node',
  transform: { '^.+\\.[tj]s$': 'ts-jest' },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/api',
  maxWorkers: 1,
  cacheDirectory: '../../.jest_cache',
  transformIgnorePatterns: ['node_modules/?!(.*\\.mjs$|@material)'],
};
