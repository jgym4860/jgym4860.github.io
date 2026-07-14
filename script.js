const yearNode = document.querySelector("[data-current-year]");
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

const navLinks = document.querySelectorAll(".primary-nav a[href]");
for (const link of navLinks) {
  const currentUrl = new URL(link.href, window.location.href);
  const samePath = currentUrl.pathname === window.location.pathname;
  const homeMatch = link.getAttribute("href") === "./" && window.location.pathname.endsWith("/");
  if (samePath || homeMatch) {
    link.setAttribute("aria-current", "page");
  }
}

const hashLinks = document.querySelectorAll('a[href^="#"]');
for (const link of hashLinks) {
  link.addEventListener("click", () => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      target.addEventListener(
        "blur",
        () => target.removeAttribute("tabindex"),
        { once: true },
      );
    }
  });
}
