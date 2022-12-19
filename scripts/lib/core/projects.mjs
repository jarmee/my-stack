import { getAllFiles } from './files.mjs';

function __getProjectPaths() {
  return () => {
    const projectFiles = getAllFiles('project.json', 'node_modules/**')();
    return projectFiles.map((path) => path.replace('/project.json', ''));
  };
}

function __toRelativeProjectRootPath() {
  return (filePath) => {
    let path = '';
    const depth = (filePath.match(/\//g) || []).length;
    for (let i = 0; i < depth; i++) {
      path = path + '../';
    }
    return path;
  };
}

export {
  __getProjectPaths as getProjectPaths,
  __toRelativeProjectRootPath as toRelativeProjectRootPath,
};
