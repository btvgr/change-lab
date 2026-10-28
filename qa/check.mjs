/** QA local sin paquetes. Ejecutar con Node 22+: node qa/check.mjs */
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { topics } from '../js/topics-data.js';
import { resources, specificSources } from '../js/resources-data.js';
import { episodes } from '../js/episodes-data.js';
import { experiences } from '../js/reflection-data.js';
import { filterTopics } from '../js/topics-filter.js';
import { evaluateAnswer } from '../js/quiz.js';
import { initNavigation } from '../js/navigation.js';
import { initDecisionLab } from '../js/decision-lab.js';
import { initEpisodeMedia } from '../js/episode-media.js';
import { limitDraft, formatProposal, copyProposalText } from '../js/idea-mailbox.js';
import { getContactLinks } from '../js/contact-channels.js';
import { contactChannels } from '../js/contact-data.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const files = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (['.git', 'node_modules'].includes(entry.name)) continue;
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(file); else files.push(file);
  }
}
await walk(root);
const fileNames = new Set(files.map(file => path.relative(root, file)));
const passed = [];
async function test(name, run) { await run(); passed.push(name); console.log('PASS ' + name); }

await test('Rutas, anclas, IDs y un h1 en todos los HTML', async () => {
  for (const file of files.filter(file => file.endsWith('.html'))) {
    const html = await readFile(file, 'utf8');
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1, file);
    if (path.basename(file) === 'reflexiona.html') assert.ok(!html.includes('<li><h4>'), 'Jerarquía del respaldo sin JS');
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length, file + ': IDs duplicados');
    for (const [, ref] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (/^(https?:|mailto:)/.test(ref)) continue;
      const [filePath, fragment] = ref.split('#');
      const target = filePath ? path.resolve(path.dirname(file), filePath) : file;
      assert.ok(target.startsWith(root), 'Ruta fuera del proyecto');
      assert.ok(fileNames.has(path.relative(root, target)), file + ': nombre/ruta o mayúsculas incorrectos ' + ref);
      const contents = await readFile(target, 'utf8');
      if (fragment) assert.ok(contents.includes(`id="${fragment}"`), file + ': ' + ref);
    }
    for (const [, refs] of html.matchAll(/(?:aria-labelledby|aria-describedby|aria-controls|for)="([^"]+)"/g)) {
      for (const id of refs.split(/\s+/)) assert.ok(ids.includes(id), file + ': ' + id);
    }
  }
});
await test('Imports locales y carga nativa de módulos con DOM inerte', async () => {
  const previousDocument = globalThis.document;
  const previousWindow = globalThis.window;
  globalThis.document = { querySelector: () => null, querySelectorAll: () => [] };
  globalThis.window = { matchMedia: () => ({ matches: false, addEventListener() {} }) };
  try {
    for (const file of files.filter(file => file.endsWith('.js'))) {
      const source = await readFile(file, 'utf8');
      for (const [, ref] of source.matchAll(/from '([^']+)'/g)) await readFile(path.resolve(path.dirname(file), ref));
      await import(pathToFileURL(file).href + '?qa-load');
    }
  } finally { globalThis.document = previousDocument; globalThis.window = previousWindow; }
});
await test('Rutas de datos, fichas sincronizadas y archivos multimedia configurados', async () => {
  for (const topic of topics) await readFile(path.join(root, topic.route));
  for (const resource of resources) {
    const html = await readFile(path.join(root, resource.route), 'utf8');
    for (const text of [resource.title, resource.introduction, ...resource.sections.flatMap(section => [section.title, section.text])]) assert.ok(html.includes(text), resource.slug);
    await readFile(path.join(root, resource.episodeRoute));
  }
  for (const experience of experiences) await readFile(path.join(root, experience.route));
  for (const episode of Object.values(episodes)) {
    for (const key of ['src', 'poster', 'captions', 'transcript']) {
      if (episode.media[key]) await readFile(path.join(root, episode.media[key]));
    }
  }
  assert.equal(specificSources.length, 0);
  assert.equal(getContactLinks(contactChannels).length, 0);
});
await test('Búsqueda y filtros combinados de catálogo y Recursos', () => {
  const cases = [
    [topics, '', 'Todos', ['001','002','003']],
    [topics, 'PREVENCION', 'Sociedad', ['001']],
    [topics, 'prevencion', 'Entorno digital', ['003']],
    [topics, 'ropa', 'Sociedad', []],
    [topics, '  FAST   FASHION ', 'Todos', ['002']],
    [resources, 'ropa', 'Fast fashion', ['002']],
    [resources, 'ropa', 'Pandillaje', []],
    [resources, 'redes sociales', 'Ciberacoso', ['003']],
    [resources, 'apoyo', 'Todos', ['001','003']]
  ];
  for (const [items, query, category, expected] of cases) assert.deepEqual(filterTopics(items, query, category).map(item => item.id), expected);
});
await test('63 evaluaciones de los tres quizzes: claves, errores y vacíos', () => {
  const keys = { pandillaje: [1,0,2], 'fast-fashion': [1,0,2], ciberacoso: [1,2,0] };
  for (const [slug, expected] of Object.entries(keys)) episodes[slug].questions.forEach((question, index) => {
    assert.equal(question.correct, expected[index]);
    for (let choice = 0; choice < 3; choice++) {
      const result = evaluateAnswer(question, choice);
      assert.equal(result.valid, true);
      assert.equal(result.correct, choice === expected[index]);
      assert.ok(result.message.includes(question.explanation));
    }
    for (const choice of [-1,3,null,NaN]) assert.equal(evaluateAnswer(question, choice).valid, false);
  });
});

