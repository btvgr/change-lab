/** Búsqueda sin distinción de mayúsculas o tildes; cada palabra debe coincidir. */
export function normalizeSearch(value) {
  return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es').trim();
}
export function filterTopics(items, query = '', category = 'Todos') {
  const terms = normalizeSearch(query).split(/\s+/).filter(Boolean);
  return items.filter((topic) => {
    const matchesCategory = category === 'Todos' || topic.category === category;
    const searchable = normalizeSearch([topic.title, ...topic.keywords].join(' '));
    return matchesCategory && terms.every((term) => searchable.includes(term));
  });
}
