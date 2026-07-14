import {
  createTetris,
  dropTetris,
  hardDropTetris,
  moveTetris,
  rotateTetris,
  startTetris,
} from "../assets/tetris-core.js";

if (!window.__loopTetrisInitialized) {
  window.__loopTetrisInitialized = true;
  const canvas = document.querySelector("#tetris-board");
  const context = canvas?.getContext("2d");
  const score = document.querySelector("#tetris-score");
  const lines = document.querySelector("#tetris-lines");
  const level = document.querySelector("#tetris-level");
  const status = document.querySelector("#tetris-status");
  const startButton = document.querySelector("#start-tetris");
  const buttons = document.querySelectorAll("[data-tetris-action]");

  if (canvas && context && score && lines && level && status && startButton) {
    const STORAGE_KEY = "loop-tetris-best";
    let game = createTetris();
    let timer = null;

    const setStatus = (message) => { status.textContent = message; };
    const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
    const interval = () => Math.max(90, 700 - (game.level - 1) * 55);
    const drawBlock = (x, y, size, color) => {
      context.fillStyle = color;
      context.fillRect(x * size + 1, y * size + 1, size - 2, size - 2);
      context.fillStyle = "rgba(255,255,255,.18)";
      context.fillRect(x * size + 2, y * size + 2, size - 4, Math.max(2, size * 0.12));
    };
    const draw = () => {
      const size = canvas.width / game.columns;
      context.fillStyle = "#10131a";
      context.fillRect(0, 0, canvas.width, canvas.height);
      game.board.forEach((row, y) => row.forEach((color, x) => { if (color) drawBlock(x, y, size, color); }));
      game.current.cells.forEach(([x, y]) => drawBlock(game.current.x + x, game.current.y + y, size, game.current.color));
      score.textContent = String(game.score).padStart(2, "0");
      lines.textContent = String(game.lines).padStart(2, "0");
      level.textContent = String(game.level).padStart(2, "0");
    };
    const finish = () => { stop(); startButton.textContent = "Play again"; setStatus(`Game over. Score ${game.score}. Press Play again to reset.`); draw(); };
    const tick = () => { game = dropTetris(game); if (game.status === "over") finish(); else { draw(); if (timer) { stop(); timer = setInterval(tick, interval()); } } };
    const begin = () => { if (game.status === "over") game = createTetris(); game = startTetris(game); stop(); timer = setInterval(tick, interval()); startButton.textContent = "Pause"; setStatus("Game running. Stack, clear, and repeat."); canvas.focus(); draw(); };
    const toggle = () => { if (game.status === "running") { game = { ...game, status: "paused" }; stop(); startButton.textContent = "Resume"; setStatus("Game paused."); } else begin(); };
    const action = (name) => {
      if (game.status === "idle" || game.status === "paused") begin();
      if (name === "left") game = moveTetris(game, -1);
      if (name === "right") game = moveTetris(game, 1);
      if (name === "rotate") game = rotateTetris(game);
      if (name === "down") game = dropTetris(game);
      if (name === "hard-drop") game = hardDropTetris(game);
      if (game.status === "over") finish(); else draw();
    };

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") { event.preventDefault(); action("left"); }
      else if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") { event.preventDefault(); action("right"); }
      else if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") { event.preventDefault(); action("rotate"); }
      else if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") { event.preventDefault(); action("down"); }
      else if (event.key === " ") { event.preventDefault(); action("hard-drop"); }
    });
    buttons.forEach((button) => button.addEventListener("click", () => action(button.dataset.tetrisAction)));
    startButton.addEventListener("click", toggle);
    setStatus("Ready. Press Start Tetris or a control to begin.");
    draw();
  }
}
