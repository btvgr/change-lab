import { resources, specificSources } from './resources-data.js';
import { filterTopics } from './topics-filter.js';
import { renderSources } from './resource-sources.js';

const grid = document.querySelector('#resource-grid');
const controls = document.querySelector('#resource-controls');
const search = document.querySelector('#resource-search');
const buttons = [...document.querySelectorAll('[data-resource-category]')];
const status = document.querySelector('#resource-status');
const empty = document.querySelector('#resource-empty');
const reset = document.querySelector('#resource-reset');
let category = 'Todos';

function create(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}
export function renderResourceCard(resource) {
  const card = create('article', 'card library-card');
  card.setAttribute('aria-labelledby', `ficha-${resource.slug}`);
  const cover = create('div', 'library-card__cover');
  cover.dataset.cover = resource.id;
  cover.setAttribute('aria-hidden', 'true');
  cover.append(create('span', 'library-card__number', resource.id), create('span', 'library-card__cut'), create('span', 'label', 'CHANGE LAB / FICHA EDUCATIVA'));
  const body = create('div', 'library-card__body');
  const title = create('h3', 'card__title', resource.title);
  title.id = `ficha-${resource.slug}`;
  const link = create('a', 'text-link library-card__link', 'Profundiza en el episodio');
  link.href = `${resource.episodeRoute}#profundiza`;
  link.append(create('span', 'library-sr-only', ': ' + resource.title), create('span', '', ' ↗'));
  body.append(create('p', 'label', resource.category), title, create('p', 'card__description', resource.introduction), link);
  card.append(cover, body);
  return card;
}
function updateLibrary() {
  const matches = filterTopics(resources, search.value, category);
  grid.replaceChildren(...matches.map(renderResourceCard));
  grid.hidden = matches.length === 0;
  empty.hidden = matches.length !== 0;
  status.textContent = `${matches.length} de ${resources.length} ${resources.length === 1 ? 'ficha' : 'fichas'} · ${category}`;
  buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.resourceCategory === category)));
  reset.disabled = search.value === '' && category === 'Todos';
}
if (grid && controls && search && status && empty && reset) {
  updateLibrary();
  controls.hidden = false;
  let timer;
  search.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(updateLibrary, 120);
  });
  search.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { clearTimeout(timer); updateLibrary(); }
  });
  buttons.forEach((button) => button.addEventListener('click', () => {
    clearTimeout(timer);
    category = button.dataset.resourceCategory;
    updateLibrary();
  }));
  reset.addEventListener('click', () => {
    clearTimeout(timer);
    category = 'Todos';
    search.value = '';
    updateLibrary();
    search.focus();
  });
}
renderSources(document.querySelector('[data-resource-sources]'), specificSources);
