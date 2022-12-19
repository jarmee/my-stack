import { execSync } from 'child_process';
import { writeFileContents } from '../core/files.mjs';
import { pipe, task } from '../core/pipeline.mjs';
import { fetch, responseToJSON } from '../core/requests.mjs';

function formatOpemApiFile(fileName) {
  return () => {
    execSync(`npx prettier ${fileName} --write`);
  };
}

pipe('update:open-api-config', () => {
  const openApiSchemaUrl = process.argv[4];
  const openApiSchemaPath = process.argv[5];
  if (!openApiSchemaPath) throw new Error('open-api-schema-path is required');
  if (!openApiSchemaUrl) throw new Error('open-api-schema-url is required');
  pipe.group(
    `🎣 saving Open-API schema from %s to ${openApiSchemaPath}`,
    fetch(), //
    task('✔️  convert response to JSON', responseToJSON()), //
    task('✔️  stringify response', (contents) =>
      JSON.stringify(contents, null, 2)
    ), //
    task(`✔️  write schema`, writeFileContents(openApiSchemaPath)),
    task(`✔️  format schema`, formatOpemApiFile(openApiSchemaPath))
  )(openApiSchemaUrl);
});
