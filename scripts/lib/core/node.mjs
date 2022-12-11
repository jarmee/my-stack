import { readFileSync } from 'fs';

function __packageJSON() {
  return () => {
    const packageJSONString = readFileSync('package.json', {
      encoding: 'utf8',
    });
    return JSON.parse(packageJSONString);
  };
}

export { __packageJSON as getPackageJSON };
