/** Evaluación educativa sin puntuaciones ni almacenamiento. */
export function evaluateAnswer(question, selected) {
  if (!Number.isInteger(selected) || selected < 0 || selected >= question.options.length) {
    return { valid: false, correct: false, message: 'Elige una opción antes de comprobar tu respuesta.' };
  }
  const correct = selected === question.correct;
  return {
    valid: true,
    correct,
    message: `${correct ? 'Así es.' : 'Puedes volver a pensarlo.'} ${question.explanation}`
  };
}

export function initQuiz(root, questions) {
  if (!root || !questions?.length) return;
  const cards = root.querySelector('[data-quiz-cards]');
  const reset = root.querySelector('[data-quiz-reset]');
  const status = root.querySelector('[data-quiz-status]');
  const fallback = root.querySelector('[data-quiz-fallback]');
  if (!cards || !reset || !status) return;
  const records = [];
  const create = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };
  questions.forEach((question, index) => {
    const form = create('form', 'quiz-question');
    const fieldset = create('fieldset');
    const legend = create('legend', '', `${String(index + 1).padStart(2, '0')} / ${question.prompt}`);
    fieldset.append(legend);
    const feedback = create('p', 'quiz-feedback');
    feedback.id = `respuesta-${question.id}`;
    feedback.setAttribute('role', 'status');
    feedback.setAttribute('aria-live', 'polite');
    feedback.setAttribute('aria-atomic', 'true');
    const inputs = question.options.map((option, optionIndex) => {
      const label = create('label', 'quiz-option');
      const input = create('input');
      input.type = 'radio';
      input.name = `pregunta-${question.id}`;
      input.value = String(optionIndex);
      input.setAttribute('aria-describedby', feedback.id);
      const text = create('span', '', `${String.fromCharCode(65 + optionIndex)}. ${option}`);
      label.append(input, text);
      fieldset.append(label);
      input.addEventListener('change', () => {
        feedback.textContent = '';
        delete form.dataset.result;
      });
      return input;
    });
    const submit = create('button', 'button button--secondary', 'Comprobar respuesta');
    submit.type = 'submit';
    form.append(fieldset, submit, feedback);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const selected = inputs.findIndex((input) => input.checked);
      const result = evaluateAnswer(question, selected);
      feedback.textContent = result.message;
      form.dataset.result = result.valid ? (result.correct ? 'correct' : 'retry') : 'empty';
      if (!result.valid) inputs[0].focus();
    });
    records.push({ form, inputs, feedback });
    cards.append(form);
  });
  reset.hidden = false;
  fallback?.remove();
  reset.addEventListener('click', () => {
    records.forEach(({ form, inputs, feedback }) => {
      form.reset();
      inputs.forEach((input) => { input.checked = false; });
      feedback.textContent = '';
      delete form.dataset.result;
    });
    status.textContent = 'Puedes volver a intentarlo. Las respuestas se han restablecido.';
    records[0].inputs[0].focus();
  });
}
