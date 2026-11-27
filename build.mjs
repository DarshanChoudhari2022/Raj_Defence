import { cp, mkdir } from 'node:fs/promises';
import { build } from 'vite';
import { fileURLToPath } from 'node:url';

const output = new URL('./dist/', import.meta.url);
await mkdir(output, { recursive: true });
for (const path of ['index.html', 'style.css', 'app.js', 'platforms.js', 'assets', 'vendor']) {
  await cp(new URL(path, import.meta.url), new URL(path, output), { recursive: true });
}
await build({
  build: {
    outDir: fileURLToPath(output),
    emptyOutDir: false,
    lib: { entry: 'viewer.js', formats: ['es'], fileName: () => 'viewer.js' }
  }
});
