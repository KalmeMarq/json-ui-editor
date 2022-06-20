import { defineConfig } from 'vite';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';

export default defineConfig({
  build: {
    target: 'esnext'
  },
  base: './',
  plugins: [
    monacoEditorPlugin({
      languageWorkers: ['json', 'editorWorkerService']
    })
  ],
  publicDir: 'static'
});
