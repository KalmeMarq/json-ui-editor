/* 
  Still very disorganized. I'll fix it in the next 6969696969696969 years.
*/
import * as monaco from 'monaco-editor';
import * as PIXI from 'pixi.js';
import stripJsonComments from 'strip-json-comments';
import uiSchema from '../static/ui.schema.json?raw';
import uiDefsSchema from '../static/ui_defs.schema.json?raw';
import screenDefsSchema from '../static/screen_defs.schema.json?raw';
import base from '../static/base.json?raw';
import screenDefbase from '../static/screendef.base.json?raw';
import uiCommonbase from '../static/ui_common.base.json?raw';
import globalVariablesBase from '../static/global_variables.base.json?raw';
import uiDefsBase from '../static/ui_defs.base.json?raw';
import { clamp, colorFromArray, colorFromHex, colorFromHSL, colorFromRGB, evalArea, parseColor, parseJsonC, resolveGradientDirection } from './utils';
import { Color, UIFileDefinitionTree, UIFileDefinitionTreeElement, UIFileVisualTree, UIFileVisualTreeElement } from './types';
import { UIControl, UICustomControl, UICustomFillRenderer, UICustomGradientRenderer, UIFillControl, UILabelControl, UIPanelControl, UISpriteControl } from './controls';

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

const app = new PIXI.Application({
  width: 800,
  height: 600,
  view: document.getElementById('screen') as HTMLCanvasElement,
  resizeTo: document.getElementById('screen') as HTMLCanvasElement,
  backgroundColor: 0xffffff
});
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
app.stage.scale.set(2, 2);
app.stage.sortableChildren = true;

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
  },
  {
    type: 'text',
    name: 'ui_common.json',
    data: uiCommonbase,
    ctxmenu: false,
    model: monaco.editor.createModel(uiCommonbase, 'json')
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

    return {
      name: c.name,
      namespace: c.namespace,
      full_name: `${c.name}${c.super === '' ? '' : `@${c.super_namespace}.${c.super}`}`,
      properties: c.properties
    };
  } else {
    const children: UIFileVisualTreeElement[] = [];

    if (c.properties['controls'] && Array.isArray(c.properties['controls'])) {
      c.properties['controls'].forEach((d) => {
        children.push(parseUIVisualTreeElement(d));
      });

      c.properties['controls'] = children as any;
    }

    return {
      name: c.name,
      namespace: c.namespace,
      full_name: `${c.name}${c.super === '' ? '' : `@${c.super_namespace}.${c.super}`}`,
      properties: c.properties
    };
  }
}

