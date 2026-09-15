import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const portable = ['kit', 'assets', 'examples', 'README.md'];
const showcase = ['index.html', 'catalog.html', 'showcase.css', 'app.js', 'preview.js', 'package.json'];
const tooling = ['scripts'];

// ZIP STORE: a standards-compatible archive without third-party packages or OS tools.
const crcTable = Uint32Array.from({ length: 256 }, (_, value) => {
  for (let i = 0; i < 8; i++) value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  return value >>> 0;
});
const crc32 = data => {
  let crc = 0xffffffff;
  for (const byte of data) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
};

async function collect(path) {
  const entries = await readdir(path, { withFileTypes: true });
  const files = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.name.startsWith('.')) continue;
    const absolute = join(path, entry.name);
    if (entry.isDirectory()) files.push(...await collect(absolute));
    else if (entry.isFile()) files.push(absolute);
  }
  return files;
}

async function zip(files) {
  const locals = [], central = [];
  let offset = 0;
  for (const path of files) {
    const name = Buffer.from(relative(dist, path).split('\\').join('/'), 'utf8');
    const data = await readFile(path), crc = crc32(data);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0); local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6); // UTF-8 names
    local.writeUInt16LE(0x21, 12); // 1980-01-01, deterministic timestamp
    local.writeUInt32LE(crc, 14); local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(data.length, 22); local.writeUInt16LE(name.length, 26);
    locals.push(local, name, data);
    const directory = Buffer.alloc(46);
    directory.writeUInt32LE(0x02014b50, 0); directory.writeUInt16LE(20, 4);
    directory.writeUInt16LE(20, 6); directory.writeUInt16LE(0x0800, 8);
    directory.writeUInt16LE(0x21, 14); directory.writeUInt32LE(crc, 16);
    directory.writeUInt32LE(data.length, 20); directory.writeUInt32LE(data.length, 24);
    directory.writeUInt16LE(name.length, 28); directory.writeUInt32LE(offset, 42);
    central.push(directory, name);
    offset += local.length + name.length + data.length;
  }
  const centralSize = central.reduce((size, part) => size + part.length, 0);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(files.length, 8); end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(centralSize, 12); end.writeUInt32LE(offset, 16);
  return Buffer.concat([...locals, ...central, end]);
}

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
for (const path of [...portable, ...showcase, ...tooling]) await cp(join(root, path), join(dist, path), {
  recursive: true,
  filter: source => !basename(source).startsWith('.') && !basename(source).endsWith('contact-sheet.png'),
});
await writeFile(join(dist, '.nojekyll'), '');
const files = [join(dist, 'README.md'), ...showcase.map(path => join(dist, path))];
for (const folder of ['kit', 'assets', 'examples', 'scripts']) files.push(...await collect(join(dist, folder)));
const archive = await zip(files);
await writeFile(join(dist, 'lighthouse-uikit.zip'), archive);
await writeFile(join(root, 'lighthouse-uikit.zip'), archive);
console.log(`Собрано: dist/ (${files.length} файлов в UIKit, ${(archive.length / 1024 / 1024).toFixed(2)} МБ в ZIP)`);
console.log('Архив интеграции: lighthouse-uikit.zip');
console.log('Локальный просмотр сборки: npm run dev -- --root dist');
