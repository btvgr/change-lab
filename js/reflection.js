import { experiences } from './reflection-data.js';
import { initDecisionLab } from './decision-lab.js';

initDecisionLab(document.querySelector('[data-decision-lab]'), experiences);