// Dobles DOM acotados: prueban lógica; no sustituyen un navegador o lector de pantalla.
class Element {
  constructor() { Object.assign(this, { children: [], events: {}, attributes: {}, dataset: {}, hidden: false, textContent: '', style: {} }); }
  append(...nodes) { this.children.push(...nodes); }
  replaceChildren(...nodes) { this.children = nodes; }
  querySelector(selector) { return this.nodes?.[selector]; }
  setAttribute(key, value) { this.attributes[key] = value; }
  getAttribute(key) { return this.attributes[key] ?? null; }
  addEventListener(key, run) { this.events[key] = run; }
  focus(options) { this.focused = true; this.focusOptions = options; if (globalThis.document) document.activeElement = this; }
  scrollIntoView(options) { this.scrollOptions = options; }
  contains(node) { return this === node || this.children.some(child => child.contains(node)); }
  remove() { this.removed = true; }
  select() { this.selected = true; }
  setSelectionRange() {}
  load() { this.loaded = true; }
  pause() { this.paused = true; }
}
const originalDocument = globalThis.document;
const originalWindow = globalThis.window;
try {
  await test('Menú: apertura, Escape, foco y cambio a escritorio (DOM simulado)', () => {
    const toggle = new Element(), nav = new Element(), link = new Element();
    nav.append(link); nav.nodes = { a: link };
    const media = { matches: false, addEventListener(name, run) { this.change = run; } };
    globalThis.window = { matchMedia: () => media };
    globalThis.document = { activeElement: null, querySelector: selector => selector === '.menu-toggle' ? toggle : nav, events: {}, addEventListener(name, run) { this.events[name] = run; } };
    initNavigation(); assert.equal(nav.hidden, true);
    toggle.events.click(); assert.equal(nav.hidden, false);
    document.events.keydown({ key: 'Escape' }); assert.equal(nav.hidden, true); assert.equal(document.activeElement, toggle);
    media.matches = true; media.change(); assert.equal(nav.hidden, false); assert.equal(toggle.hidden, true); assert.equal(document.activeElement, link);
  });
  await test('Nueve decisiones y reinicios de Reflexiona (DOM simulado)', () => {
    const names = ['experience-selectors','decision-panel','lab-idle','decision-title','decision-label','decision-context','decision-options','decision-feedback','decision-final','decision-question','decision-related','decision-retry','decision-change','lab-announcer','lab-fallback'];
    const nodes = Object.fromEntries(names.map(name => [name, new Element()]));
    const host = new Element(); host.nodes = Object.fromEntries(names.map(name => [`[data-${name}]`, nodes[name]])); nodes['decision-panel'].id = 'decision-panel';
    const motion = { matches: false };
    globalThis.document = { createElement: () => new Element() }; globalThis.window = { matchMedia: () => motion };
    const api = initDecisionLab(host, experiences);
    for (const experience of experiences) {
      api.selectExperience(experience.id);
      experience.options.forEach((option, index) => {
        api.chooseResponse(index); assert.equal(nodes['decision-feedback'].textContent, option.feedback); assert.equal(nodes['decision-question'].textContent, experience.reflection);
        api.retryResponse(); assert.equal(api.getState().responseIndex, null); assert.equal(nodes['decision-final'].hidden, true);
      });
      api.chooseAnotherSituation(); assert.equal(api.getState().experienceId, null); assert.equal(nodes['decision-panel'].hidden, true);
    }
    motion.matches = true; api.selectExperience('001'); assert.equal(nodes['decision-panel'].scrollOptions.behavior, 'auto');
  });
  await test('Video sin fuente, metadatos, VTT y error (eventos simulados)', () => {
    globalThis.document = { createElement: () => new Element() };
    const video = new Element(), placeholder = new Element(), status = new Element(), transcript = new Element(), host = new Element();
    video.hidden = true; host.nodes = { video, '[data-media-placeholder]': placeholder, '[data-media-status]': status, '[data-media-transcript]': transcript };
    initEpisodeMedia(host, { src: '' }, 'https://qa.test/proyecto/'); assert.equal(video.loaded, undefined); assert.equal(video.hidden, true);
    initEpisodeMedia(host, { src: 'assets/videos/test.mp4', captions: 'assets/subtitles/test.vtt' }, 'https://qa.test/proyecto/');
    assert.equal(video.src, 'https://qa.test/proyecto/assets/videos/test.mp4'); assert.equal(video.children[0].kind, 'captions');
    video.events.loadedmetadata(); assert.equal(video.hidden, false); assert.equal(video.controls, true);
    video.events.error(); assert.equal(video.hidden, true); assert.equal(video.controls, false); assert.equal(placeholder.hidden, false);
  });
} finally { globalThis.document = originalDocument; globalThis.window = originalWindow; }
await test('Contacto: límite, formato y Clipboard con éxito/error simulado', async () => {
  assert.equal(limitDraft('x'.repeat(501)).length, 500);
  assert.equal(limitDraft('x'.repeat(499) + '😀').length, 499);
  assert.equal(formatProposal('  '), '');
  assert.ok(formatProposal('Idea', 'Medio ambiente').includes('Categoría: Medio ambiente\n\nIdea'));
  let copied;
  const success = await copyProposalText('Idea', { navigator: { clipboard: { async writeText(text) { copied = text; } } }, isSecureContext: true });
  assert.equal(success.copied, true); assert.equal(copied, 'Idea');
  const failure = await copyProposalText('Idea', { navigator: { clipboard: { async writeText() { throw new Error('denegado'); } } }, isSecureContext: true });
  assert.equal(failure.copied, false);
  for (const outcome of [true, false, 'throw']) {
    const buffer = new Element();
    let restored = false;
    const doc = {
      activeElement: { focus() { restored = true; } },
      body: { append() {} },
      createElement: () => buffer,
      execCommand(command) { assert.equal(command, 'copy'); if (outcome === 'throw') throw new Error('denegado'); return outcome; }
    };
    const legacy = await copyProposalText('Idea', { document: doc });
    assert.equal(legacy.copied, outcome === true);
    assert.equal(buffer.removed, true);
    assert.equal(restored, true);
  }
});
console.log(JSON.stringify({ scenariosPassed: passed.length, html: files.filter(file => file.endsWith('.html')).length, js: files.filter(file => file.endsWith('.js')).length }, null, 2));





