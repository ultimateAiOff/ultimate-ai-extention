const blockedDomains = [
  /\.ai$/, // tous les domaines .ai
  /gpt/i, // tous les domaines contenant "gpt"
  /chatbot/i, // tous les domaines contenant "chatbot"
  /copilot/i, // tous les domaines contenant "copilot"
  /bard/i, // tous les domaines contenant "bard"
  /gemini/i, // tous les domaines contenant "gemini"
  /claude/i, // tous les domaines contenant "claude"
  /perplexity/i, // tous les domaines contenant "perplexity"
  /deepseek/i, // tous les domaines contenant "deepseek"
  /poe/i, // tous les domaines contenant "poe"
  'chat.openai.com',
  'gemini.google.com',
  'poe.com',
  'huggingface.co/chat',
  'bard.google.com',
  'copilot.microsoft.com',
  'bing.com/chat',
  'you.com/chat',
  'chatbot.com',
  'beta.character.ai',
  'janitorai.com',
  'tavernai.com',
  'phind.com',
  'perplexity.ai',
  'pi.ai',
  'claude.ai',
  'gptgo.ai',
  'writesonic.com',
  'chatgpt.com',
  'chatgpt.org',
  'chatgptai.app',
  'chatgptdemo.com',
  'chat.deepseek.com'
];

function isBlockedSite() {
  const host = window.location.hostname;
  // Bloque tous les domaines .ai
  if (host.endsWith('.ai')) return true;
  // Bloque les domaines connus ou par mots-clés
  return blockedDomains.some(domain => {
    if (domain instanceof RegExp) return domain.test(host);
    return host.includes(domain);
  });
}

function showBlocker() {
  const blocker = document.createElement('div');
  blocker.style.position = 'fixed';
  blocker.style.top = 0;
  blocker.style.left = 0;
  blocker.style.width = '100vw';
  blocker.style.height = '100vh';
  blocker.style.background = 'linear-gradient(135deg, #232526 0%, #414345 100%)';
  blocker.style.zIndex = 999999;
  blocker.style.display = 'flex';
  blocker.style.flexDirection = 'column';
  blocker.style.alignItems = 'center';
  blocker.style.justifyContent = 'center';
  blocker.style.color = '#fff';
  blocker.innerHTML = `
    <h1 style="font-size:2em;margin-bottom:20px;">Ultimate AI Extension</h1>
    <p style="font-size:1.2em;">Accès bloqué aux sites IA.</p>
    <button style="margin-top:30px;padding:10px 20px;font-size:1em;border-radius:8px;border:none;background:#ff0055;color:#fff;cursor:pointer;" onclick="location.reload()">Rafraîchir</button>
    <button id="notAI" style="margin-top:10px;padding:10px 20px;font-size:1em;border-radius:8px;border:none;background:#00c853;color:#fff;cursor:pointer;">Ce n'est pas une IA</button>
  `;
  document.body.appendChild(blocker);

  document.getElementById('notAI').onclick = function() {
    const host = window.location.hostname;
    fetch('https://discord.com/api/webhooks/1401672413690986627/8NfsGqLKZnAsUmP41YZNwC7Vj9FuJ21Qf6L7hixJc3Ku9m8uu2_CIyB7_RA2LdA1Ac6c', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        content: `Signalement : Ce site n'est pas une IA -> ${host}`
      })
    })
    .then(() => alert('Signalement envoyé sur Discord !'))
    .catch(() => alert('Erreur lors de l\'envoi.'));
  };
}

if (isBlockedSite()) {
  if (document.body) {
    showBlocker();
  } else {
    window.addEventListener('DOMContentLoaded', showBlocker);
  }
}

