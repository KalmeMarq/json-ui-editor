import * as monaco from 'monaco-editor';
import stripJsonComments from 'strip-json-comments';
import { DrawContext } from './DrawContext';
import { TextRenderer } from './TextRenderer';
import { Binding, UIControl, UIEvent, UIScreenControl, createControl } from './controls';
import { RenderSystem, setGL } from './gl';
import { Matrix4f } from './math';
import { preparePrograms } from './program';
import { globalVarsSchema, screenDefsSchema, uiDefsSchema, uiSchema } from './schemas';
import { ExplorerFile, ExplorerFileImage, ExplorerFileJson, ExplorerFileText } from './types';
import { namespacedSources } from './uis';
import { setDebug } from './vars';

let SHOW_ALERT = true;
if (localStorage.getItem('firstTime')) {
  SHOW_ALERT = false;
}

if (SHOW_ALERT) {
  alert('If the screen goes black press ctrl+s. Press L to show debug outlines and press K to show the ui files source code');
  localStorage.setItem('firstTime', 'true');
}

const editor = monaco.editor.create(document.getElementById('editor')!, {
  value: '{}',
  language: 'json',
  tabSize: 2,
  folding: true,
  minimap: {
    enabled: false
  },
  theme: 'vs-dark',
  automaticLayout: true
});

let uiDefsUri = new monaco.Uri();
uiDefsUri = uiDefsUri.with({ path: '_ui_defs.json' });

let screenDefsUri = new monaco.Uri();
screenDefsUri = screenDefsUri.with({ path: '_screen_definitions.json' });

let globalVarsUri = new monaco.Uri();
globalVarsUri = globalVarsUri.with({ path: '_global_variables.json' });

let langUri = new monaco.Uri();
langUri = langUri.with({ path: 'en_us.json' });

monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
  validate: true,
  allowComments: true,
  schemaValidation: 'warning',
  schemas: [
    {
      uri: 'ui',
      fileMatch: ['*', '!_ui_defs.json', '!en_us.json', '!_screen_definitions.json', '!_global_variables.json'],
      schema: uiSchema
    },
    {
      uri: globalVarsUri.toString(),
      fileMatch: ['_global_variables.json'],
      schema: JSON.parse(stripJsonComments(globalVarsSchema))
    },
    {
      uri: globalVarsUri.toString(),
      fileMatch: ['en_us.json'],
      schema: JSON.parse(stripJsonComments(globalVarsSchema))
    },
    {
      uri: uiDefsUri.toString(),
      fileMatch: ['_ui_defs.json'],
      schema: JSON.parse(stripJsonComments(uiDefsSchema))
    },
    {
      uri: screenDefsUri.toString(),
      fileMatch: ['_screen_defs.json'],
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

const explorer = document.getElementById('explorer-list') as HTMLDivElement;
const consoleEl = document.getElementById('console') as HTMLDivElement;
explorer.innerHTML = '';
const filecontextMenu = document.getElementById('file-contextmenu')!;

function writeToConsole(text: string, type: 'info' | 'error' = 'info') {
  const p = document.createElement('p');
  if (type == 'info') {
    p.textContent = typeof text === 'object' ? JSON.stringify(text) : text;
  } else {
    const span = document.createElement('span');
    span.style.color = 'red';
    span.textContent = typeof text === 'object' ? JSON.stringify(text) : text;
    p.appendChild(span);
  }
  consoleEl.appendChild(p);
  consoleEl.scrollTop = consoleEl.scrollHeight;
}

(window as any)['writeToConsole'] = writeToConsole;

let files: ExplorerFile[] = [
  {
    type: 'text',
    name: 'features.txt',
    contextMenu: false,
    model: monaco.editor.createModel(await (await fetch('features.txt')).text(), 'text')
  },
  {
    type: 'json',
    name: '_screen_defs.json',
    contextMenu: false,
    model: monaco.editor.createModel(await (await fetch('./ui/screen_defs.json')).text(), 'json', screenDefsUri)
  },
  {
    type: 'json',
    name: '_ui_defs.json',
    contextMenu: false,
    model: monaco.editor.createModel(await (await fetch('./ui/ui_defs.json')).text(), 'json', uiDefsUri)
  },
  {
    type: 'json',
    name: '_global_variables.json',
    contextMenu: false,
    model: monaco.editor.createModel(await (await fetch('./ui/global_variables.json')).text(), 'json', globalVarsUri)
  },
  {
    type: 'json',
    name: 'start_screen.json',
    contextMenu: false,
    model: monaco.editor.createModel(namespacedSources['start'], 'json')
  },
  {
    type: 'json',
    name: 'play_screen.json',
    contextMenu: false,
    model: monaco.editor.createModel(namespacedSources['play'], 'json')
  },
  {
    type: 'json',
    name: 'ui_common.json',
    contextMenu: false,
    model: monaco.editor.createModel(namespacedSources['common'], 'json')
  },
  {
    type: 'json',
    name: 'start_screen.json',
    contextMenu: false,
    model: monaco.editor.createModel(namespacedSources['start'], 'json')
  },
  {
    type: 'json',
    name: 'en_us.json',
    contextMenu: false,
    model: monaco.editor.createModel(await (await fetch('lang/en_us.json')).text(), 'json', langUri)
  },
  {
    type: 'image',
    name: 'grass.png',
    contextMenu: false,
    element: await new Promise<HTMLImageElement>((res) => {
      const m = new Image();
      m.src = './grass.png';
      m.onload = () => {
        res(m);
      };
    })
  }
];

RenderSystem.getImageFromExplorer = (path) => {
  for (const file of files) {
    if (file.type == 'image' && file.name == path) {
      return file.element;
    }
  }

  return null;
};

editor.setModel((files.find((f) => f.name === 'start_screen.json') as any).model);
editor.focus();

function refreshExplorer() {
  explorer.innerHTML = '';
  files.forEach((file) => {
    createFile(file);
  });
}

let selected = 'start_screen.json';

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
      type: 'json',
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

window.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.code === 'KeyS') {
    e.preventDefault();
    reloadUIStuff();
  }
});

