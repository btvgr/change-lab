/** Componente reutilizable de decisiones. No evalúa ni almacena respuestas. */
export function initDecisionLab(root, experiences) {
  if (!root || !experiences?.length) return null;
  const find = (selector) => root.querySelector(selector);
  const selectors = find('[data-experience-selectors]');
  const panel = find('[data-decision-panel]');
  const idle = find('[data-lab-idle]');
  const title = find('[data-decision-title]');
  const label = find('[data-decision-label]');
  const context = find('[data-decision-context]');
  const options = find('[data-decision-options]');
  const feedback = find('[data-decision-feedback]');
  const final = find('[data-decision-final]');
  const question = find('[data-decision-question]');
  const related = find('[data-decision-related]');
  const retry = find('[data-decision-retry]');
  const change = find('[data-decision-change]');
  const announcer = find('[data-lab-announcer]');
  if ([selectors, panel, idle, title, label, context, options, feedback, final, question, related, retry, change, announcer].some((node) => !node)) return null;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const create = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };
  let active = null;
  let selectedIndex = null;
  let optionButtons = [];
  const selectionButtons = [];
  const selectedLabels = [];
  const moveTo = (target, focusTarget) => {
    focusTarget.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
  };
  const updateSelectors = () => {
    experiences.forEach((experience, index) => {
      const selected = experience.id === active?.id;
      selectionButtons[index].setAttribute('aria-pressed', String(selected));
      selectedLabels[index].hidden = !selected;
    });
  };
  function clearResponse() {
    selectedIndex = null;
    optionButtons.forEach((button) => button.setAttribute('aria-pressed', 'false'));
    feedback.textContent = 'Elige una respuesta para explorar sus posibles implicaciones.';
    final.hidden = true;
    question.textContent = '';
    retry.hidden = true;
  }
  function chooseResponse(index) {
    if (!active || !Number.isInteger(index) || index < 0 || index >= active.options.length) return false;
    selectedIndex = index;
    optionButtons.forEach((button, optionIndex) => button.setAttribute('aria-pressed', String(optionIndex === index)));
    feedback.textContent = active.options[index].feedback;
    question.textContent = active.reflection;
    final.hidden = false;
    retry.hidden = false;
    return true;
  }
  function selectExperience(id) {
    const experience = experiences.find((item) => item.id === id);
    if (!experience) return false;
    active = experience;
    panel.dataset.experience = experience.slug;
    title.textContent = experience.title;
    label.textContent = `${experience.id} / ${experience.label}`;
    context.textContent = experience.context;
    related.href = experience.route;
    related.textContent = `Explorar la frutinovela de ${experience.topic} ↗`;
    optionButtons = experience.options.map((option, index) => {
      const button = create('button', 'decision-option');
      button.type = 'button';
      button.setAttribute('aria-pressed', 'false');
      button.append(create('span', 'decision-option__letter', String.fromCharCode(65 + index)), create('span', '', option.text));
      button.addEventListener('click', () => chooseResponse(index));
      return button;
    });
    options.replaceChildren(...optionButtons);
    clearResponse();
    updateSelectors();
    idle.hidden = true;
    panel.hidden = false;
    announcer.textContent = `Situación ${experience.id} abierta. Explora las decisiones posibles.`;
    moveTo(panel, title);
    return true;
  }
  function retryResponse() {
    if (!active) return false;
    clearResponse();
    announcer.textContent = 'Puedes explorar otra respuesta de esta misma situación.';
    moveTo(options, optionButtons[0]);
    return true;
  }
  function chooseAnotherSituation() {
    const previousIndex = experiences.findIndex((item) => item.id === active?.id);
    active = null;
    clearResponse();
    panel.hidden = true;
    idle.hidden = false;
    updateSelectors();
    announcer.textContent = 'Elige otra situación para explorar una nueva perspectiva.';
    moveTo(selectors, selectionButtons[Math.max(0, previousIndex)]);
    return true;
  }
  experiences.forEach((experience) => {
    const button = create('button', 'card lab-selector');
    button.type = 'button';
    button.setAttribute('aria-controls', panel.id);
    button.setAttribute('aria-pressed', 'false');
    const selected = create('span', 'label lab-selector__selected', 'Seleccionada');
    selected.hidden = true;
    const stateSlot = create('span', 'lab-selector__state');
    stateSlot.append(selected);
    button.append(create('span', 'label', `${experience.id} / ${experience.label}`), create('span', 'lab-selector__title', experience.title), create('span', 'lab-selector__topic', `Tema relacionado: ${experience.topic}`), create('span', 'label lab-selector__action', 'Explorar situación ↗'), stateSlot);
    button.addEventListener('click', () => selectExperience(experience.id));
    selectionButtons.push(button);
    selectedLabels.push(selected);
  });
  selectors.replaceChildren(...selectionButtons);
  retry.addEventListener('click', retryResponse);
  change.addEventListener('click', chooseAnotherSituation);
  idle.hidden = false;
  find('[data-lab-fallback]')?.remove();
  return {
    selectExperience, chooseResponse, retryResponse, chooseAnotherSituation,
    getState: () => ({ experienceId: active?.id || null, responseIndex: selectedIndex })
  };
}


