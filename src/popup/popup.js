document.getElementById('refresh').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.reload(tabs[0].id);
  });
});

document.getElementById('ultimate-link').addEventListener('click', () => {
  window.open('https://ultimate-ai.netlify.app', '_blank');
});

document.getElementById('reportIA').addEventListener('click', () => {
  const url = prompt("Entrez l'URL du site IA à signaler :");
  if (url) {
    let host = '';
    try {
      host = (new URL(url)).hostname;
    } catch (e) {
      alert("URL invalide !");
      return;
    }
    fetch('https://discord.com/api/webhooks/1401672705278742578/IFy_qzEYVv6UKMj5GJ-fm89UupdTQC9NRVthwpxdlwwzCqf0QIyc269_G7PaeISdUonx', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        content: `Signalement : Ce site est une IA -> ${host}`
      })
    })
    .then(() => alert('Signalement envoyé sur Discord !'))
    .catch(() => alert('Erreur lors de l\'envoi.'));
  }
});