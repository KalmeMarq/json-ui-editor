import { defineConfig } from 'vite';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';
import path from 'path';

export default defineConfig({
  build: {
    target: 'esnext'
  },
  base: './',
  plugins: [monacoEditorPlugin()],
  publicDir: 'static',
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src')
    }
  }
});
