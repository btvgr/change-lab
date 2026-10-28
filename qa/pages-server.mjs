/** Servidor de prueba bajo /change-lab/, sin dependencias. Node 22+. */
import http from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import process from 'node:process';

export const root = fileURLToPath(new URL('../', import.meta.url));
export const prefix = '/change-lab/';

// Refleja las exclusiones actuales de .gitignore para la previsualización.
// No sustituye git check-ignore ni una revisión del índice antes del commit.
export function excluded(relative) {
  return relative === 'assets/videos/fast-fashion.mp4.mp4'
    || /^qa\/[^/]+\.png$/i.test(relative)
    || /(?:^|\/)(?:\.git|node_modules)(?:\/|$)/.test(relative)
    || /^(?:\.private|\.local|\.vscode)(?:\/|$)/.test(relative)
    || relative.split('/').some(name => /^\.env(?:\.|$)/.test(name)
      || /\.(?:pem|key|p12|pfx|log|tmp)$/.test(name)
      || ['.DS_Store', 'Thumbs.db', 'desktop.ini'].includes(name));
}

const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4', '.vtt': 'text/vtt; charset=utf-8',
  '.woff2': 'font/woff2', '.md': 'text/plain; charset=utf-8'
};

export async function startPagesServer({ port = 8087 } = {}) {
  const server = http.createServer(async (request, response) => {
    try {
      if (!['GET', 'HEAD'].includes(request.method)) {
        response.writeHead(405, { Allow: 'GET, HEAD' }).end(); return;
      }
      const pathname = new URL(request.url, 'http://localhost').pathname;
      if (pathname === '/change-lab') {
        response.writeHead(301, { Location: prefix }).end(); return;
      }
      if (!pathname.startsWith(prefix)) { response.writeHead(404).end(); return; }
      const relative = decodeURIComponent(pathname.slice(prefix.length)) || 'index.html';
      const target = path.resolve(root, relative);
      if (!target.startsWith(root) || relative.includes('\0') || excluded(relative)) {
        response.writeHead(404).end(); return;
      }
      const info = await stat(target);
      if (!info.isFile()) { response.writeHead(404).end(); return; }
      const headers = {
        'Content-Type': types[path.extname(target)] || 'application/octet-stream',
        'Content-Length': info.size, 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-store'
      };
      let start = 0, end = info.size - 1, status = 200;
      if (request.headers.range) {
        const range = /^bytes=(\d+)-(\d*)$/.exec(request.headers.range);
        if (!range || Number(range[1]) >= info.size || (range[2] && Number(range[2]) < Number(range[1]))) {
          response.writeHead(416, { 'Content-Range': `bytes */${info.size}` }).end(); return;
        }
        start = Number(range[1]);
        end = range[2] ? Math.min(Number(range[2]), info.size - 1) : info.size - 1;
        headers['Content-Length'] = end - start + 1;
        headers['Content-Range'] = `bytes ${start}-${end}/${info.size}`;
        status = 206;
      }
      response.writeHead(status, headers);
      if (request.method === 'HEAD') { response.end(); return; }
      const stream = createReadStream(target, { start, end });
      stream.on('error', () => response.destroy());
      response.on('close', () => stream.destroy());
      stream.pipe(response);
    } catch { if (!response.headersSent) response.writeHead(404); response.end(); }
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', resolve);
  });
  return server;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  await startPagesServer();
  console.log('Vista local: http://127.0.0.1:8087/change-lab/ (Ctrl+C para cerrar)');
}
