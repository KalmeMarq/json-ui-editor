/* 
  Still very disorganized. I'll fix it in the next 6969696969696969 years.
*/
import * as monaco from 'monaco-editor';
import * as PIXI from 'pixi.js';
import stripJsonComments from 'strip-json-comments';
import uiSchema from '../static/schemas/ui.schema.json?raw';
import uiDefsSchema from '../static/schemas/ui_defs.schema.json?raw';
import screenDefsSchema from '../static/schemas/screen_defs.schema.json?raw';
import globalVarsSchema from '../static/schemas/global_variables.schema.json?raw';
import startBase from '../static/base/start_screen.base.json?raw';
import screenDefbase from '../static/base/screendef.base.json?raw';
import uiCommonbase from '../static/base/ui_common.base.json?raw';
import globalVariablesBase from '../static/base/global_variables.base.json?raw';
import uiDefsBase from '../static/base/ui_defs.base.json?raw';
import { parseJsonC } from './utils';
import { ExplorerFile, ExplorerFileImage, ExplorerFileJson, ExplorerFileText, UIFileDefinitionTree, UIFileDefinitionTreeElement, UIFileVisualTree, UIFileVisualTreeElement } from './types';
import { UISpriteControl } from './controls';
import './debug';
import { createControl } from './controls_factory';
import { PIXI_SCALE_MODE, UI_SCALE } from './constants';
import { Gradient } from './gradient';
import { Vignette } from './vignette';

let uiDefsUri = new monaco.Uri();
uiDefsUri = uiDefsUri.with({ path: '_ui_defs.json' });

let screenDefsUri = new monaco.Uri();
screenDefsUri = screenDefsUri.with({ path: '_screen_definitions.json' });

let globalVarsUri = new monaco.Uri();
globalVarsUri = globalVarsUri.with({ path: '_global_variables.json' });

await Gradient.preloadShader();
await Vignette.preloadShader();

