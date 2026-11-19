(() => {
  const toggle = document.querySelector(".shared-nav-toggle");
  if (!toggle) return;

  const nav = document.getElementById(toggle.getAttribute("aria-controls"));
  if (!nav) return;

  const closeMenu = (restoreFocus = false) => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    if (restoreFocus) toggle.focus();
  };

  toggle.addEventListener("click", () => {
    const shouldOpen = toggle.getAttribute("aria-expanded") !== "true";
    nav.classList.toggle("is-open", shouldOpen);
    toggle.setAttribute("aria-expanded", String(shouldOpen));
    toggle.setAttribute("aria-label", shouldOpen ? "Close navigation" : "Open navigation");
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) closeMenu(true);
  });

  document.addEventListener("click", (event) => {
    if (!nav.classList.contains("is-open") || nav.contains(event.target) || toggle.contains(event.target)) return;
    closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 640) closeMenu();
  });

  toggle.setAttribute("aria-label", "Open navigation");
})();
