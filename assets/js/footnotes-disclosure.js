(() => {
  const disclosure = document.getElementById('post-footnotes');
  if (!disclosure) return;

  function reveal(hash, scroll = false) {
    let id;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      return;
    }
    const target = document.getElementById(id);
    if (!target || !disclosure.contains(target)) return;
    disclosure.open = true;
    if (scroll) requestAnimationFrame(() => target.scrollIntoView());
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest?.('a[href]');
    if (!link) return;
    const url = new URL(link.href, location.href);
    if (url.origin === location.origin && url.pathname === location.pathname) {
      reveal(url.hash);
    }
  }, true);

  window.addEventListener('hashchange', () => reveal(location.hash, true));
  reveal(location.hash, true);
})();
