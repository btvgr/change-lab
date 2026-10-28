import { specificSources } from './resources-data.js';
import { renderSources } from './resource-sources.js';

const references = document.querySelector('[data-resource-sources]');
if (references) renderSources(references, specificSources, references.dataset.resourceSources);