const canvas = document.getElementById('screen') as HTMLCanvasElement;
const gl = canvas.getContext('webgl2') as WebGL2RenderingContext;
setGL(gl);
preparePrograms(gl);
gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.canvas.width = canvas.clientWidth;
gl.canvas.height = canvas.clientHeight;

let lastTime = performance.now();
let frames = 0;
const fpsEl = document.getElementById('fps')!;

const projMat = new Matrix4f().identity().setOrtho(0, canvas.clientWidth / 2, canvas.clientHeight / 2, 0, 1000, 3000);
const modelViewMat = new Matrix4f().identity().translate(0, 0, -2000);

let DEBUG_UIFILES = false;

const keys: Record<string, boolean> = {};
let mouseX = -1;
let mouseY = -1;
document.addEventListener('keydown', (e) => {
  keys[e.code] = true;

  writeToConsole('keydown[code=' + e.code + ']');

  if (e.code == 'Escape') {
    ScreenStack_event({
      type: 'button_id',
      id: 'button.menu_cancel',
      x: mouseX,
      y: mouseY,
      pressed: true,
      double_pressed: false,
      emit(buttonId, control) {
        if (buttonId == 'button.menu_exit') {
          ScreenStack_pop();
        }
      }
    });
  }
});
document.addEventListener('keyup', (e) => {
  keys[e.code] = false;

  (window as any).writeToConsole('keyup[code=' + e.code + ']');

  if (e.code == 'KeyK' && keys['ShiftLeft']) {
    e.preventDefault();
    DEBUG_UIFILES = !DEBUG_UIFILES;
    document.getElementById('ui-files')!.style.display = DEBUG_UIFILES ? 'block' : 'none';
  } // } else if (e.code == 'KeyP' && keys['ShiftLeft']) {
  //   e.preventDefault();
  //   ScreenStack_push(createScreen('play').screen);
  // } else if (e.code == 'KeyO' && keys['ShiftLeft']) {
  //   e.preventDefault();
  //   ScreenStack_pop();
  // }
});

canvas.addEventListener('mousedown', (e) => {
  writeToConsole('mousedown[x=' + e.offsetX / 2 + ',y=' + e.offsetY / 2 + ']');

  if (e.button == 0) {
    ScreenStack_event({
      type: 'button_id',
      id: 'button.menu_select',
      x: mouseX,
      y: mouseY,
      pressed: true,
      double_pressed: e.detail == 2,
      emit(buttonId, control) {
        if (buttonId == 'button.menu_exit') {
          ScreenStack_pop();
        }

        if (buttonId == 'button.menu_play') {
          ScreenStack_push(createScreen('play').screen);
        }
      }
    });
  }
});

canvas.addEventListener('mousemove', (e) => {
  mouseX = e.offsetX / 2;
  mouseY = e.offsetY / 2;
});

