import { topics } from './topics-data.js';
import { filterTopics } from './topics-filter.js';

const grid = document.querySelector('#archive-grid');
const controls = document.querySelector('#archive-controls');
const search = document.querySelector('#topic-search');
const buttons = [...document.querySelectorAll('[data-category]')];
const status = document.querySelector('#archive-status');
const empty = document.querySelector('#archive-empty');
const reset = document.querySelector('#archive-reset');
let category = 'Todos';

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}
function renderCard(topic) {
  const article = element('article', 'card archive-card');
  article.id = `tema-${topic.slug}`;
  const art = element('div', 'archive-art');
  art.dataset.art = topic.slug;
  art.setAttribute('aria-hidden', 'true');
  art.append(element('span', 'archive-art__shape'));
  art.append(element('span', 'archive-art__number', topic.id));
  art.append(element('span', 'label archive-art__caption', 'Archivo visual / ' + topic.id));
  if (topic.image.src) {
    const image = document.createElement('img');
    image.className = 'documentary-image archive-image';
    image.alt = topic.image.alt;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.width = topic.image.width || 800;
    image.height = topic.image.height || 600;
    if (topic.image.alt) art.removeAttribute('aria-hidden');
    image.addEventListener('error', () => {
      image.remove();
      art.setAttribute('aria-hidden', 'true');
    }, { once: true });
    image.src = topic.image.src;
    art.prepend(image);
  }
  const body = element('div', 'archive-card__body');
  body.append(element('p', 'label', topic.label));
  const title = element('h3', 'card__title', topic.title);
  title.id = `titulo-${topic.slug}`;
  article.setAttribute('aria-labelledby', title.id);
  body.append(title, element('p', 'card__description', topic.description));
  if (topic.route) {
    const link = element('a', 'text-link archive-card__link', 'Explorar ' + topic.title + ' ↗');
    link.href = topic.route;
    body.append(link);
  } else {
    body.append(element('p', 'label archive-card__pending', 'Contenido en preparación'));
  }
  article.append(art);
  if (topic.image.caption) article.append(element('p', 'archive-image-note', topic.image.caption));
  article.append(body);
  return article;
}
function updateArchive() {
  const result = filterTopics(topics, search.value, category);
  grid.replaceChildren(...result.map(renderCard));
  grid.hidden = result.length === 0;
  empty.hidden = result.length !== 0;
  status.textContent = `${result.length} de ${topics.length} ${topics.length === 1 ? 'tema' : 'temas'} · ${category}`;
  buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.category === category)));
  reset.disabled = search.value === '' && category === 'Todos';
}
if (grid && controls && search && status && empty && reset) {
  // Revelar los controles solo después de que el primer render termine correctamente.
  updateArchive();
  controls.hidden = false;
  document.querySelector('#archive-basic')?.remove();
  let searchTimer;
  search.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(updateArchive, 120);
  });
  search.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { clearTimeout(searchTimer); updateArchive(); }
  });
  buttons.forEach((button) => button.addEventListener('click', () => {
    clearTimeout(searchTimer);
    category = button.dataset.category;
    updateArchive();
  }));
  reset.addEventListener('click', () => {
    clearTimeout(searchTimer);
    search.value = '';
    category = 'Todos';
    updateArchive();
    search.focus();
  });
}
