import { defineConfig } from 'tsup';

export default defineConfig({
  name: 'internal-models',
  entry: ['src/index.ts'],
  outDir: 'dist',
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  format: ['cjs', 'esm'],
  treeshake: true,
});
