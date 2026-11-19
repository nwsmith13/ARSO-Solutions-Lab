(() => {
  const trigger = document.getElementById("hero-image-expand");
  const dialog = document.getElementById("hero-image-dialog");
  const close = dialog?.querySelector("[data-home-lightbox-close]");
  if (!trigger || !dialog || !close) return;

  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.showModal();
  });
  close.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => trigger.focus());
})();
