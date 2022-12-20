import { execSync } from 'child_process';
import { pipe, task } from '../core/pipeline.mjs';
import { addToContext, getFromContext } from '../core/context.mjs';
import { writeFileContents } from '../core/files.mjs';

const GET_GIT_BRANCH_NAME_COMMAND = 'git rev-parse --abbrev-ref HEAD';

function getGitBranchName() {
  return () => {
    return execSync(GET_GIT_BRANCH_NAME_COMMAND, {
      encoding: 'utf-8',
    }).replace('\n', '');
  };
}

const GET_GIT_COMMIT_HASH = 'git rev-parse HEAD';

function getGitCommitHash() {
  return () => {
    return execSync(GET_GIT_COMMIT_HASH, {
      encoding: 'utf-8',
    }).replace('\n', '');
  };
}

function getBuildDate() {
  return () => {
    return new Date().toISOString();
  };
}

function toBuildInfoFileContent() {
  return (gitBranchName, gitCommitHash, buildDate) => {
    return `export const GIT_BRANCH = "${gitBranchName}";
    export const GIT_COMMIT_HAS = "${gitCommitHash}";
    export const BUILD_DATE = "${buildDate}";
    `;
  };
}

function formatBuildInfoFile(filePath) {
  return () => {
    execSync(`npx prettier ${filePath} --write`);
  };
}

pipe('update:build-info', () => {
  const buildInfoDestinationPath = process.argv[4];
  if (!buildInfoDestinationPath)
    throw new Error('build-info-destination-path is required');
  pipe.group(
    `🧑🏻‍🎨 write build into file to ${buildInfoDestinationPath}`,
    task(
      '✔️  get git branch name',
      addToContext('gitBranchName', getGitBranchName())
    ),
    task(
      '✔️  get git commit hash',
      addToContext('gitCommitHash', getGitCommitHash())
    ),
    task('✔️  get build date', addToContext('buildDate', getBuildDate())),
    task(
      '✔️  create build info file content',
      getFromContext(
        ['gitBranchName', 'gitCommitHash', 'buildDate'],
        toBuildInfoFileContent()
      )
    ),
    task(
      '✔️  write build info file',
      writeFileContents(buildInfoDestinationPath)
    ),
    task(
      '✔️  format build info file',
      formatBuildInfoFile(buildInfoDestinationPath)
    )
  )();
});
