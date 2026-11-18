(() => {
  const header = document.querySelector(".site-header");
  const lightbox = document.getElementById("portfolio-lightbox");
  const lightboxImage = lightbox?.querySelector("img");
  const lightboxTitle = document.getElementById("portfolio-lightbox-title");
  const lightboxClose = lightbox?.querySelector("[data-lightbox-close]");
  let lightboxTrigger = null;
  let touchStartX = 0;

  const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 80);
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  const openLightbox = (trigger, src, alt, title) => {
    if (!lightbox || !lightboxImage || !lightboxTitle) return;
    lightboxTrigger = trigger;
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightboxTitle.textContent = title;
    if (typeof lightbox.showModal === "function") lightbox.showModal();
  };

  document.querySelectorAll("[data-gallery]").forEach((gallery) => {
    const stage = gallery.querySelector("[data-gallery-stage]");
    const stageImage = stage?.querySelector("img");
    const controls = Array.from(gallery.querySelectorAll("[data-gallery-src]"));
    if (!stage || !stageImage || !controls.length) return;

    const select = (index, focus = false) => {
      const control = controls[index];
      if (!control) return;
      stageImage.src = control.dataset.gallerySrc;
      stageImage.alt = control.dataset.galleryAlt;
      stage.dataset.lightboxSrc = control.dataset.gallerySrc;
      stage.dataset.lightboxAlt = control.dataset.galleryAlt;
      stage.dataset.lightboxTitle = control.dataset.galleryTitle;
      controls.forEach((button, buttonIndex) => {
        const active = buttonIndex === index;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
      if (focus) control.focus();
    };

    controls.forEach((control, index) => {
      control.addEventListener("click", () => select(index));
      control.addEventListener("keydown", (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? controls.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + controls.length) % controls.length;
        select(next, true);
      });
    });

    gallery.addEventListener("touchstart", (event) => { touchStartX = event.changedTouches[0].clientX; }, { passive: true });
    gallery.addEventListener("touchend", (event) => {
      const delta = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) < 55) return;
      const activeIndex = controls.findIndex((button) => button.classList.contains("is-active"));
      select((activeIndex + (delta < 0 ? 1 : -1) + controls.length) % controls.length);
    }, { passive: true });
    select(0);
  });

  document.querySelectorAll(".portfolio-image-button").forEach((button) => {
    button.addEventListener("click", () => {
      const image = button.querySelector("img");
      openLightbox(button, button.dataset.lightboxSrc || image?.src || "", button.dataset.lightboxAlt || image?.alt || "Software screenshot", button.dataset.lightboxTitle || "Software preview");
    });
  });

  lightboxClose?.addEventListener("click", () => lightbox.close());
  lightbox?.addEventListener("click", (event) => { if (event.target === lightbox) lightbox.close(); });
  lightbox?.addEventListener("close", () => lightboxTrigger?.focus());
})();
