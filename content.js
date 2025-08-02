(function () {
  // --- Mots clés IA à détecter ---
  const AI_PROMPT_INDICATORS = [
    "type a message",
    "ask me anything",
    "envoyez un message",
    "parlez à l'assistant",
    "écrivez un prompt",
    "soumettre à l'ia",
    "générer avec ia",
    "start a conversation",
    "chat with ai",
    "prompt",
    "réponse générée par ia",
    "vous avez dit",
    "assistant response",
    "your message"
  ];

  // --- Vérifie si on est sur une page de recherche ---
  function isSearchPage() {
    const url = window.location.href.toLowerCase();
    const host = window.location.host.toLowerCase();

    const searchHosts = [
      'google.com', 'www.google.com',
      'search.brave.com', 'bing.com', 'www.bing.com',
      'duckduckgo.com', 'www.duckduckgo.com',
      'qwant.com', 'search.yahoo.com'
    ];

    return searchHosts.some(h => host.includes(h)) ||
           url.includes('/search?') ||
           url.includes('/?q=') ||
           url.includes('/search?q=') ||
           url.includes('query=') ||
           url.includes('s?q=');
  }

  // --- Ne rien faire sur les moteurs de recherche ---
  if (isSearchPage()) {
    console.log("🔍 Page de recherche → désactivée");
    return;
  }

  // --- Vérifie si un champ IA est visible ---
  function isAIPromptVisible() {
    const text = (document.body?.innerText || '').toLowerCase();

    const inputs = Array.from(
      document.querySelectorAll('input, textarea, [role="textbox"], button, [role="button"]')
    ).map(el => {
      return [
        el.placeholder?.toLowerCase(),
        el.innerText?.toLowerCase(),
        el.getAttribute('aria-label')?.toLowerCase(),
        el.getAttribute('title')?.toLowerCase()
      ].filter(Boolean).join(' ');
    }).join(' ');

    const fullText = text + ' ' + inputs;

    return AI_PROMPT_INDICATORS.some(kw => fullText.includes(kw));
  }

  // --- Vérifie immédiatement ---
  if (isAIPromptVisible()) {
    showIADetectedScreen();
    return;
  }

  // --- Observe les changements dans la page ---
  const observer = new MutationObserver(() => {
    if (isAIPromptVisible()) {
      showIADetectedScreen();
      observer.disconnect();
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ["placeholder", "aria-label", "value", "title"]
  });

  // --- Dernier contrôle après 2 secondes ---
  setTimeout(() => {
    if (isAIPromptVisible()) {
      showIADetectedScreen();
    }
  }, 2000);

  // --- Affiche l'écran de blocage ---
  function showIADetectedScreen() {
    // Nettoie la page
    document.body.innerHTML = '';
    document.head.innerHTML = '';

    // Crée l'écran noir
    const screen = document.createElement('div');
    screen.style.cssText = `
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background: #000; color: #f00; font: bold 72px Arial, sans-serif;
      display: flex; align-items: center; justify-content: center;
      text-align: center; z-index: 99999; margin: 0;
      text-shadow: 0 0 20px rgba(255, 0, 0, 0.9);
      overflow: hidden;
      user-select: none;
      pointer-events: none;
    `;
    screen.textContent = 'IA DÉTECTÉE';

    // Ajoute à la page
    document.body.appendChild(screen);
  }

})();   