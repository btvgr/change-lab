export const DRAFT_LIMIT = 500;
export const COPY_SUCCESS = 'Propuesta copiada. Puedes compartirla mediante un canal oficial del proyecto cuando esté disponible.';

/** Mismo criterio que maxlength del navegador: unidades UTF-16. */
export function limitDraft(value) {
  let draft = String(value).slice(0, DRAFT_LIMIT);
  const last = draft.charCodeAt(draft.length - 1);
  if (last >= 0xD800 && last <= 0xDBFF) draft = draft.slice(0, -1);
  return draft;
}
export function formatProposal(draft, category = '') {
  const text = limitDraft(draft).trim();
  if (!text) return '';
  return `Change Lab — Propuesta\n${category ? `Categoría: ${category}\n` : ''}\n${text}`;
}

/** La alternativa antigua se utiliza solo durante la acción explícita de copiar. */
export function legacyCopy(text, doc) {
  if (!doc?.body || typeof doc.execCommand !== 'function') return false;
  const active = doc.activeElement;
  const buffer = doc.createElement('textarea');
  buffer.value = text;
  buffer.readOnly = true;
  buffer.tabIndex = -1;
  buffer.setAttribute('aria-label', 'Copia temporal de la propuesta');
  buffer.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none;';
  try {
    doc.body.append(buffer);
    buffer.focus({ preventScroll: true });
    buffer.select();
    buffer.setSelectionRange(0, text.length);
    return doc.execCommand('copy') === true;
  } catch {
    return false;
  } finally {
    buffer.remove();
    try { active?.focus({ preventScroll: true }); } catch { /* El foco original puede haber desaparecido. */ }
  }
}
export async function copyProposalText(text, environment = globalThis) {
  if (!text) return { copied: false, method: null };
  try {
    if (environment.isSecureContext !== false && typeof environment.navigator?.clipboard?.writeText === 'function') {
      await environment.navigator.clipboard.writeText(text);
      return { copied: true, method: 'clipboard' };
    }
  } catch { /* Probar la alternativa disponible, sin afirmar que se copió. */ }
  try {
    const copied = legacyCopy(text, environment.document);
    return { copied, method: copied ? 'legacy' : null };
  } catch {
    return { copied: false, method: null };
  }
}

export function initIdeaMailbox(root, environment = globalThis) {
  if (!root) return null;
  const find = (selector) => root.querySelector(selector);
  const draft = find('[data-idea-text]');
  const category = find('[data-idea-category]');
  const count = find('[data-idea-count]');
  const copy = find('[data-idea-copy]');
  const clear = find('[data-idea-clear]');
  const status = find('[data-idea-status]');
  const limitStatus = find('[data-idea-limit]');
  if ([draft, category, count, copy, clear, status, limitStatus].some((node) => !node)) return null;
  let busy = false;
  let revision = 0;
  let limitBand = 0;
  draft.maxLength = DRAFT_LIMIT;
  const copyLabel = 'Copiar mi propuesta';
  function sync() {
    const bounded = limitDraft(draft.value);
    if (draft.value !== bounded) draft.value = bounded;
    const length = draft.value.length;
    count.textContent = `${length} / ${DRAFT_LIMIT}`;
    copy.disabled = busy || !draft.value.trim();
    clear.disabled = draft.value === '' && category.value === '';
    const band = length === DRAFT_LIMIT ? 2 : length >= 450 ? 1 : 0;
    if (band !== limitBand) {
      limitStatus.textContent = band === 2 ? 'Has alcanzado el límite de 500 caracteres.' : band === 1 ? 'Quedan 50 caracteres o menos.' : '';
      limitBand = band;
    }
  }
  draft.addEventListener('input', () => {
    revision += 1;
    draft.removeAttribute('aria-invalid');
    status.textContent = '';
    sync();
  });
  category.addEventListener('change', () => {
    revision += 1;
    status.textContent = '';
    sync();
  });
  async function copyDraft() {
    if (busy) return false;
    sync();
    const text = formatProposal(draft.value, category.value);
    if (!text) {
      status.textContent = 'Escribe una propuesta antes de copiarla.';
      draft.setAttribute('aria-invalid', 'true');
      draft.focus();
      return false;
    }
    const startedAt = revision;
    busy = true;
    copy.textContent = 'Copiando…';
    status.textContent = 'Intentando copiar la propuesta…';
    sync();
    try {
      const result = await copyProposalText(text, environment);
      if (startedAt === revision) {
        status.textContent = result.copied ? COPY_SUCCESS : 'No pudimos copiar automáticamente. Puedes copiar el borrador manualmente desde el campo de texto con el menú de tu dispositivo o con Ctrl+C / ⌘C.';
        if (!result.copied) { draft.focus(); draft.select(); }
      } else if (result.copied && draft.value.trim()) {
        status.textContent = 'Se copió una versión anterior del borrador. Vuelve a copiar para incluir los cambios.';
      }
      return result.copied;
    } finally {
      busy = false;
      copy.textContent = copyLabel;
      sync();
    }
  }
  function clearDraft() {
    revision += 1;
    draft.value = '';
    category.value = '';
    draft.removeAttribute('aria-invalid');
    sync();
    status.textContent = 'Borrador borrado. No se ha enviado ninguna propuesta.';
    draft.focus();
  }
  copy.addEventListener('click', copyDraft);
  clear.addEventListener('click', clearDraft);
  sync();
  find('[data-idea-fallback]')?.remove();
  return { copyDraft, clearDraft };
}

