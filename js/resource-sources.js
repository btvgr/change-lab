/** Solo publica metadatos cuya revisión editorial se haya confirmado explícitamente. */
export function getReviewedSources(sources, resourceSlug = null) {
  return sources.filter((source) =>
    source.verified === true &&
    typeof source.title === 'string' && source.title.trim() &&
    typeof source.institution === 'string' && source.institution.trim() &&
    (source.date === null || /^\d{4}-\d{2}-\d{2}$/.test(source.date)) &&
    typeof source.url === 'string' && /^https:\/\/[^\s]+$/.test(source.url) &&
    Array.isArray(source.resourceSlugs) && source.resourceSlugs.length > 0 &&
    (!resourceSlug || source.resourceSlugs.includes(resourceSlug))
  );
}
export function renderSources(root, sources, resourceSlug = null) {
  if (!root) return;
  const list = root.querySelector('[data-source-list]');
  const pending = root.querySelector('[data-source-pending]');
  if (!list || !pending) return;
  const reviewed = getReviewedSources(sources, resourceSlug);
  list.replaceChildren();
  for (const source of reviewed) {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.className = 'text-link';
    link.href = source.url;
    link.textContent = source.title;
    const metadata = document.createElement('p');
    metadata.textContent = `${source.institution} · ${source.date || 'Fecha no indicada'}`;
    item.append(link, metadata);
    list.append(item);
  }
  list.hidden = reviewed.length === 0;
  pending.hidden = reviewed.length > 0;
}
