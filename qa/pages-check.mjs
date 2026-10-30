/** Comprobaciones de despliegue: node qa/pages-check.mjs (Node 22+). */
import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { root, prefix, excluded, startPagesServer } from './pages-server.mjs';
import { topics } from '../js/topics-data.js';
import { resources } from '../js/resources-data.js';
import { episodes } from '../js/episodes-data.js';
import { experiences } from '../js/reflection-data.js';

const files = [];
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    const relative = path.relative(root, target).split(path.sep).join('/');
    if (excluded(relative)) continue;
    if (entry.isDirectory()) await walk(target); else files.push(relative);
  }
}
await walk(root);
const names = new Set(files);
const base = new URL('https://example.invalid/change-lab/');
const checked = new Set();
function check(reference, owner = 'index.html') {
  if (!reference || /^(?:https?:|mailto:|data:)/i.test(reference)) return;
  assert.ok(!/^(?:\/|[a-z]:|file:|\\)/i.test(reference), `${owner}: ruta absoluta ${reference}`);
  const url = new URL(reference.replaceAll('&amp;', '&'), new URL(owner, base));
  assert.ok(url.pathname.startsWith(prefix), `${owner}: sale de /change-lab/`);
  const relative = decodeURIComponent(url.pathname.slice(prefix.length)) || 'index.html';
  assert.ok(names.has(relative), `${owner}: ruta ausente, excluida o capitalización incorrecta: ${relative}`);
  checked.add(relative);
}
assert.ok(names.has('index.html'));
assert.equal((await stat(path.join(root, '.nojekyll'))).size, 0);
for (const file of files) {
  assert.ok((await stat(path.join(root, file))).size <= 100 * 1024 ** 2, `${file}: supera 100 MiB`);
  if (!/\.(?:html|js|css)$/.test(file)) continue;
  const text = await readFile(path.join(root, file), 'utf8');
  if (file.endsWith('.html')) {
    for (const [, ref] of text.matchAll(/(?:href|src|poster)="([^"]+)"/g)) check(ref, file);
  } else if (file.endsWith('.js')) {
    for (const [, ref] of text.matchAll(/from\s+['"]([^'"]+)['"]/g)) check(ref, file);
  } else {
    for (const [, ref] of text.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) check(ref, file);
  }
}
for (const item of topics) { check(item.route); check(item.image.src); }
for (const item of resources) { check(item.route); check(item.episodeRoute); }
for (const item of experiences) check(item.route);
for (const episode of Object.values(episodes)) {
  for (const ref of Object.values(episode.media)) check(ref);
}
assert.ok(!names.has('assets/videos/fast-fashion.mp4.mp4'));
assert.ok(names.has('assets/videos/fast-fashion-web.mp4'));
const videoSize = (await stat(path.join(root, 'assets/videos/fast-fashion-web.mp4'))).size;
assert.ok(videoSize <= 50 * 1024 ** 2, 'Advertencia: reducir o revisar el MP4 web antes de incluirlo (>50 MiB).');
console.log(`PASS ${checked.size} rutas locales y capitalización bajo ${prefix}; MP4 web ${(videoSize / 1024 ** 2).toFixed(2)} MiB.`);

const server = await startPagesServer({ port: 0 });
const origin = `http://127.0.0.1:${server.address().port}`;
try {
  const home = await fetch(origin + prefix);
  assert.equal(home.status, 200);
  assert.ok((await home.text()).includes('No solo mires.'));
  for (const relative of checked) {
    const response = await fetch(new URL(prefix + relative, origin), { method: 'HEAD' });
    assert.equal(response.status, 200, relative);
  }
  assert.equal((await fetch(origin + '/css/styles.css')).status, 404, 'Una ruta desde la raíz del dominio no debe funcionar.');
  assert.equal((await fetch(origin + prefix + 'assets/videos/fast-fashion.mp4.mp4', { method: 'HEAD' })).status, 404);
  const video = await fetch(origin + prefix + 'assets/videos/fast-fashion-web.mp4', { headers: { Range: 'bytes=0-31' } });
  assert.equal(video.status, 206);
  assert.equal((await video.arrayBuffer()).byteLength, 32);
  assert.equal(video.headers.get('content-type'), 'video/mp4');
  for (const slug of ['pandillaje', 'ciberacoso']) {
    const response = await fetch(origin + prefix + `assets/videos/${slug}.mp4`, { headers: { Range: 'bytes=0-31' } });
    assert.equal(response.status, 206);
    assert.equal((await response.arrayBuffer()).byteLength, 32);
    assert.equal(response.headers.get('content-type'), 'video/mp4');
  }
  console.log('PASS servidor con subdirectorio, recursos incluidos y Range del MP4; máster inaccesible.');
} finally {
  server.closeAllConnections();
  await new Promise(resolve => server.close(resolve));
}
