export const TETROMINOES = {
  I: { color: "#62d7ff", cells: [[0, 1], [1, 1], [2, 1], [3, 1]] },
  J: { color: "#7787ff", cells: [[0, 0], [0, 1], [1, 1], [2, 1]] },
  L: { color: "#ffad61", cells: [[2, 0], [0, 1], [1, 1], [2, 1]] },
  O: { color: "#ffe169", cells: [[0, 0], [1, 0], [0, 1], [1, 1]] },
  S: { color: "#8ee28e", cells: [[1, 0], [2, 0], [0, 1], [1, 1]] },
  T: { color: "#d18cff", cells: [[1, 0], [0, 1], [1, 1], [2, 1]] },
  Z: { color: "#ff7f9f", cells: [[0, 0], [1, 0], [1, 1], [2, 1]] },
};

const TYPES = Object.keys(TETROMINOES);

function cloneCells(cells) {
  return cells.map(([x, y]) => [x, y]);
}

function randomType(random) {
  return TYPES[Math.floor(random() * TYPES.length) % TYPES.length];
}

function spawnPiece(type, columns) {
  const cells = cloneCells(TETROMINOES[type].cells);
  const width = Math.max(...cells.map(([x]) => x)) + 1;
  return { type, color: TETROMINOES[type].color, cells, x: Math.floor((columns - width) / 2), y: 0 };
}

export function createTetris({ columns = 10, rows = 20, random = Math.random } = {}) {
  const type = randomType(random);
  return {
    columns,
    rows,
    board: Array.from({ length: rows }, () => Array(columns).fill(null)),
    current: spawnPiece(type, columns),
    next: randomType(random),
    score: 0,
    lines: 0,
    level: 1,
    status: "idle",
  };
}

export function startTetris(game) {
  return game.status === "over" ? game : { ...game, status: "running" };
}

function occupied(game, x, y) {
  return y >= 0 && game.board[y]?.[x];
}

export function canPlace(game, piece, offsetX = 0, offsetY = 0, cells = piece.cells) {
  return cells.every(([x, y]) => {
    const nextX = piece.x + x + offsetX;
    const nextY = piece.y + y + offsetY;
    return nextX >= 0 && nextX < game.columns && nextY < game.rows && !occupied(game, nextX, nextY);
  });
}

export function moveTetris(game, dx) {
  if (game.status !== "running" || !canPlace(game, game.current, dx, 0)) return game;
  return { ...game, current: { ...game.current, x: game.current.x + dx } };
}

function rotateCells(cells) {
  const maxX = Math.max(...cells.map(([x]) => x));
  const maxY = Math.max(...cells.map(([, y]) => y));
  const size = Math.max(maxX, maxY);
  return cells.map(([x, y]) => [size - y, x]);
}

export function rotateTetris(game) {
  if (game.status !== "running" || game.current.type === "O") return game;
  const cells = rotateCells(game.current.cells);
  for (const kick of [0, -1, 1, -2, 2]) {
    if (canPlace(game, game.current, kick, 0, cells)) {
      return { ...game, current: { ...game.current, cells, x: game.current.x + kick } };
    }
  }
  return game;
}

function mergePiece(game) {
  const board = game.board.map((row) => [...row]);
  for (const [x, y] of game.current.cells) {
    const boardX = game.current.x + x;
    const boardY = game.current.y + y;
    if (boardY >= 0) board[boardY][boardX] = game.current.color;
  }
  return board;
}

function clearLines(board) {
  const remaining = board.filter((row) => row.some((cell) => !cell));
  const cleared = board.length - remaining.length;
  while (remaining.length < board.length) remaining.unshift(Array(board[0].length).fill(null));
  return { board: remaining, cleared };
}

export function lockTetris(game, random = Math.random) {
  const merged = mergePiece(game);
  const { board, cleared } = clearLines(merged);
  const lines = game.lines + cleared;
  const level = Math.floor(lines / 10) + 1;
  const next = spawnPiece(game.next, game.columns);
  const nextType = randomType(random);
  const nextGame = { ...game, board, current: next, next: nextType, lines, level, score: game.score + [0, 100, 300, 500, 800][cleared] * level };
  return canPlace(nextGame, next) ? nextGame : { ...nextGame, status: "over" };
}

export function dropTetris(game, random = Math.random) {
  if (game.status !== "running") return game;
  if (canPlace(game, game.current, 0, 1)) {
    return { ...game, current: { ...game.current, y: game.current.y + 1 }, score: game.score + 1 };
  }
  return lockTetris(game, random);
}

export function hardDropTetris(game, random = Math.random) {
  if (game.status !== "running") return game;
  let current = game.current;
  while (canPlace(game, current, 0, 1)) current = { ...current, y: current.y + 1 };
  return lockTetris({ ...game, current }, random);
}
