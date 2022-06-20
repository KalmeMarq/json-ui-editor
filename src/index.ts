/* 
  Still very disorganized. I'll fix it in the next 6969696969696969 years.
*/
import * as monaco from 'monaco-editor';
import { Application } from 'pixi.js';
import stripJsonComments from 'strip-json-comments';
import uiSchema from '../static/ui.schema.json?raw';
import uiDefsSchema from '../static/ui_defs.schema.json?raw';
import screenDefsSchema from '../static/screen_defs.schema.json?raw';
import base from '../static/base.json?raw';
import screenDefbase from '../static/screendef.base.json?raw';
import globalVariablesBase from '../static/global_variables.base.json?raw';
import uiDefsBase from '../static/ui_defs.base.json?raw';
import { colorFromArray, colorFromHex, colorFromHSL, colorFromRGB, evalArea, parseColor, parseJsonC } from './utils';
import { Color, UIFileDefinitionTree, UIFileDefinitionTreeElement, UIFileVisualTree, UIFileVisualTreeElement } from './types';

//#region Debugging
declare global {
  interface Window {
    colorFromArray: (color: Color) => Color;
    colorFromHex: (color: string) => Color;
    colorFromRGB: (color: string) => Color;
    colorFromHSL: (color: string) => Color;
    evalArea: (area: any, context: any) => any;
    parseColor: any;
  }
}
window.colorFromArray = colorFromArray;
window.colorFromHex = colorFromHex;
window.colorFromRGB = colorFromRGB;
window.colorFromHSL = colorFromHSL;
window.evalArea = evalArea;
window.parseColor = parseColor;
//#endregion

let uiDefsUri = new monaco.Uri();
uiDefsUri = uiDefsUri.with({ path: '_ui_defs.json' });

let screenDefsUri = new monaco.Uri();
screenDefsUri = screenDefsUri.with({ path: '_screen_definitions.json' });

const editor = monaco.editor.create(document.getElementById('editor')!, {
  value: base,
  language: 'json',
  tabSize: 2,
  folding: true,
  minimap: {
    enabled: false
  },
  theme: 'vs-dark',
  automaticLayout: true
});

monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
  validate: true,
  allowComments: true,
  schemaValidation: 'warning',
  schemas: [
    {
      uri: 'ui',
      fileMatch: ['*', '!_ui_defs.json', '!_screen_definitions.json'],
      schema: JSON.parse(stripJsonComments(uiSchema))
    },
    {
      uri: uiDefsUri.toString(),
      fileMatch: ['_ui_defs.json'],
      schema: JSON.parse(stripJsonComments(uiDefsSchema))
    },
    {
      uri: screenDefsUri.toString(),
      fileMatch: ['_screen_definitions.json'],
      schema: JSON.parse(stripJsonComments(screenDefsSchema))
    }
  ]
});

const app = new Application({
  width: 800,
  height: 600,
  view: document.getElementById('screen') as HTMLCanvasElement,
  backgroundColor: 0xffffff
});

let files: (
  | {
      type: 'text';
      name: string;
      data: string;
      ctxmenu: boolean;
      model: monaco.editor.ITextModel;
    }
  | {
      type: 'image';
      name: string;
      ctxmenu: boolean;
      img: HTMLImageElement;
    }
)[] = [
  {
    type: 'text',
    name: '_screen_definitions.json',
    data: screenDefbase,
    ctxmenu: false,
    model: monaco.editor.createModel(screenDefbase, 'json', screenDefsUri)
  },
  {
    type: 'text',
    name: '_global_variables.json',
    data: globalVariablesBase,
    ctxmenu: false,
    model: monaco.editor.createModel(globalVariablesBase, 'json')
  },
  {
    type: 'text',
    name: '_ui_defs.json',
    data: uiDefsBase,
    ctxmenu: false,
    model: monaco.editor.createModel(uiDefsBase, 'json', uiDefsUri)
  },
  {
    type: 'text',
    name: 'start_screen.json',
    data: base,
    ctxmenu: false,
    model: monaco.editor.createModel(base, 'json')
  }
];

const explorer = document.getElementById('explorer-list') as HTMLDivElement;
const consoleEl = document.getElementById('console') as HTMLDivElement;
explorer.innerHTML = '';
const fileCtxMenu = document.getElementById('file-contextmenu')!;

editor.setModel((files.find((f) => f.name === 'start_screen.json') as any).model);

function writeToConsole(text: string) {
  const p = document.createElement('p');
  p.innerHTML = text;
  consoleEl.appendChild(p);
  p.scrollIntoView();
}

(window as any).writeToConsole = writeToConsole;

window.addEventListener('click', (e) => {
  if (document.activeElement?.id !== fileCtxMenu.id) {
    fileCtxMenu.style.display = 'none';
    selected = '';
    fileCtxMenu.classList.toggle('locked', false);
  }
});

let selected = '';

function refreshExplorer() {
  explorer.innerHTML = '';
  files.forEach((file) => {
    createFile(file);
  });
}

