import { createGame, queueDirection, startGame, stepGame } from "../assets/snake-core.js";
import { directionFromKey, directionFromSwipe } from "./input.js";

if (!window.__loopSnakeInitialized) {
  window.__loopSnakeInitialized = true;

  const canvas = document.querySelector("#game-board");
  const context = canvas?.getContext("2d");
  const score = document.querySelector("#game-score");
  const best = document.querySelector("#game-best");
  const status = document.querySelector("#game-status");
  const startButton = document.querySelector("#start-game");
  const directionButtons = document.querySelectorAll("[data-direction]");

  if (canvas && context && score && best && status && startButton) {
    const STORAGE_KEY = "loop-snake-best";
    const MIN_CANVAS = 280;
    let game = createGame();
    let timer = null;
    let pointerStart = null;
    let bestScore = Number(window.localStorage.getItem(STORAGE_KEY) ?? 0) || 0;

    const setStatus = (message) => {
      status.textContent = message;
    };

    const saveBest = () => {
      try {
        window.localStorage.setItem(STORAGE_KEY, String(bestScore));
      } catch {
        // Storage can be unavailable in some privacy modes.
      }
    };

    const stopTimer = () => {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    };
    window.__stopLoopSnake = () => {
      stopTimer();
      if (game.status === "running") {
        game = { ...game, status: "paused" };
        startButton.textContent = "Resume";
        setStatus("Paused while another game is active.");
        draw();
      }
    };

    const resizeCanvas = () => {
      const size = Math.max(MIN_CANVAS, Math.floor(canvas.getBoundingClientRect().width));
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = size * ratio;
      canvas.height = size * ratio;
      draw();
    };

    const drawCell = (x, y, size, radius, color) => {
      context.fillStyle = color;
      const px = Math.round(x);
      const py = Math.round(y);
      if (typeof context.roundRect === "function") {
        context.beginPath();
        context.roundRect(px, py, size, size, radius);
        context.fill();
        return;
      }

      const r = Math.min(radius, size / 2);
      context.beginPath();
      context.moveTo(px + r, py);
      context.lineTo(px + size - r, py);
      context.quadraticCurveTo(px + size, py, px + size, py + r);
      context.lineTo(px + size, py + size - r);
      context.quadraticCurveTo(px + size, py + size, px + size - r, py + size);
      context.lineTo(px + r, py + size);
      context.quadraticCurveTo(px, py + size, px, py + size - r);
      context.lineTo(px, py + r);
      context.quadraticCurveTo(px, py, px + r, py);
      context.fill();
    };

    const draw = () => {
      const cell = canvas.width / game.columns;
      const gap = Math.max(1.5, cell * 0.1);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#10131a";
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.strokeStyle = "rgba(255,255,255,.045)";
      context.lineWidth = 1;
      for (let index = 1; index < game.columns; index += 1) {
        const offset = index * cell;
        context.beginPath();
        context.moveTo(offset, 0);
        context.lineTo(offset, canvas.height);
        context.stroke();
        context.beginPath();
        context.moveTo(0, offset);
        context.lineTo(canvas.width, offset);
        context.stroke();
      }

      if (game.food) {
        context.fillStyle = "#ff6b6b";
        context.beginPath();
        context.arc((game.food.x + 0.5) * cell, (game.food.y + 0.5) * cell, cell * 0.3, 0, Math.PI * 2);
        context.fill();
      }

      game.snake.forEach((segment, index) => {
        const color = index === 0 ? "#efffc8" : "#c9ff47";
        drawCell(segment.x * cell + gap, segment.y * cell + gap, cell - gap * 2, cell * 0.22, color);
      });

      score.textContent = String(game.score).padStart(2, "0");
      best.textContent = String(bestScore).padStart(2, "0");
    };

    const endGame = () => {
      stopTimer();
      bestScore = Math.max(bestScore, game.score);
      saveBest();
      startButton.textContent = "Play again";
      setStatus(`Game over. Score ${game.score}. Press Play again to reset.`);
      draw();
    };

    const tick = () => {
      game = stepGame(game, Math.random);
      if (game.status === "over") {
        endGame();
        return;
      }
      draw();
    };

    const begin = () => {
      window.__stopLoopTetris?.();
      window.__activeGame = "snake";
      if (game.status === "over") {
        game = createGame();
      }
      game = startGame(game);
      stopTimer();
      timer = window.setInterval(tick, 120);
      startButton.textContent = "Pause";
      setStatus("Game running. Use arrow keys, WASD, swipe, or the direction controls.");
      canvas.focus();
      draw();
    };

    const toggleGame = () => {
      if (game.status === "running") {
        game = { ...game, status: "paused" };
        stopTimer();
        startButton.textContent = "Resume";
        setStatus("Game paused.");
        return;
      }
      begin();
    };

    const applyDirection = (direction) => {
      if (!direction) return;
      if (window.__activeGame && window.__activeGame !== "snake") return;
      window.__activeGame = "snake";
      game = queueDirection(game, direction);
      if (game.status === "idle") {
        begin();
      } else {
        draw();
      }
    };

    document.addEventListener("keydown", (event) => {
      if (event.target.closest?.(".tetris-panel")) return;
      if (window.__activeGame && window.__activeGame !== "snake") return;
      const direction = directionFromKey(event.key);
      if (direction) {
        event.preventDefault();
        applyDirection(direction);
        return;
      }

      if (event.key === " " || event.key === "Enter") {
        const activeTag = document.activeElement?.tagName?.toLowerCase();
        if (activeTag !== "input" && activeTag !== "textarea") {
          event.preventDefault();
          toggleGame();
        }
      }
    });

    canvas.addEventListener("pointerdown", (event) => {
      pointerStart = { x: event.clientX, y: event.clientY };
      canvas.setPointerCapture(event.pointerId);
    });

    canvas.addEventListener("pointerup", (event) => {
      if (!pointerStart) return;
      applyDirection(directionFromSwipe(pointerStart, { x: event.clientX, y: event.clientY }));
      pointerStart = null;
    });

    canvas.addEventListener("pointercancel", () => {
      pointerStart = null;
    });

    directionButtons.forEach((button) => {
      button.addEventListener("click", () => {
        applyDirection(button.dataset.direction);
      });
    });

    startButton.addEventListener("click", toggleGame);
    window.addEventListener("resize", resizeCanvas);

    resizeCanvas();
    setStatus("Ready. Press Start, an arrow key, WASD, or swipe to begin.");
    draw();
  }
}