window.addEventListener('resize', () => {
  gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);
  projMat.identity().setOrtho(0, canvas.clientWidth / 2, canvas.clientHeight / 2 + 1, 0, 1000, 3000);
});

let cachedScreens: Record<string, UIScreen> = {};
const screenStack: UIScreen[] = [];
function ScreenStack_push(screen: UIScreen) {
  screenStack.push(screen);
}
function ScreenStack_pop() {
  const popped = screenStack.pop();
  if (popped) {
    cachedScreens[popped.name] = popped;
  }
}
function ScreenStack_clear() {
  screenStack.length = 0;
}
function ScreenStack_event(event: UIEvent) {
  if (screenStack.length == 0) return;
  screenStack[screenStack.length - 1].screenEl?.onEvent(event);
}
function ScreenStack_render(context: DrawContext) {
  if (screenStack.length == 0) return;
  let renderThatShit = screenStack[screenStack.length - 1].forceRenderBelow();

  for (let i = 0; i < screenStack.length; ++i) {
    const screen = screenStack[i];

    if (i == screenStack.length - 1) {
      screen.render(context, mouseX, mouseY);
    } else if (renderThatShit || !screen.renderOnlyWhenTopMost()) {
      screen.render(context, mouseX, mouseY);
    }
  }
}

class UIScreen {
  name = Math.random() * 1000 + '';
  screenEl?: UIScreenControl;
  tree: Record<string, UIControl> = {};
  actions: Record<string, (control: UIControl) => void> = {};
  bindings: Record<string, Binding> = {};

  public registerActions() {}

  public registerBindings() {}

  public render(context: DrawContext, mouseX: number, mouseY: number) {
    if (this.screenEl) {
      this.screenEl.render(context, mouseX, mouseY);
    }
  }

  getBinding(name: string) {
    if (this.bindings[name] == null) {
      this.bindings[name] = new Binding().setValue(0);
    }
    return this.bindings[name];
  }

  setBinding(name: string, value: any) {
    if (this.bindings[name] == null) {
      this.bindings[name] = new Binding().setValue(value);
    } else {
      this.bindings[name].setValue(value);
    }
  }

  public forceRenderBelow() {
    return this.screenEl != null ? this.screenEl.forceRenderBelow : false;
  }

  public renderOnlyWhenTopMost() {
    return this.screenEl != null ? this.screenEl.renderOnlyWhenTopMost : true;
  }
}

class StartScreen extends UIScreen {
  constructor() {
    super();
    this.name = 'start';
  }

  public registerActions(): void {
    this.actions['button.menu_play'] = (control) => {
      writeToConsole('setScreen play');
    };
  }

  public registerBindings(): void {
    this.registerBinding('#fill0_size', 80);
    this.registerBinding('#grad1_width', 80);
    this.registerBinding('#grad0_color0', [1, 0, 1, 1]);
    this.registerBinding('#grad0_color1', [0, 0, 1, 1]);
    this.registerBinding('#test_x_off', 0);
    this.registerBinding('#test_y_off', 0);
  }

  private registerBinding(name: string, value: any) {
    if (this.bindings[name] == null) {
      this.bindings[name] = new Binding();
    }
    this.bindings[name].setValue(value);
  }

  public render(context: DrawContext, mouseX: number, mouseY: number): void {
    if ((performance.now() / 1000) % 2 == 0) {
      this.setBinding('#grad0_color0', [Math.random(), Math.random(), Math.random(), 1]);
      this.setBinding('#grad0_color1', [Math.random(), Math.random(), Math.random(), 1]);
    }

    this.setBinding('#grad1_width', Math.sin(performance.now() / 1000) * 80 + 160);
    this.setBinding('#test_x_off', Math.sin(performance.now() / 1000) * 120 + 120);

    this.setBinding('#fill0_size', Math.sin(performance.now() / 1000) * 80 + 80 + 20);

    super.render(context, mouseX, mouseY);
  }
}

class PlayScreen extends UIScreen {
  constructor() {
    super();
    this.name = 'play';
  }

  public registerActions(): void {
    this.actions['button.menu_exit'] = (control) => {
      ScreenStack_pop();
    };
  }
}

function getJsonFileSource(filename: string) {
  for (const file of files) {
    if (file.name == filename && file.type == 'json') {
      return stripJsonComments(file.model.getValue());
    }
  }

  return namespacedSources[filename.replace('_screen.json', '')];
}

