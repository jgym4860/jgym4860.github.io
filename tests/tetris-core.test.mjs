import assert from "node:assert/strict";
import test from "node:test";

import { createTetris, dropTetris, hardDropTetris, moveTetris, rotateTetris, startTetris } from "../assets/tetris-core.js";

test("tetris starts with a board and next piece", () => {
  const game = createTetris({ random: () => 0 });
  assert.equal(game.board.length, 20);
  assert.equal(game.board[0].length, 10);
  assert.equal(game.status, "idle");
  assert.equal(game.current.type, "I");
});

test("tetris moves, rotates, and drops while running", () => {
  const game = startTetris(createTetris({ random: () => 0 }));
  const moved = moveTetris(game, -1);
  assert.equal(moved.current.x, game.current.x - 1);
  const rotated = rotateTetris(moved);
  assert.notDeepEqual(rotated.current.cells, moved.current.cells);
  const dropped = hardDropTetris(rotated, () => 0);
  assert.equal(dropped.board.some((row) => row.some(Boolean)), true);
});

test("tetris clears a completed line and scores", () => {
  const game = startTetris(createTetris({ random: () => 0 }));
  const board = game.board.map((row, index) => index === 19 ? Array(10).fill("#fff") : row);
  const current = { type: "O", color: "#ffe169", cells: [[0, 0], [1, 0], [0, 1], [1, 1]], x: 4, y: 17 };
  const next = hardDropTetris({ ...game, board, current }, () => 0);
  assert.equal(next.lines, 1);
  assert.equal(next.score >= 100, true);
});

test("tetris does not move beyond the board", () => {
  const game = startTetris(createTetris({ random: () => 0 }));
  let left = game;
  for (let index = 0; index < 20; index += 1) left = moveTetris(left, -1);
  assert.equal(left.current.x, 0);
  let falling = game;
  for (let index = 0; index < 30; index += 1) falling = dropTetris(falling, () => 0);
  assert.equal(falling.current.y <= 19, true);
});
