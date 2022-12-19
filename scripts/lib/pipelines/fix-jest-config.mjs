import { existsSync, readFileSync } from 'fs';
import { formatFileWithPrettier, writeFileContents } from '../core/files.mjs';
import { filter, map, objectToString } from '../core/javascript.mjs';
import { pipe, task } from '../core/pipeline.mjs';
import {
  getProjectPaths,
  toRelativeProjectRootPath,
} from '../core/projects.mjs';

function addMaxWorkersIfNotPresent() {
  return (jestConfig) => {
    if (!jestConfig['maxWorkers']) {
      jestConfig['maxWorkers'] = 1;
    }
    return jestConfig;
  };
}

function addCacheDirectoryIfNotPresent() {
  return (jestConfig, fileName) => {
    jestConfig['cacheDirectory'] =
      toRelativeProjectRootPath()(fileName) + '.jest_cache';
    return jestConfig;
  };
}

function addTransformIgnorePatternsIfNotPresent() {
  return (jestConfig) => {
    jestConfig['transformIgnorePatterns'] = [
      'node_modules/?!(.*\\.mjs$|@material)',
    ];
    return jestConfig;
  };
}

function addIsolatedModulesIfNotPresent() {
  return (jestConfig) => {
    jestConfig['globals']['ts-jest']['isolatedModules'] = true;
    return jestConfig;
  };
}

function toStringFileContents() {
  return (jestConfig) => {
    const header = ['/* eslint-disable */', 'export default '].join('\n');
    return `${header} ${objectToString()(jestConfig)}`;
  };
}

function loadJestConfig() {
  return (fileName) => {
    const contents = readFileSync(fileName)
      .toString()
      .replace('export default {', '')
      .replace('/* eslint-disable */', '')
      .replace('};', '');
    return eval('({' + contents + '})');
  };
}

pipe(
  'fix:jest',
  pipe.group(
    '🔎  Search all jest.config.ts files',
    task('✔  get project paths', getProjectPaths()),
    task(
      '✔  prepare jest.config.ts path',
      map((projectPath) => `${projectPath}/jest.config.ts`)
    ),
    task(
      '✔  filter non existing jest.config.ts files',
      filter((jestConfigPath) => existsSync(jestConfigPath))
    )
  ),
  pipe.each(
    '🔧 Fix jest.config files:',
    pipe.group(
      '- %s',
      task('✔  load jest.config', loadJestConfig()),
      task('✔  add maxWorkers=1', addMaxWorkersIfNotPresent()),
      task('✔  add cacheDirectory', addCacheDirectoryIfNotPresent()),
      task(
        '✔  update transformIgnorePatterns',
        addTransformIgnorePatternsIfNotPresent()
      ),
      task('✔  add isolatedModules=true', addIsolatedModulesIfNotPresent()),
      task('✔  transform jest.config to string', toStringFileContents()),
      task('✔  write jest.config', writeFileContents()),
      task('✔  format file', formatFileWithPrettier())
    )
  )
);