function parseUIVisualTree(target: string) {
  const uiStuff: Record<string, Record<string, UIFileVisualTreeElement>> = {};

  Object.entries(uiFiles).forEach(([namespace, data]) => {
    const tree: UIFileVisualTree = {};

    Object.entries<UIFileDefinitionTreeElement>(data).forEach(([el_name, el_data]) => {
      if (el_data.super !== '') {
        const superEl = uiFiles[el_data.super_namespace][el_data.super];

        el_data.properties = { ...superEl.properties, ...el_data.properties };

        const children: UIFileVisualTreeElement[] = [];

        if (el_data.properties['controls'] && Array.isArray(el_data.properties['controls'])) {
          el_data.properties['controls'].forEach((c) => {
            children.push(parseUIVisualTreeElement(c));
          });

          el_data.properties['controls'] = children as any;
        }

        const obj: UIFileVisualTreeElement = {
          name: el_name,
          namespace: el_data.namespace,
          full_name: `${el_name}${el_data.super === '' ? '' : `@${el_data.super_namespace}.${el_data.super}`}`,
          properties: el_data.properties
        };

        tree[el_name] = obj;
      } else {
        const children: UIFileVisualTreeElement[] = [];

        if (el_data.properties['controls'] && Array.isArray(el_data.properties['controls'])) {
          el_data.properties['controls'].forEach((c) => {
            children.push(parseUIVisualTreeElement(c));
          });

          el_data.properties['controls'] = children as any;
        }

        const obj: UIFileVisualTreeElement = {
          name: el_name,
          namespace: el_data.namespace,
          full_name: `${el_name}${el_data.super === '' ? '' : `@${el_data.super_namespace}.${el_data.super}`}`,
          properties: el_data.properties
        };

        tree[el_name] = obj;
      }
    });

    uiStuff[namespace] = tree;
  });

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

const availableTypes = ['fill', 'custom', 'panel', 'image', 'label'];

function createControl(parent: UIControl | null, c: UIFileVisualTreeElement): UIControl | undefined {
  if (c.properties['ignored']) return undefined;

  if (c.properties['type'] === undefined || !availableTypes.includes(c.properties['type'])) {
    writeToConsole('[ERROR] UI: ' + c.full_name + '; type property required.');
    return undefined;
  }

  if (c.properties['type'] === 'panel') {
    const control = new UIPanelControl();

    populateLayout(parent, control, c);
    populateControl(parent, control, c);

    control.parent = parent;

    return control;
  } else if (c.properties['type'] === 'fill') {
    const control = new UIFillControl();

    populateLayout(parent, control, c);
    populateControl(parent, control, c);
    populateFill(parent, control, c);

    control.parent = parent;

    return control;
  } else if (c.properties['type'] === 'image') {
    const control = new UISpriteControl();

    populateLayout(parent, control, c);
    populateControl(parent, control, c);
    populateSprite(parent, control, c);

    control.parent = parent;

    return control;
  } else if (c.properties['type'] === 'label') {
    const control = new UILabelControl();

    populateLayout(parent, control, c);
    populateControl(parent, control, c);
    populateText(parent, control, c);

    control.parent = parent;

    return control;
  } else if (c.properties['type'] === 'custom') {
    const control = new UICustomControl();

    populateLayout(parent, control, c);
    populateControl(parent, control, c);
    populateCustom(parent, control, c);

    control.parent = parent;

    return control;
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

  console.log(all_controls);

  for (let i = 0; i < all_controls.length; i++) {
    const c = all_controls[i];
    c.init();
    app.stage.addChild(c.getRenderableContainer());
  }
}

function populateText(parent: UIControl | null, control: UILabelControl, c: UIFileVisualTreeElement) {
  if (typeof c.properties['text'] === 'string') {
    control.text = c.properties['text'];
  }

  if (typeof c.properties['shadow'] === 'boolean') {
    control.shadow = c.properties['shadow'];
  }

  if (c.properties['color']) {
    control.color = parseColor(c.properties['color']);
  }

  if (typeof c.properties['font_scale_factor'] === 'number') {
    control.font_scale_factor = c.properties['font_scale_factor'];
  }

  if (typeof c.properties['font_size'] === 'string') {
    switch (c.properties['font_size']) {
      case 'small':
        control.font_size = 'small';
        break;
      case 'normal':
        control.font_size = 'normal';
        break;
      case 'large':
        control.font_size = 'large';
        break;
      case 'extra_large':
        control.font_size = 'extra_large';
        break;
    }
  }
}

function populateSprite(parent: UIControl | null, control: UISpriteControl, c: UIFileVisualTreeElement) {
  if (c.properties['color']) {
    control.color = parseColor(c.properties['color']);
  }

  if (typeof c.properties['texture'] === 'string') {
    control.texture = c.properties['texture'];
  }

  if (typeof c.properties['grayscale'] === 'boolean') {
    control.grayscale = c.properties['grayscale'];
  }

  if (typeof c.properties['keep_ratio'] === 'boolean') {
    control.keep_ratio = c.properties['keep_ratio'];
  }

  if (typeof c.properties['clip_ratio'] === 'number') {
    control.clip_ratio = c.properties['clip_ratio'];
  }

  if (c.properties['nineslice_size']) {
    if (typeof c.properties['nineslice_size'] === 'number') {
      const s = clamp(c.properties['nineslice_size'], 0, Infinity);
      control.nineslice_size = [s, s, s, s];
    } else if (Array.isArray(c.properties['nineslice_size']) && c.properties['nineslice_size'].length === 4) {
      control.nineslice_size = c.properties['nineslice_size'] as any;
    }
  }

  if (typeof c.properties['tiled'] === 'string') {
    if (c.properties['tiled'] === 'x') {
      control.tiled = 'x';
    } else if (c.properties['tiled'] === 'y') {
      control.tiled = 'y';
    }
  }

  if (typeof c.properties['tiled'] === 'boolean') {
    control.tiled = c.properties['tiled'];
  }

  if (typeof c.properties['clip_direction'] === 'string') {
    switch (c.properties['clip_direction']) {
      case 'left':
        control.clip_direction = 'left';
        break;
      case 'right':
        control.clip_direction = 'right';
        break;
      case 'up':
        control.clip_direction = 'up';
        break;
      case 'down':
        control.clip_direction = 'down';
        break;
      // case 'center':
      //   control.clip_direction = 'center';
      //   break;
    }
  }

  if (c.properties['tiled_scale'] && Array.isArray(c.properties['tiled_scale'])) {
    if (c.properties['tiled_scale'].length === 2) {
      control.tiled_scale = c.properties['tiled_scale'] as any;
    }
  }

  if (c.properties['uv'] && Array.isArray(c.properties['uv'])) {
    if (c.properties['uv'].length === 2) {
      control.uv = c.properties['uv'] as any;
    }
  }

  if (c.properties['uv_size'] && Array.isArray(c.properties['uv_size'])) {
    if (c.properties['uv_size'].length === 2) {
      control.uv_size = c.properties['uv_size'] as any;
    }
  }

  if (c.properties['base_size'] && Array.isArray(c.properties['base_size'])) {
    if (c.properties['base_size'].length === 2) {
      control.base_size = c.properties['base_size'] as any;
    }
  }
}

function populateCustom(parent: UIControl | null, control: UICustomControl, c: UIFileVisualTreeElement) {
  if (c.properties['color']) {
    control.color = parseColor(c.properties['color']);
  }

  if (c.properties['color1']) {
    control.color1 = parseColor(c.properties['color1']);
  }

  if (c.properties['color2']) {
    control.color2 = parseColor(c.properties['color2']);
  }

  if (c.properties['gradient_direction']) {
    control.gradient_direction = resolveGradientDirection(c.properties['gradient_direction']);
  }

  if (c.properties['renderer']) {
    switch (c.properties['renderer']) {
      case 'fill_renderer':
        control.renderer = new UICustomFillRenderer();
        break;
      case 'gradient_renderer':
        control.renderer = new UICustomGradientRenderer();
        break;
    }
  }
}

function populateControl(parent: UIControl | null, control: UIControl, c: UIFileVisualTreeElement) {
  if (typeof c.properties['visible'] === 'boolean') {
    control.visible = c.properties['visible'];
  }

  if (typeof c.properties['alpha'] === 'boolean') {
    control.alpha = c.properties['alpha'];
  }

  if (typeof c.properties['layer'] === 'number') {
    control.layer = c.properties['layer'];
  }

  if (Array.isArray(c.properties['controls'])) {
    for (let i = 0; i < c.properties['controls'].length; i++) {
      const d = createControl(control, c.properties['controls'][i]);
      if (d) control.addChild(d);
    }
  }
}

function populateFill(parent: UIControl | null, control: UIFillControl, c: UIFileVisualTreeElement) {
  if (c.properties['color']) {
    control.color = parseColor(c.properties['color']);
  }
}

function populateLayout(parent: UIControl | null, control: UIControl, c: UIFileVisualTreeElement) {
  // console.log(c.name, c.properties['size'], parent, parent?.size[0], parent?.size[1]);

  const apprect = app.view.getBoundingClientRect();
  if (c.properties['size']) {
    if (Array.isArray(c.properties['size']) && c.properties['size'].length === 2) {
      control.size = evalArea(c.properties['size'] as any, { parent_width: parent !== null ? parent.size[0] : apprect.width / 2, parent_height: parent !== null ? parent.size[1] : apprect.height / 2 });
    }
  } else {
    control.size = evalArea(['100%', '100%'], { parent_width: parent !== null ? parent.size[0] : apprect.width / 2, parent_height: parent !== null ? parent.size[1] : apprect.height / 2 });
  }

  if (c.properties['offset']) {
    if (Array.isArray(c.properties['offset']) && c.properties['offset'].length === 2) {
      control.offset = evalArea(c.properties['offset'] as any, { parent_width: parent !== null ? parent.size[0] : apprect.width / 2, parent_height: parent !== null ? parent.size[1] : apprect.height / 2 });
    }
  } else {
    control.offset = evalArea([0, 0], { parent_width: parent !== null ? parent.size[0] : apprect.width / 2, parent_height: parent !== null ? parent.size[1] : apprect.height / 2 });
  }
}

function parseUITree(rootElement: string) {
  const nm = rootElement.split('.')[0];
  const target = rootElement.split('.')[1];

  Object.entries(uiFiles).forEach(([namespace, data]) => {
    const tree: UIFileDefinitionTree = {};

    Object.entries(data).forEach(([name, props]) => {
      let el_namespace = namespace;
      let el_name = name.split('@')[0];
      let el_super = name.split('@')[1] ?? '';
      let el_super_namespace = '';
      let el_props = props as any;

      if (el_super !== undefined) {
        el_super = el_super.includes('.') ? el_super.split('.')[1] : el_super;
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
      document.body.prepend(f.img);
      const base = new PIXI.BaseTexture(f.img);
      const texture = new PIXI.Texture(base);
      UISpriteControl.cacheTxr[f.name] = texture;
    }
  });

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
