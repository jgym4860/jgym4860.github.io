import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('home and games navigation remain linked', async () => {
  const home = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const games = await readFile(new URL('../games/index.html', import.meta.url), 'utf8');

  assert.match(home, /<a\s+href=["']games\/["'][^>]*>Games<\/a>/i);
  assert.match(games, /<a\s+href=["']\.\.\/["'][^>]*>Home<\/a>/i);
  assert.match(games, /<a\s+href=["']\.\.\/\#about["'][^>]*>About<\/a>/i);
  assert.match(games, /<a\s+href=["']\.\.\/\#projects["'][^>]*>Projects<\/a>/i);
  assert.match(games, /<a\s+href=["']\.\.\/\#research["'][^>]*>Research<\/a>/i);
  assert.match(games, /<a\s+href=["']\.\/"?[^>]*aria-current=["']page["']/i);
});
