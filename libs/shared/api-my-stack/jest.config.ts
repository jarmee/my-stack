/* eslint-disable */
export default {
  displayName: 'shared-api-my-stack',
  preset: '../../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
      isolatedModules: true,
    },
  },
  coverageDirectory: '../../../coverage/libs/shared/api-my-stack',
  transform: { '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular' },
  transformIgnorePatterns: ['node_modules/?!(.*\\.mjs$|@material)'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
  maxWorkers: 1,
  cacheDirectory: '../../../.jest_cache',
};
