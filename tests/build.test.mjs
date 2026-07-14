import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import test from 'node:test';

const execFileAsync = promisify(execFile);

test('build script creates a GitHub Pages dist directory', async () => {
  await execFileAsync(process.execPath, ['scripts/build.mjs'], {
    cwd: new URL('..', import.meta.url),
  });

  const distIndex = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
  const distStyles = await readFile(new URL('../dist/styles.css', import.meta.url), 'utf8');
  const distScript = await readFile(new URL('../dist/script.js', import.meta.url), 'utf8');
  const distGames = await readFile(new URL('../dist/games/index.html', import.meta.url), 'utf8');

  assert.match(distIndex, /<title>Professional Portfolio<\/title>/i);
  assert.ok(distStyles.length > 0);
  assert.ok(distScript.length > 0);
  assert.match(distGames, /Loop Snake/i);
});
