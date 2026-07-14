import assert from 'node:assert/strict';
import test from 'node:test';

import { createGame, queueDirection, startGame, stepGame } from '../assets/snake-core.js';

test('snake advances one cell per tick', () => {
  const game = startGame(createGame({ columns: 12, rows: 12, random: () => 0 }));
  const next = stepGame(game, () => 0);

  assert.equal(next.snake[0].x, game.snake[0].x + 1);
  assert.equal(next.snake[0].y, game.snake[0].y);
  assert.equal(next.snake.length, game.snake.length);
  assert.equal(next.score, 0);
});

test('snake grows and scores when food is eaten', () => {
  const initial = startGame(createGame({ columns: 12, rows: 12, random: () => 0 }));
  const head = initial.snake[0];
  const game = { ...initial, food: { x: head.x + 1, y: head.y } };
  const next = stepGame(game, () => 0.5);

  assert.equal(next.snake.length, game.snake.length + 1);
  assert.equal(next.score, 1);
  assert.equal(next.status, 'running');
});

test('snake refuses an immediate reverse direction', () => {
  const game = createGame({ columns: 12, rows: 12, random: () => 0 });
  const next = queueDirection(game, 'left');

  assert.equal(next.queuedDirection, 'right');
});

test('wall and body collisions end the game', () => {
  const wallGame = startGame(createGame({ columns: 8, rows: 8, random: () => 0 }));
  const wallState = {
    ...wallGame,
    snake: [{ x: 7, y: 3 }, { x: 6, y: 3 }, { x: 5, y: 3 }],
    direction: 'right',
    queuedDirection: 'right',
  };
  const wallNext = stepGame(wallState, () => 0);
  assert.equal(wallNext.status, 'over');

  const bodyGame = startGame(createGame({ columns: 8, rows: 8, random: () => 0 }));
  const bodyState = {
    ...bodyGame,
    snake: [
      { x: 4, y: 4 },
      { x: 4, y: 5 },
      { x: 3, y: 5 },
      { x: 3, y: 4 },
    ],
    direction: 'down',
    queuedDirection: 'down',
  };
  const bodyNext = stepGame(bodyState, () => 0);
  assert.equal(bodyNext.status, 'over');
});
