import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("games page exposes accessible snake and tetris controls", async () => {
  const page = await readFile(new URL("../games/index.html", import.meta.url), "utf8");

  assert.match(page, /<link\s+rel=["']icon["']\s+href=["']\.\.\/favicon\.svg["']\s+type=["']image\/svg\+xml["']/i);
  assert.match(page, /<canvas[^>]+id=["']game-board["'][^>]+aria-label=/i);
  assert.match(page, /id=["']game-status["'][^>]+aria-live=["']polite["']/i);
  assert.match(page, /<button[^>]+id=["']start-game["']/i);
  for (const direction of ["up", "right", "down", "left"]) {
    assert.match(page, new RegExp(`data-direction=["']${direction}["']`, "i"));
  }
  assert.match(page, /Keyboard:<\/strong>\s*Arrow keys or WASD/i);
  assert.match(page, /Touch:<\/strong>\s*Swipe the board or use the controls/i);
  assert.match(page, /Built by Dexter/i);
  assert.match(page, /<script\s+type=["']module["']\s+src=["']\.\/game\.js["']/i);

  assert.match(page, /id=["']tetris-board["'][^>]+aria-label=/i);
  assert.match(page, /id=["']start-tetris["']/i);
  assert.match(page, /id=["']tetris-status["'][^>]+aria-live=["']polite["']/i);
  for (const action of ["left", "rotate", "right", "down", "hard-drop"]) {
    assert.match(page, new RegExp(`data-tetris-action=["']${action}["']`, "i"));
  }
  assert.match(page, /<script\s+type=["']module["']\s+src=["']\.\/tetris\.js["']/i);
});
