(() => {
  const pageContact = "index.html#contact";

  if (!document.getElementById("assistantToggle")) {
    document.body.insertAdjacentHTML("beforeend", `
      <button id="assistantToggle" type="button" aria-label="Open ARSO assistant" aria-expanded="false" aria-controls="assistantWidget">i</button>
      <div class="assistant-widget" id="assistantWidget" aria-label="ARSO Lab Assistant">
        <div class="assistant-header"><div class="assistant-title"><img src="/Assets/favicon-16.svg" alt=""><div><strong>ARSO Lab Assistant</strong><br><span>What would help you?</span></div></div></div>
        <div class="assistant-options">
          <button type="button" data-choice="crm">Messy spreadsheets | CRM</button>
          <button type="button" data-choice="web">Website build/fix | Lead tool</button>
          <button type="button" data-choice="automation">AI | Automation</button>
          <button type="button" data-choice="dashboard">Visibility/reporting | Dashboards</button>
          <button type="button" data-choice="integration">Systems don't communicate | Integration</button>
        </div><div class="assistant-response" id="assistantResponse"></div>
      </div>`);
  }

  if (!document.getElementById("backToTop")) {
    document.body.insertAdjacentHTML("beforeend", '<button id="backToTop" type="button" aria-label="Back to top">↑</button>');
  }

  const assistantToggle = document.getElementById("assistantToggle");
  const assistant = document.getElementById("assistantWidget");
  const backToTop = document.getElementById("backToTop");
  const responseBox = document.getElementById("assistantResponse");

  if (assistantToggle && assistant && !assistantToggle.dataset.sharedControlReady) {
    assistantToggle.dataset.sharedControlReady = "true";
    assistantToggle.addEventListener("click", () => {
      const open = assistant.classList.toggle("open");
      assistantToggle.setAttribute("aria-expanded", String(open));
      assistantToggle.setAttribute("aria-label", open ? "Close ARSO assistant" : "Open ARSO assistant");
      assistantToggle.textContent = open ? "×" : "i";
    });
    const responses = {
      crm: "Recommended: CRM + workflow system to eliminate spreadsheet chaos.",
      web: "Recommended: optimize or build your website to capture and convert leads effectively.",
      automation: "Recommended: automation system to remove repetitive tasks and save time.",
      dashboard: "Recommended: real-time dashboard for visibility into your sales and operations.",
      integration: "Recommended: connect your tools into one clean workflow."
    };
    assistant.querySelectorAll("[data-choice]").forEach((button) => button.addEventListener("click", () => {
      if (responseBox) responseBox.innerHTML = `<strong>Recommended starting point</strong><p>${responses[button.dataset.choice]}</p><a class="assistant-cta" href="${pageContact}">Start with this &rarr;</a>`;
    }));
  }

  if (backToTop && !backToTop.dataset.sharedControlReady) {
    backToTop.dataset.sharedControlReady = "true";
    const updateBackToTop = () => {
      const scrollPosition = Math.max(window.scrollY, document.scrollingElement?.scrollTop || 0);
      backToTop.classList.toggle("show", scrollPosition > (innerWidth <= 640 ? 600 : 200));
    };
    addEventListener("scroll", updateBackToTop, { passive: true });
    document.addEventListener("scroll", updateBackToTop, { passive: true });
    backToTop.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
    updateBackToTop();
  }
})();
