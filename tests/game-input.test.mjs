import assert from 'node:assert/strict';
import test from 'node:test';

import { directionFromKey, directionFromSwipe } from '../games/input.js';

test('keyboard directions map to the snake controls', () => {
  assert.equal(directionFromKey('ArrowUp'), 'up');
  assert.equal(directionFromKey('ArrowRight'), 'right');
  assert.equal(directionFromKey('ArrowDown'), 'down');
  assert.equal(directionFromKey('ArrowLeft'), 'left');
  assert.equal(directionFromKey('w'), 'up');
  assert.equal(directionFromKey('a'), 'left');
  assert.equal(directionFromKey('s'), 'down');
  assert.equal(directionFromKey('d'), 'right');
  assert.equal(directionFromKey('Escape'), null);
});

test('swipe movement maps to the dominant direction', () => {
  assert.equal(directionFromSwipe({ x: 0, y: 0 }, { x: 40, y: 8 }), 'right');
  assert.equal(directionFromSwipe({ x: 0, y: 0 }, { x: -40, y: 8 }), 'left');
  assert.equal(directionFromSwipe({ x: 0, y: 0 }, { x: 8, y: 40 }), 'down');
  assert.equal(directionFromSwipe({ x: 0, y: 0 }, { x: 8, y: -40 }), 'up');
  assert.equal(directionFromSwipe({ x: 0, y: 0 }, { x: 6, y: 7 }), null);
});
