import { readFileSync, writeFileSync } from "fs";
import glob from "glob";
import { cwd } from "process";

const ALL_FILES_GLOB = (fileName) => `**/${fileName}`;

function __getAllFiles(fileName, ignore) {
  return () => {
    return glob.sync(ALL_FILES_GLOB(fileName), { cache: true, ignore: ignore });
  };
}

function __getFileContents() {
  return (fileName) => {
    return readFileSync(`${cwd()}/${fileName}`, {
      encoding: "utf-8",
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

export {
  __getAllFiles as getAllFiles,
  __getFileContents as readFileContents,
  __writeFileContents as writeFileContents,
  __readJSONFile as readJSONFile,
};