document.getElementById('ctxmenu-delete')?.addEventListener('click', () => {
  if (selected !== '' && selected !== '_screen_definitions.json' && selected !== '_global_variable.json' && selected !== '_ui_defs.json' && selected !== 'start_screen.json') {
    const file = files.find((f) => f.name === selected);

    if (file) {
      files = files.filter((f) => f.name !== selected);
      for (let i = files.length - 1; i >= 0; i--) {
        if (files[i].type === 'text') {
          editor.setModel((files[i] as any).model);
          break;
        } else {
          continue;
        }
      }
      refreshExplorer();
    }
  }
});

function createFile(file: { type: 'text'; model: monaco.editor.ITextModel; name: string; ctxmenu: boolean } | { type: 'image'; img: HTMLImageElement; name: string; ctxmenu: boolean }) {
  const btn = document.createElement('button');
  btn.className = 'file-item';
  btn.id = file.name;
  btn.title = file.name;

  btn.addEventListener('click', () => {
    if (file.type === 'text') {
      document.getElementById('editor')!.style.display = 'block';
      document.getElementById('image-previewer')!.style.display = 'none';
      document.getElementById('image-previewer')!.innerHTML = '';
      editor.setModel(file.model);
    } else if (file.type === 'image') {
      document.getElementById('editor')!.style.display = 'none';
      document.getElementById('image-previewer')!.style.display = 'flex';
      document.getElementById('image-previewer')!.innerHTML = '';

      document.getElementById('image-previewer')!.appendChild(file.img);
    }
  });

  btn.addEventListener('contextmenu', (e) => {
    const rect = btn.getBoundingClientRect();
    fileCtxMenu.style.top = rect.top + 'px';
    fileCtxMenu.style.left = e.clientX + 'px';
    fileCtxMenu.style.display = 'flex';
    selected = file.name;

    fileCtxMenu.classList.toggle('locked', !file.ctxmenu);
  });

  const cont = document.createElement('div');
  cont.className = 'file-item-content';
  const ficon = document.createElement('div');
  ficon.className = 'file-icon';
  ficon.innerHTML = '<img src="icons/file_type_' + (file.type === 'text' ? 'json' : 'image') + '.svg">';
  const flabel = document.createElement('div');
  flabel.className = 'file-label';
  flabel.textContent = file.name;

  cont.appendChild(ficon);
  cont.appendChild(flabel);
  btn.appendChild(cont);

  explorer.appendChild(btn);
}

files.forEach((file) => {
  createFile(file);
});

explorer.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const newFilePopup = document.getElementById('new-file-popup') as HTMLDivElement;
const newFileInput = document.getElementById('new-file-name') as HTMLInputElement;

document.getElementById('new-file')!.addEventListener('click', () => {
  newFilePopup.style.display = 'block';
  newFileInput.value = '';
  newFileInput.focus();
});

document.getElementById('refresh-explorer')!.addEventListener('click', () => {
  refreshExplorer();
});

document.getElementById('create-new-file')!.addEventListener('click', () => {
  if (newFileInput.value.length > 0 && files.every((f) => newFileInput.value !== f.name)) {
    const model = monaco.editor.createModel('', 'json');

    const obj: any = {
      type: 'text',
      name: newFileInput.value,
      data: '',
      ctxmenu: true,
      model
    };
    files.push(obj);

    createFile(obj);
    newFilePopup.style.display = 'none';
    newFileInput.value = '';

    editor.setModel(model);
  }
});

document.getElementById('cancel-new-file')!.addEventListener('click', () => {
  newFilePopup.style.display = 'none';
  newFileInput.value = '';
});

window.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.code === 'KeyS') {
    e.preventDefault();
    processUI();
  }
});

let uiFiles: Record<string, any> = {};
let screenDefinitions: Record<string, { id: string; target: string }> = {};

function parseUITreeElement(namespace: string, name: string, props: any) {
  let el_namespace = namespace;
  let el_name = name.split('@')[0];
  let el_super = name.split('@')[1] ?? '';
  let el_super_namespace = '';
  let el_props = props as any;

  if (el_super !== undefined) {
    el_super = el_super.includes('.') ? el_super.split('.')[0] : el_super;
    el_super_namespace = el_super.includes('.') ? el_super.split('.')[0] : el_namespace;
  }

  let children: UIFileDefinitionTreeElement[] = [];

  if (el_props.controls !== undefined && Array.isArray(el_props.controls)) {
    el_props.controls.forEach((e: any) => {
      const c = Object.entries(e)[0];
      children.push(parseUITreeElement(namespace, c[0] as string, c[1] as any));
    });

    el_props.controls = children;
  }

  return {
    name: el_name,
    namespace: el_namespace,
    super: el_super,
    super_namespace: el_super_namespace,
    properties: el_props
  };
}

function parseUIVisualTree() {
  Object.entries(uiFiles).forEach(([namespace, data]) => {
    const tree: UIFileVisualTree = {};

    Object.entries<UIFileDefinitionTreeElement>(data).forEach(([el_name, el_data]) => {
      // console.log(el_name, el_data);

      if (el_data.super !== '') {
        // console.log(uiFiles[el_data.super_namespace][el_data.super]);
      } else {
        const obj: UIFileVisualTreeElement = {
          name: el_name,
          namespace: el_data.namespace,
          full_name: `${el_name}${el_data.super === '' ? '' : `@${el_data.super_namespace}.${el_data.super}`}`,
          properties: el_data.properties
        };

        console.log(obj);
      }
    });
  });
}

