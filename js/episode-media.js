/** Reproductor compartido. No crea controles hasta disponer de metadatos reales. */
export function initEpisodeMedia(root, media, baseUrl) {
  if (!root) return;
  const video = root.querySelector('video');
  const placeholder = root.querySelector('[data-media-placeholder]');
  const status = root.querySelector('[data-media-status]');
  const transcript = root.querySelector('[data-media-transcript]');
  if (!video || !placeholder || !status || !media?.src) return;
  const resolve = (path) => new URL(path, baseUrl).href;
  status.textContent = 'Cargando la frutinovela…';
  video.preload = 'metadata';
  if (media.poster) video.poster = resolve(media.poster);
  if (media.captions) {
    const track = document.createElement('track');
    track.kind = 'captions';
    track.srclang = 'es';
    track.label = 'Español';
    track.default = true;
    track.src = resolve(media.captions);
    video.append(track);
  }
  video.addEventListener('loadedmetadata', () => {
    video.controls = true;
    video.hidden = false;
    placeholder.hidden = true;
  });
  video.addEventListener('error', () => {
    video.pause();
    video.controls = false;
    video.hidden = true;
    placeholder.hidden = false;
    status.textContent = 'La frutinovela no está disponible en este momento.';
  });
  if (media.transcript && transcript) {
    transcript.href = resolve(media.transcript);
    transcript.hidden = false;
  }
  video.src = resolve(media.src);
  video.load();
}
