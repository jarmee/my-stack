/* eslint-disable */
export default {
  displayName: 'shared-util-build-info',
  preset: '../../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      isolatedModules: true,
    },
  },
  transform: { '^.+\\.[tj]sx?$': 'ts-jest' },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/shared/util-build-info',
  maxWorkers: 1,
  cacheDirectory: '../../../.jest_cache',
  transformIgnorePatterns: ['node_modules/?!(.*\\.mjs$|@material)'],
};