function parseUITree(rootElement: string) {
  const nm = rootElement.split('.')[0];
  const target = rootElement.split('.')[1];

  // if (uiFiles[nm] === undefined) {
  //   writeToConsole('[ERROR] UI: ' + nm + ' namespace does not exist.');
  //   return;
  // }

  // console.log(uiFiles[nm]);
  // if (uiFiles[nm][target] === undefined) {
  //   writeToConsole('[ERROR] UI: ' + nm + '.' + target + ' element does not exist.');
  //   return;
  // }

  Object.entries(uiFiles).forEach(([namespace, data]) => {
    const tree: UIFileDefinitionTree = {};

    Object.entries(data).forEach(([name, props]) => {
      let el_namespace = namespace;
      let el_name = name.split('@')[0];
      let el_super = name.split('@')[1] ?? '';
      let el_super_namespace = '';
      let el_props = props as any;

      if (el_super !== undefined) {
        el_super = el_super.includes('.') ? el_super.split('.')[0] : el_super;
        el_super_namespace = el_super.includes('.') ? el_super.split('.')[0] : el_namespace;
      }

      let children: UIFileDefinitionTreeElement[] = [];

      if (el_props.controls !== undefined && Array.isArray(el_props.controls)) {
        el_props.controls.forEach((e: any) => {
          const c = Object.entries(e)[0];
          children.push(parseUITreeElement(nm, c[0] as string, c[1] as any));
        });

        el_props.controls = children;
      }

      tree[el_name] = {
        name: el_name,
        namespace: el_namespace,
        super: el_super,
        super_namespace: el_super_namespace,
        properties: el_props
      };
    });

    uiFiles[namespace] = tree;
  });

  parseUIVisualTree();
}

function processUI() {
  const uiDefs = files.find((f) => f.name === '_ui_defs.json')!;

  if (uiDefs.type !== 'text') return;

  try {
    const ui_defs = parseJsonC(uiDefs.model.getValue()).ui_defs as string[];

    console.log(ui_defs);

    uiFiles = {};
    screenDefinitions = {};

    ui_defs.forEach((def) => {
      const defF = files.find((f) => f.name === def);

      if (defF?.type !== 'text') return;

      if (defF) {
        try {
          const fl = parseJsonC(defF.model.getValue());
          const nm = fl.namespace;
          delete fl.namespace;
          uiFiles[nm] = fl;
        } catch (e) {
          if (e instanceof Error) {
            writeToConsole('[ERROR] UI: Failed to parse ' + def + ':');
            writeToConsole('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + e.message);
            return;
          }
        }
      }
    });

    try {
      const screenDefs = files.find((f) => f.name === '_screen_definitions.json')!;
      if (screenDefs.type !== 'text') return;

      const screen_defs = parseJsonC(screenDefs.model.getValue()).screen_definitions;

      screen_defs.screens.forEach((def: { id: string; target: string }) => {
        screenDefinitions[def.id] = { id: def.id, target: def.target };
      });

      const s = screenDefinitions[screen_defs.default];
      parseUITree(s.target);
    } catch (e) {
      if (e instanceof Error) {
        writeToConsole('[ERROR] UI: Failed to parse _screen_definitions.json:');
        writeToConsole('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + e.message);
        return;
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      writeToConsole(e.message);
      return;
    }
  }
}

processUI();

explorer.addEventListener('drag', (e) => {
  e.preventDefault();
});

explorer.addEventListener('dragover', (e) => {
  e.preventDefault();
});

explorer.addEventListener('dragend', (e) => {
  e.preventDefault();
  explorer.classList.remove('drag-over');
});

explorer.addEventListener('dragenter', (e) => {
  e.preventDefault();
  explorer.classList.add('drag-over');
});

explorer.addEventListener('dragleave', (e) => {
  e.preventDefault();
  explorer.classList.remove('drag-over');
});

explorer.addEventListener('drop', (e) => {
  e.preventDefault();
  explorer.classList.remove('drag-over');

  if (e.dataTransfer) {
    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      const j = e.dataTransfer.files[i];
      const name = j.name;

      if (j.type === 'image/png') {
        j.arrayBuffer().then((d) => {
          const b = new Blob([d]);
          const img = new Image();
          img.src = URL.createObjectURL(b);
          img.onload = () => {
            const obj: any = {
              type: 'image',
              name: name,
              ctxmenu: true,
              img
            };
            files.push(obj);
            createFile(obj);
          };
        });
      } else {
        j.text().then((t) => {
          const model = monaco.editor.createModel(t, 'json');

          const obj: any = {
            type: 'text',
            name,
            data: t,
            ctxmenu: true,
            model
          };
          files.push(obj);

          createFile(obj);
          editor.setModel(model);
        });
      }
    }
  }
});
