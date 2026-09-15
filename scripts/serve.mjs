import http from 'node:http';
import { readFile, realpath, stat } from 'node:fs/promises';
import { dirname, extname, isAbsolute, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const portFlag = args.indexOf('--port');
const rootFlag = args.indexOf('--root');
const port = Number(portFlag < 0 ? process.env.PORT || 4173 : args[portFlag + 1]);
const root = await realpath(resolve(projectRoot, rootFlag < 0 ? '.' : args[rootFlag + 1] || '.'));
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Порт должен быть числом от 1 до 65535.');

const contentTypes = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.md': 'text/plain; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.ttf': 'font/ttf', '.otf': 'font/otf', '.zip': 'application/zip',
};
const outsideRoot = path => {
  const part = relative(root, path);
  return part === '..' || part.startsWith('../') || part.startsWith('..\\') || isAbsolute(part);
};

const server = http.createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end('Method not allowed');
    return;
  }
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
    if (pathname.includes('\0')) throw Object.assign(new Error('Bad path'), { code: 'BAD_PATH' });
    let path = resolve(root, `.${pathname}`);
    if (outsideRoot(path)) {
      response.writeHead(403).end('Forbidden');
      return;
    }
    let info = await stat(path);
    if (info.isDirectory()) {
      path = resolve(path, 'index.html');
      info = await stat(path);
    }
    path = await realpath(path);
    if (outsideRoot(path) || !info.isFile()) {
      response.writeHead(403).end('Forbidden');
      return;
    }
    const body = await readFile(path);
    response.writeHead(200, {
      'Content-Type': contentTypes[extname(path).toLowerCase()] || 'application/octet-stream',
      'Content-Length': body.length,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch (error) {
    const status = error instanceof URIError || error.code === 'BAD_PATH' ? 400 : error.code === 'ENOENT' || error.code === 'ENOTDIR' ? 404 : 500;
    response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' }).end(status === 404 ? 'Файл не найден' : 'Не удалось открыть файл');
  }
});
server.on('error', error => {
  console.error(error.code === 'EADDRINUSE' ? `Порт ${port} занят. Запустите npm run dev -- --port ${port + 1}` : error.message);
  process.exitCode = 1;
});
server.listen(port, '127.0.0.1', () => {
  console.log(`Lighthouse UIKit: http://127.0.0.1:${port}`);
  console.log(`Игровой пример: http://127.0.0.1:${port}/examples/game.html`);
});