const editor = monaco.editor.create(document.getElementById('editor')!, {
  value: startBase,
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
      fileMatch: ['*', '!_ui_defs.json', '!_screen_definitions.json', '!_global_variables.json'],
      schema: JSON.parse(stripJsonComments(uiSchema))
    },
    {
      uri: globalVarsUri.toString(),
      fileMatch: ['_global_variables.json'],
      schema: JSON.parse(stripJsonComments(globalVarsSchema))
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

monaco.languages.json.jsonDefaults.setModeConfiguration({
  documentSymbols: true,
  colors: true,
  tokens: true,
  completionItems: true,
  diagnostics: true,
  hovers: true,
  documentFormattingEdits: true,
  documentRangeFormattingEdits: true,
  selectionRanges: true
});

const app = new PIXI.Application({
  width: 800,
  height: 600,
  view: document.getElementById('screen') as HTMLCanvasElement,
  resizeTo: document.getElementById('screen') as HTMLCanvasElement,
  backgroundColor: 0xffffff
});
PIXI.settings.SCALE_MODE = PIXI_SCALE_MODE;
app.stage.scale.set(UI_SCALE, UI_SCALE);
app.stage.sortableChildren = true;

let files: ExplorerFile[] = [
  {
    type: 'json',
    name: '_screen_definitions.json',
    contextMenu: false,
    model: monaco.editor.createModel(screenDefbase, 'json', screenDefsUri)
  },
  {
    type: 'json',
    name: '_global_variables.json',
    contextMenu: false,
    model: monaco.editor.createModel(globalVariablesBase, 'json', globalVarsUri)
  },
  {
    type: 'json',
    name: '_ui_defs.json',
    contextMenu: false,
    model: monaco.editor.createModel(uiDefsBase, 'json', uiDefsUri)
  },
  {
    type: 'json',
    name: 'start_screen.json',
    contextMenu: false,
    model: monaco.editor.createModel(startBase, 'json')
  },
  {
    type: 'json',
    name: 'ui_common.json',
    contextMenu: false,
    model: monaco.editor.createModel(uiCommonbase, 'json')
  }
];

const explorer = document.getElementById('explorer-list') as HTMLDivElement;
const consoleEl = document.getElementById('console') as HTMLDivElement;
explorer.innerHTML = '';
const filecontextMenu = document.getElementById('file-contextmenu')!;

editor.setModel((files.find((f) => f.name === 'start_screen.json') as any).model);
editor.focus();

function writeToConsole(text: string) {
  const p = document.createElement('p');
  p.innerHTML = text;
  consoleEl.appendChild(p);
  p.scrollIntoView();
}

(window as any).writeToConsole = writeToConsole;

window.addEventListener('click', (e) => {
  if (document.activeElement?.id !== filecontextMenu.id) {
    filecontextMenu.style.display = 'none';
    selected = '';
    filecontextMenu.classList.toggle('locked', false);
  }
});

let selected = '';

function refreshExplorer() {
  explorer.innerHTML = '';
  files.forEach((file) => {
    createFile(file);
  });
}

document.getElementById('contextMenu-delete')?.addEventListener('click', () => {
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

function createFile(file: ExplorerFile) {
  const btn = document.createElement('button');
  btn.className = 'file-item';
  btn.id = file.name;
  btn.title = file.name;

  btn.addEventListener('click', () => {
    if (file.type === 'text' || file.type === 'json') {
      document.getElementById('editor')!.style.display = 'block';
      document.getElementById('image-previewer')!.style.display = 'none';
      document.getElementById('image-previewer')!.innerHTML = '';
      editor.setModel(file.model);
    } else if (file.type === 'image') {
      document.getElementById('editor')!.style.display = 'none';
      document.getElementById('image-previewer')!.style.display = 'flex';
      document.getElementById('image-previewer')!.innerHTML = '';

      document.getElementById('image-previewer')!.appendChild(file.element);
    }
  });

  btn.addEventListener('contextmenu', (e) => {
    const rect = btn.getBoundingClientRect();
    filecontextMenu.style.top = rect.top + 'px';
    filecontextMenu.style.left = e.clientX + 'px';
    filecontextMenu.style.display = 'flex';
    selected = file.name;

    filecontextMenu.classList.toggle('locked', !file.contextMenu);
  });

  const cont = document.createElement('div');
  cont.className = 'file-item-content';
  const ficon = document.createElement('div');
  ficon.className = 'file-icon';
  ficon.innerHTML = '<img src="icons/file_type_' + file.type + '.svg">';
  const flabel = document.createElement('div');
  flabel.className = 'file-label';
  flabel.textContent = file.name;

  cont.appendChild(ficon);
  cont.appendChild(flabel);
  btn.appendChild(cont);

  explorer.appendChild(btn);
}

refreshExplorer();

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
      contextMenu: true,
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

  if (el_super !== undefined && el_super !== '') {
    if (el_super.includes('.')) {
      el_super_namespace = el_super.split('.')[0];
      el_super = el_super.split('.')[1];
    } else {
      el_super_namespace = namespace;
    }
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

function parseUIVisualTreeElement(c: UIFileDefinitionTreeElement): UIFileVisualTreeElement {
  if (c.super !== '' && c.super !== undefined) {
    const superEl = uiFiles[c.super_namespace][c.super];

    c.properties = { ...superEl.properties, ...c.properties };

    const children: UIFileVisualTreeElement[] = [];

    if (c.properties['controls'] && Array.isArray(c.properties['controls'])) {
      c.properties['controls'].forEach((d) => {
        children.push(parseUIVisualTreeElement(d));
      });

      c.properties['controls'] = children as any;
    }

    const vars: Record<string, { isDefault: boolean; value: string }> = {};
    Object.entries(c.properties).forEach(([prop_n, prop_v]) => {
      if (prop_n.startsWith('$')) {
        vars[prop_n] = { isDefault: prop_n.endsWith('|default'), value: prop_v };
      }
    });

    return {
      name: c.name,
      namespace: c.namespace,
      full_name: `${c.name}${c.super === '' ? '' : `@${c.super_namespace}.${c.super}`}`,
      properties: c.properties,
      variables: vars
    };
  } else {
    const children: UIFileVisualTreeElement[] = [];

    if (c.properties['controls'] && Array.isArray(c.properties['controls'])) {
      c.properties['controls'].forEach((d) => {
        children.push(parseUIVisualTreeElement(d));
      });

      c.properties['controls'] = children as any;
    }

    const vars: Record<string, { isDefault: boolean; value: string }> = {};
    Object.entries(c.properties).forEach(([prop_n, prop_v]) => {
      if (prop_n.startsWith('$')) {
        vars[prop_n] = { isDefault: prop_n.endsWith('|default'), value: prop_v };
      }
    });

    return {
      name: c.name,
      namespace: c.namespace,
      full_name: `${c.name}${c.super === '' ? '' : `@${c.super_namespace}.${c.super}`}`,
      properties: c.properties,
      variables: vars
    };
  }
}

function parseUIVisualTree(target: string) {
  const uiStuff: Record<string, Record<string, UIFileVisualTreeElement>> = {};

  Object.entries(uiFiles).forEach(([namespace, data]) => {
    const tree: UIFileVisualTree = {};

    Object.entries<UIFileDefinitionTreeElement>(data).forEach(([el_name, el_data]) => {
      tree[el_name] = parseUIVisualTreeElement(el_data);
    });

    uiStuff[namespace] = tree;
  });

  console.log(dealWithVariables(uiStuff, target));

  try {
    parseUI(uiStuff, target);
  } catch (e) {
    if (e instanceof Error) {
      writeToConsole('[ERROR] UI: Failed to parse UI:');
      writeToConsole('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + e.message);
      writeToConsole('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + e.stack);
      return;
    }
  }
}

function dealWithVariables(uiStuff: Record<string, Record<string, UIFileVisualTreeElement>>, target: string) {
  const target_namespace = target.split('.')[0];
  const target_name = target.split('.')[1];

  if (uiStuff[target_namespace][target_name] === undefined) {
    writeToConsole(`[ERROR] UI: Target element '${target}' does not exist`);
    return;
  }

  const tar = uiStuff[target_namespace][target_name];

  const globalVars = files.find((f) => f.name === '_global_variables.json' && f.type === 'json');

  if (globalVars && globalVars.type === 'json') {
    Object.entries(JSON.parse(stripJsonComments(globalVars.model.getValue()))).forEach(([var_nm, var_value]) => {
      tar.variables[var_nm.replace('|default', '')] = { isDefault: var_nm.endsWith('|default'), value: var_value as any };
    });
  }

  if (tar.properties['controls'] && Array.isArray(tar.properties['controls'])) {
    (tar.properties['controls'] as UIFileVisualTreeElement[]).forEach((c) => {
      Object.entries(tar.variables).forEach(([var_nm, var_value]) => {
        if (c.variables[var_nm] !== undefined) {
          if (c.variables[var_nm].isDefault) {
            c.variables[var_nm.replace('|default', '')] = { isDefault: var_value.isDefault, value: var_value.value };
          }
        } else {
          c.variables[var_nm.replace('|default', '')] = { isDefault: var_value.isDefault, value: var_value.value };
        }
      });

      Object.entries(c.properties).forEach(([prop_nm, prop_vl]) => {
        console.log(c.variables);
        if (typeof prop_vl === 'string' && prop_vl.startsWith('$')) {
          if (c.variables[prop_vl]) {
            c.properties[prop_nm] = c.variables[prop_vl].value;
          }
        }
      });

      dealWithVariablesElement(c);
    });
  }

  return uiStuff;
}

function dealWithVariablesElement(tar: UIFileVisualTreeElement) {
  if (tar.properties['controls'] && Array.isArray(tar.properties['controls'])) {
    (tar.properties['controls'] as UIFileVisualTreeElement[]).forEach((c) => {
      Object.entries(tar.variables).forEach(([var_nm, var_value]) => {
        if (c.variables[var_nm] !== undefined) {
          if (c.variables[var_nm].isDefault) {
            c.variables[var_nm.replace('|default', '')] = { isDefault: var_value.isDefault, value: var_value.value };
          }
        } else {
          c.variables[var_nm.replace('|default', '')] = { isDefault: var_value.isDefault, value: var_value.value };
        }
      });

      Object.entries(c.properties).forEach(([prop_nm, prop_vl]) => {
        console.log(c.variables);
        if (typeof prop_vl === 'string' && prop_vl.startsWith('$')) {
          if (c.variables[prop_vl]) {
            c.properties[prop_nm] = c.variables[prop_vl].value;
          }
        }
      });

      dealWithVariablesElement(c);
    });
  }
}

function parseUI(uiStuff: Record<string, Record<string, UIFileVisualTreeElement>>, target: string) {
  const target_namespace = target.split('.')[0];
  const target_name = target.split('.')[1];

  if (uiStuff[target_namespace][target_name] === undefined) {
    writeToConsole(`[ERROR] UI: Target element '${target}' does not exist`);
    return;
  }

  const root = createControl(null, uiStuff[target_namespace][target_name]);
  if (root === undefined) {
    writeToConsole('bruh');
    return;
  }

  const all_controls = root.getChildren();

  app.stage.removeChildren();

  // console.log(all_controls);

  root.init(0, 0, app.renderer.width, app.renderer.height);

  for (let i = 0; i < all_controls.length; i++) {
    const c = all_controls[i];
    app.stage.addChild(c.getRenderableContainer());
  }
}

function parseUITree(rootElement: string) {
  Object.entries(uiFiles).forEach(([namespace, data]) => {
    const tree: UIFileDefinitionTree = {};

    Object.entries(data).forEach(([name, props]) => {
      const p = parseUITreeElement(namespace, name, props);
      tree[p.name] = p;
    });

    uiFiles[namespace] = tree;
  });

  try {
    parseUIVisualTree(rootElement);
  } catch (e) {
    if (e instanceof Error) {
      writeToConsole('[ERROR] UI: Failed to parse UI Visual Tree:');
      writeToConsole('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + e.message);
      writeToConsole('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + e.stack);
      return;
    }
  }
}

function processUI() {
  UISpriteControl.cacheTxr = {};

  files.forEach((f) => {
    if (f.type === 'image') {
      document.body.prepend(f.element);
      const base = new PIXI.BaseTexture(f.element);
      const texture = new PIXI.Texture(base);
      UISpriteControl.cacheTxr[f.name] = texture;
    }
  });

  const uiDefs = files.find((f) => f.name === '_ui_defs.json')!;

  if (uiDefs.type !== 'json') return;

  try {
    const ui_defs = parseJsonC(uiDefs.model.getValue()).ui_defs as string[];

    console.log(ui_defs);

    uiFiles = {};
    screenDefinitions = {};

    ui_defs.forEach((def) => {
      const defF = files.find((f) => f.name === def);

      if (defF?.type !== 'json') return;

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
      if (screenDefs.type !== 'json') return;

      const screen_defs = parseJsonC(screenDefs.model.getValue()).screen_definitions;

      screen_defs.screens.forEach((def: { id: string; target: string }) => {
        screenDefinitions[def.id] = { id: def.id, target: def.target };
      });

      const s = screenDefinitions[screen_defs.default];
      try {
        parseUITree(s.target);
      } catch (e) {
        if (e instanceof Error) {
          writeToConsole('[ERROR] UI: Failed to parse UI Tree:');
          writeToConsole('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + e.message);
          return;
        }
      }
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

window.addEventListener('resize', () => {
  processUI();
});

['drag', 'dragover', 'dragend', 'dragenter', 'dragleave', 'drop'].forEach((name) =>
  explorer.addEventListener(name, (e) => {
    e.preventDefault();
  })
);

explorer.addEventListener('dragenter', (e) => {
  explorer.classList.add('drag-over');
});

explorer.addEventListener('dragleave', (e) => {
  explorer.classList.remove('drag-over');
});

explorer.addEventListener('drop', (e) => {
  explorer.classList.remove('drag-over');

  if (e.dataTransfer) {
    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      const j = e.dataTransfer.files[i];
      const name = j.name;
      const type = j.type;

      if (type === 'image/png' || type === 'image/jpg' || type === 'image/jpeg') {
        j.arrayBuffer().then((d) => {
          const b = new Blob([d]);
          const img = new Image();
          img.src = URL.createObjectURL(b);
          img.onload = () => {
            const obj: ExplorerFileImage = {
              type: 'image',
              name: name,
              contextMenu: true,
              element: img
            };
            files.push(obj);
            createFile(obj);
          };
        });
      } else if (type === 'application/json' || type.startsWith('text')) {
        j.text().then((t) => {
          const model = monaco.editor.createModel(t, type === 'application/json' ? 'json' : 'plaintext');

          const obj: ExplorerFileJson | ExplorerFileText = {
            type: type === 'application/json' ? 'json' : 'text',
            name,
            contextMenu: true,
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
