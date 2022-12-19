import { readFileSync, writeFileSync } from 'fs';
import glob from 'glob';
import { cwd } from 'process';
import { execSync } from 'child_process';

const ALL_FILES_GLOB = (fileName) => `**/${fileName}`;

function __getAllFiles(fileName, ignore) {
  return () => {
    return glob.sync(ALL_FILES_GLOB(fileName), { cache: true, ignore: ignore });
  };
}

function __getFileContents() {
  return (fileName) => {
    return readFileSync(`${cwd()}/${fileName}`, {
      encoding: 'utf-8',
    });
  };
}

function __writeFileContents(filePath) {
  return (contents, fileName) => {
    if (!filePath) {
      return writeFileSync(`${cwd()}/${fileName}`, contents);
    } else {
      return writeFileSync(`${filePath}`, contents);
    }
  };
}

function __readJSONFile(fileName) {
  return (fileNameProvidedByPipe) => {
    return JSON.parse(__getFileContents()(fileName ?? fileNameProvidedByPipe));
  };
}

function __formatFileWithPrettier(fileName) {
  return (_, fromParent) => {
    execSync(`npx prettier ${fileName ?? fromParent} --write`);
  };
}

function __removeFileNameFromPath(filePath) {
  return (_, fromParent) => {
    const path = filePath ?? fromParent;
    return path.substring(0, path.lastIndexOf('/'));
  };
}

export {
  __getAllFiles as getAllFiles,
  __getFileContents as readFileContents,
  __writeFileContents as writeFileContents,
  __readJSONFile as readJSONFile,
  __formatFileWithPrettier as formatFileWithPrettier,
  __removeFileNameFromPath as removeFileNameFromPath,
};
