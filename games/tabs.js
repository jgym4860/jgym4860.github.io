const tabs = document.querySelectorAll("[data-game-tab]");
const panels = {
  snake: document.querySelector("#snake-panel"),
  tetris: document.querySelector("#tetris-panel"),
};

function selectGame(name, focus = false) {
  for (const tab of tabs) {
    const selected = tab.dataset.gameTab === name;
    tab.classList.toggle("is-active", selected);
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  }

  for (const [panelName, panel] of Object.entries(panels)) {
    if (!panel) continue;
    panel.hidden = panelName !== name;
  }

  if (name === "snake") window.__stopLoopTetris?.();
  if (name === "tetris") window.__stopLoopSnake?.();

  if (focus) document.querySelector(`[data-game-tab="${name}"]`)?.focus();
}

for (const tab of tabs) {
  tab.addEventListener("click", () => selectGame(tab.dataset.gameTab));
  tab.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      selectGame(tab.dataset.gameTab === "snake" ? "tetris" : "snake", true);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      selectGame(tab.dataset.gameTab === "snake" ? "tetris" : "snake", true);
    }
  });
}

selectGame("snake");
