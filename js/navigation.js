/** Mejora progresiva: sin JavaScript los enlaces permanecen visibles. */
export function initNavigation() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navegacion');
  if (!toggle || !nav) return;
  const desktop = window.matchMedia('(min-width: 64rem)');
  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.hidden = !open;
  };
  const syncViewport = () => {
    const focusInNav = nav.contains(document.activeElement);
    const focusOnToggle = document.activeElement === toggle;
    toggle.hidden = desktop.matches;
    setOpen(desktop.matches);
    if (!desktop.matches && focusInNav) toggle.focus();
    if (desktop.matches && focusOnToggle) nav.querySelector('a').focus();
  };
  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !desktop.matches && !nav.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!desktop.matches && !nav.hidden && !nav.contains(event.target) && !toggle.contains(event.target)) {
      const focusInNav = nav.contains(document.activeElement);
      setOpen(false);
      if (focusInNav) toggle.focus();
    }
  });
  desktop.addEventListener('change', syncViewport);
  syncViewport();
}
