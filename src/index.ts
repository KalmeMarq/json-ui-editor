import * as monaco from 'monaco-editor';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

const editor = monaco.editor.create(document.getElementById('meh')!, {
  value: await (await fetch('base.json')).text(),
  language: 'json',
  tabSize: 2,
  folding: true,
  theme: 'vs-dark',
  automaticLayout: true
});

window.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.code === 'KeyS') {
    e.preventDefault();

    try {
      console.log(JSON.parse(editor.getValue()));
    } catch (e) {
      if (e instanceof Error) {
        term.writeln(e.message);
      }
    }
  }
});

const term = new Terminal({
  rendererType: 'dom',
  convertEol: true,
  fontFamily: 'fira code',
  windowsMode: true
});
const fitAddon = new FitAddon();
term.loadAddon(fitAddon);
term.open(document.getElementById('terminal') as HTMLDivElement);
fitAddon.fit();

window.addEventListener('resize', () => {
  fitAddon.fit();
});