let parsedTrees: Record<string, Record<string, any>> = {};

function parseTrees() {
  parsedTrees = {};

  const uiDef = JSON.parse(stripJsonComments(getJsonFileSource('_ui_defs.json')));

  for (const uidef of uiDef['ui_defs']) {
    const data = JSON.parse(stripJsonComments(getJsonFileSource(uidef)));

    const parsedTree: Record<string, any> = {};

    let nm = typeof data['namespace'] === 'string' ? data['namespace'] : Math.random() * 1000 + '';
    for (let [key, value] of Object.entries<any>(data)) {
      if (key === 'namespace') {
        continue;
      }

      const newControls: any[] = [];
      if (value['controls']) {
        for (let child of value['controls']) {
          for (let [cname, cprops] of Object.entries<any>(child)) {
            const p: any = {};

            p[cname.includes('@') ? cname.split('@')[0] : cname] = cprops;

            if (cname.includes('@')) {
              let supn = cname.split('@')[1];

              if (data[supn] != null) {
                p[cname.split('@')[0]] = { ...data[cname.split('@')[1]], ...cprops };
              }
            }

            newControls.push(p);
            break;
          }
        }
      }
      value['controls'] = newControls;
      parsedTree[nm + '.' + key] = value;
    }

    parsedTrees[nm] = parsedTree;
  }
}

function createScreen(name: string) {
  if (cachedScreens[name] != null) return { screen: cachedScreens[name] };

  const tree: Record<string, UIControl> = {};
  const actions: Record<string, (control: UIControl) => void> = {};
  const bindings: Record<string, Binding> = {};

  let screen: UIScreen;

  if (name == 'start') {
    screen = new StartScreen();
  } else if (name == 'play') {
    screen = new PlayScreen();
  } else {
    throw new Error('bruh');
  }

  screen.tree = tree;
  screen.actions = actions;
  screen.bindings = bindings;

  try {
    const screenDefs = JSON.parse(stripJsonComments(getJsonFileSource('_screen_defs.json')))['screen_definitions']['screens'][name]['context'];

    Object.entries(screenDefs['bindings']).forEach(([k, v]) => {
      screen.bindings[k] = new Binding().setValue(v);
    });
  } catch (e) {
    writeToConsole(e as any);
  }

  screen.registerActions();
  screen.registerBindings();

  const data = JSON.parse(stripJsonComments(getJsonFileSource(name + '_screen.json')));
  let nm = typeof data['namespace'] === 'string' ? data['namespace'] : name;
  const parsedTree: Record<string, any> = parsedTrees[nm];

  const control = createControl(name + '_screen', null, parsedTrees, parsedTree[nm + '.' + name + '_screen'], bindings, tree);

  if (control) {
    tree[control.path] = control;
  }

  screen.screenEl = tree['/' + name + '_screen'] as UIScreenControl;
  screen.screenEl.x = 0;
  screen.screenEl.y = 0;
  screen.screenEl.w = canvas.clientWidth;
  screen.screenEl.h = canvas.clientHeight;

  for (const bind of Object.values(bindings)) {
    bind.notifyAll();
  }

  writeToConsole('created ' + name + ' screen');

  return {
    screen
  };
}

const fontData = await (await fetch('./font.json')).json();

const textRenderer = new TextRenderer(fontData);

function reloadUIStuff() {
  ScreenStack_clear();
  cachedScreens = {};
  parseTrees();

  const firstSCreen = createScreen('start');
  ScreenStack_push(firstSCreen.screen);
  writeToConsole('reloading ui');
}

reloadUIStuff();

const ext = gl.getExtension('WEBGL_lose_context');

function loop() {
  requestAnimationFrame(loop);
  gl.clear(gl.COLOR_BUFFER_BIT);

  setDebug(keys['KeyL']);

  if (gl.isContextLost() && ext) {
    setTimeout(function () {
      writeToConsole('trying to restore context');
      ext.restoreContext();
    }, 1000);
  }

  RenderSystem.setShaderColor(1, 1, 1, 1);
  RenderSystem.setProjectionMatrix(projMat);
  RenderSystem.setModelViewMatrix(modelViewMat);

  const context = new DrawContext(textRenderer);

  ScreenStack_render(context);
  RenderSystem.frameReset();

  ++frames;

  while (performance.now() - lastTime > 1000) {
    fpsEl.textContent = frames + ' FPS';
    lastTime += 1000;
    frames = 0;
  }
}
requestAnimationFrame(loop);

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
