import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('home page exposes the professional site shell', async () => {
  const home = await readFile(new URL('../index.html', import.meta.url), 'utf8');

  assert.match(home, /<meta\s+name=["']viewport["']\s+content=["'][^"']*width=device-width[^"']*["']/i);
  assert.match(home, /<link\s+rel=["']stylesheet["']\s+href=["']styles\.css["']/i);
  assert.match(home, /<script\s+type=["']module["']\s+src=["']script\.js["']/i);
  assert.match(home, /<nav[^>]*aria-label=["']Primary["'][^>]*>/i);
  assert.match(home, /href=["']#about["']/i);
  assert.match(home, /href=["']#projects["']/i);
  assert.match(home, /href=["']#research["']/i);
  assert.match(home, /href=["']games\/["']/i);
  assert.match(home, /id=["']about["']/i);
  assert.match(home, /id=["']projects["']/i);
  assert.match(home, /id=["']research["']/i);
  assert.match(home, /id=["']contact["']/i);
});

test('home page contains no broken absolute-local asset paths', async () => {
  const home = await readFile(new URL('../index.html', import.meta.url), 'utf8');

  assert.doesNotMatch(home, /file:\/\//i);
  assert.doesNotMatch(home, /C:\\|\\\\localhost/i);
});
