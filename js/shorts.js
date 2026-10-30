/** Finite native-scroll feed: explicit actions alone can start playback or sound. */
export function initShorts(root) {
  if (!root) return;
  const feed = root.querySelector('[data-shorts-feed]');
  const panels = [...feed.querySelectorAll('.short-panel')];
  const videos = panels.map(panel => panel.querySelector('video'));
  const get = name => root.querySelector(`[data-${name}]`);
  const previous = get('previous'), next = get('next'), play = get('play');
  const sound = get('sound'), speed = get('speed'), counter = get('counter'), status = get('status');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let active = 0, lastScroll = feed.scrollTop, initialized = false;
  const pauseAll = () => videos.forEach(video => { if (!video.paused) video.pause(); });
  const updateControls = () => {
    const video = videos[active];
    previous.disabled = active === 0; next.disabled = active === videos.length - 1;
    play.setAttribute('aria-label', video.paused ? 'Reproducir video' : 'Pausar video');
    get('play-icon').hidden = !video.paused; get('pause-icon').hidden = video.paused;
    sound.setAttribute('aria-label', video.muted ? 'Activar sonido' : 'Silenciar video');
    sound.setAttribute('aria-pressed', String(!video.muted));
    get('muted-icon').hidden = !video.muted; get('sound-icon').hidden = video.muted;
    speed.textContent = `${video.playbackRate}x`;
    speed.setAttribute('aria-pressed', String(video.playbackRate === 2));
    speed.setAttribute('aria-label', video.playbackRate === 2 ? 'Velocidad 2x. Cambiar a 1x' : 'Velocidad 1x. Cambiar a 2x');
  };
  const activate = index => {
    if (initialized && index === active) return;
    if (index !== active) {
      pauseAll(); videos[active].playbackRate = 1; active = index; videos[active].playbackRate = 1; status.hidden = true;
    }
    panels.forEach((panel, i) => { panel.inert = i !== active; videos[i].preload = i === active ? 'metadata' : 'none'; });
    counter.textContent = `${String(active + 1).padStart(2, '0')} / 03`;
    counter.setAttribute('aria-label', `Episodio ${active + 1} de 3: ${panels[active].dataset.title}`);
    initialized = true;
    updateControls();
  };
  const goTo = index => {
    if (index < 0 || index >= panels.length) return;
    pauseAll();
    feed.scrollTo({ top: panels[index].offsetTop - panels[0].offsetTop, behavior: reduced.matches ? 'instant' : 'smooth' });
  };
  let panelHeight = feed.clientHeight, resizing = false, resizeFrame = 0;
  const preserveActive = () => {
    resizing = true;
    pauseAll();
    panelHeight = feed.clientHeight;
    feed.style.scrollSnapType = 'none';
    const align = () => feed.scrollTo({ top: panels[active].offsetTop - panels[0].offsetTop, behavior: 'instant' });
    align();
    window.cancelAnimationFrame(resizeFrame);
    resizeFrame = window.requestAnimationFrame(() => {
      align();
      resizeFrame = window.requestAnimationFrame(() => {
        feed.style.scrollSnapType = '';
        align();
        resizeFrame = window.requestAnimationFrame(() => { lastScroll = feed.scrollTop; resizing = false; });
      });
    });
  };
  const syncHeight = () => {
    if (panelHeight === feed.clientHeight) return false;
    preserveActive();
    return true;
  };
  feed.addEventListener('scroll', () => {
    // Resize can dispatch scroll before ResizeObserver; do not select a new episode then.
    if (syncHeight() || resizing) return;
    if (Math.abs(feed.scrollTop - lastScroll) > 1) pauseAll();
    lastScroll = feed.scrollTop;
    if (feed.clientHeight) activate(Math.max(0, Math.min(panels.length - 1, Math.round(feed.scrollTop / feed.clientHeight))));
  }, { passive: true });
  feed.addEventListener('keydown', event => {
    if (event.target !== feed || !['ArrowUp', 'ArrowDown'].includes(event.key)) return;
    event.preventDefault(); goTo(active + (event.key === 'ArrowDown' ? 1 : -1));
  });
  previous.addEventListener('click', () => goTo(active - 1));
  next.addEventListener('click', () => goTo(active + 1));
  play.addEventListener('click', async () => {
    const video = videos[active];
    if (!video.paused) { video.pause(); return; }
    videos.forEach(other => { if (other !== video) other.pause(); });
    try { await video.play(); }
    catch (error) {
      if (error.name !== 'AbortError') { status.textContent = 'No se pudo reproducir. Puedes abrir el video desde su página educativa.'; status.hidden = false; }
    }
    updateControls();
  });
  sound.addEventListener('click', () => { videos[active].muted = !videos[active].muted; updateControls(); });
  speed.addEventListener('click', () => { videos[active].playbackRate = videos[active].playbackRate === 2 ? 1 : 2; updateControls(); });
  videos.forEach((video, index) => {
    video.addEventListener('play', () => {
      if (index !== active) video.pause();
      videos.forEach(other => { if (other !== video) other.pause(); }); updateControls();
    });
    for (const event of ['pause', 'ended', 'volumechange', 'ratechange']) video.addEventListener(event, updateControls);
    video.addEventListener('error', () => {
      if (index !== active) return;
      video.pause(); status.textContent = 'Video no disponible. Abre «Comprende esta historia» para encontrar su enlace directo.'; status.hidden = false;
    });
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) pauseAll(); });
  window.addEventListener('pagehide', pauseAll);
  window.addEventListener('resize', preserveActive);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.intersectionRatio < .5) entry.target.pause();
    }), { root: feed, threshold: [.5] });
    videos.forEach(video => observer.observe(video));
  }
  if ('ResizeObserver' in window) {
    new ResizeObserver(syncHeight).observe(feed);
  }
  get('controls').hidden = false;
  activate(0);
}
initShorts(document.querySelector('[data-shorts]'));
