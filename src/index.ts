/* 
  Very bad disorganized code. I'll clean it up later.
 */
import * as monaco from 'monaco-editor';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import stripJsonComments from 'strip-json-comments';

const base = await (await fetch('base.json')).text();
const editor = monaco.editor.create(document.getElementById('meh')!, {
  value: base,
  language: 'json',
  tabSize: 2,
  folding: true,
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
      fileMatch: ['*'],
      schema: JSON.parse(stripJsonComments(await (await fetch('ui.schema.json')).text()))
    }
  ]
});

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
ctx.canvas.width = 800;
ctx.canvas.height = 600;
ctx.fillStyle = 'red';
ctx.fillRect(0, 0, 800, 600);
ctx.scale(3, 3);
ctx.imageSmoothingEnabled = false;

class UIControl {
  _visible = true;
  _offset: [number, number] = [0, 0];
  _size: [number, number] = [-1, -1];
  _alpha = 1;
  _children: UIControl[] = [];

  render(renderCtx: CanvasRenderingContext2D, screenWidth: number, screenHeight: number) {}

  setAlpha(alpha: number) {
    this._alpha = alpha;
  }

  setSize(size: [number, number]) {
    this._size = size;
  }

  setOffset(offset: [number, number]) {
    this._offset = offset;
  }

  setVisible(visible: boolean) {
    this._visible = visible;
  }

  getVisible() {
    return this._visible;
  }

  addChildren(child: UIControl) {
    this._children.push(child);
  }
}

let els: UIControl[] = [];

class UIFillControl extends UIControl {
  _color: [number, number, number, number] = [255, 255, 255, 1.0];

  override render(renderCtx: CanvasRenderingContext2D, screenWidth: number, screenHeight: number) {
    if (!this._visible) return;
    renderCtx.fillStyle = `rgba(${this._color[0]}, ${this._color[1]}, ${this._color[2]}, ${this._color[3]})`;

    let w = screenWidth;
    let h = screenHeight;

    if (this._size[0] !== -1) {
      w = this._size[0];
    }

    if (this._size[1] !== -1) {
      h = this._size[1];
    }

    renderCtx.globalAlpha = this._alpha;

    renderCtx.fillRect(this._offset[0], this._offset[1], w, h);

    renderCtx.globalAlpha = 1.0;

    for (let i = 0; i < this._children.length; ++i) {
      this._children[i].render(renderCtx, screenWidth, screenHeight);
    }
  }

  setColor(color: [number, number, number, number]) {
    this._color = color;
  }

  getColor() {
    return this._color;
  }
}

export enum ClipDirection {
  Left,
  Right,
  Up,
  Down
  // Center
}

const cacheTxrs: Record<
  string,
  {
    img: HTMLImageElement;
    imgGray: HTMLImageElement;
    data: ImageData;
    dataGray: ImageData;
    width: number;
    height: number;
  }
> = {};

class UISpriteControl extends UIControl {
  _texture = '';
  _nineslice_size: [number, number, number, number] | null = null;
  _color: [number, number, number, number] = [255, 255, 255, 1.0];
  _uv: [number, number] = [0, 0];
  _uv_size: [number, number] = [-1, -1];
  _grayscale = false;
  _keep_ratio = false;
  _tiled = false;
  _tiled_scale = [1, 1];
  _clip_ratio = 1.0;
  _clip_direction: ClipDirection = ClipDirection.Left;

  setTexture(texture: string) {
    this._texture = texture;

    if (cacheTxrs[texture] === undefined) {
      if (texture.startsWith('data:')) {
        const image = new Image();
        image.src = texture;

        image.onload = () => {
          const c = document.createElement('canvas');
          c.width = image.width;
          c.height = image.height;
          const ct = c.getContext('2d') as CanvasRenderingContext2D;
          ct.drawImage(image, 0, 0);

          const width = image.width;
          const height = image.height;
          const img = image;
          const data = ct.getImageData(0, 0, image.width, image.height);

          const dataGray = ct.getImageData(0, 0, image.width, image.height);

          for (let i = 0; i < dataGray.data.length; i += 4) {
            let lightness = ~~((dataGray.data[i] + dataGray.data[i + 1] + dataGray.data[i + 2]) / 3);

            dataGray.data[i] = lightness;
            dataGray.data[i + 1] = lightness;
            dataGray.data[i + 2] = lightness;
          }

          ct.putImageData(dataGray, 0, 0);

          const im = new Image();

          im.src = c.toDataURL();
          im.onload = () => {
            cacheTxrs[texture] = {
              width,
              height,
              img,
              imgGray: im,
              data,
              dataGray: dataGray
            };
          };

          c.remove();
        };
      } else if (texture.startsWith('http')) {
        fetch(texture)
          .then((res) => res.blob())
          .then((data) => {
            const image = new Image();
            image.src = URL.createObjectURL(data);

            image.onload = () => {
              const c = document.createElement('canvas');
              c.width = image.width;
              c.height = image.height;
              const ct = c.getContext('2d') as CanvasRenderingContext2D;
              ct.drawImage(image, 0, 0);

              const width = image.width;
              const height = image.height;
              const img = image;
              const data = ct.getImageData(0, 0, image.width, image.height);

              const dataGray = ct.getImageData(0, 0, image.width, image.height);

              for (let i = 0; i < dataGray.data.length; i += 4) {
                let lightness = ~~((dataGray.data[i] + dataGray.data[i + 1] + dataGray.data[i + 2]) / 3);

                dataGray.data[i] = lightness;
                dataGray.data[i + 1] = lightness;
                dataGray.data[i + 2] = lightness;
              }

              ct.putImageData(dataGray, 0, 0);

              const im = new Image();

              im.src = c.toDataURL();
              im.onload = () => {
                cacheTxrs[texture] = {
                  width,
                  height,
                  img,
                  imgGray: im,
                  data,
                  dataGray: dataGray
                };
              };

              c.remove();
            };
          })
          .catch((e) => {});
      }
    }
  }

  setUV(uv: [number, number]) {
    this._uv = uv;
  }

  setUVSize(uv_size: [number, number]) {
    this._uv_size = uv_size;
  }

  setColor(color: [number, number, number, number]) {
    this._color = color;
  }

  setGrayscale(grayscale: boolean) {
    this._grayscale = grayscale;
  }

  setTiled(tiled: boolean) {
    this._tiled = tiled;
  }

  setClipDirection(clip_direction: ClipDirection) {
    this._clip_direction = clip_direction;
  }

  setClipRatio(clip_ratio: number) {
    this._clip_ratio = Math.max(Math.min(1.0, clip_ratio), 0);
  }

  setTiledScale(tiled_scale: [number, number]) {
    this._tiled_scale = tiled_scale;
  }

  setNinesliceSize(nineslice_size: [number, number, number, number] | null) {
    this._nineslice_size = nineslice_size;
  }

  setKeepRatio(keep_ratio: boolean) {
    this._keep_ratio = keep_ratio;
  }

  override render(renderCtx: CanvasRenderingContext2D, screenWidth: number, screenHeight: number): void {
    if (!this._visible) return;

    const ct = cacheTxrs[this._texture];

    if (ct !== undefined) {
      if (this._tiled) {
        const w = this._size[0] !== -1 ? this._size[0] : screenWidth;
        const h = this._size[1] !== -1 ? this._size[1] : screenHeight;

        const tw = ct.width * this._tiled_scale[0];
        const th = ct.height * this._tiled_scale[1];

        const nX = Math.ceil(w / tw);
        const nY = Math.ceil(h / th);

        for (let px = 0; px < nX; ++px) {
          for (let py = 0; py < nY; ++py) {
            const u = this._uv_size[0] === -1 ? ct.width : this._uv_size[0];
            const v = this._uv_size[1] === -1 ? ct.height : this._uv_size[1];

            renderCtx.drawImage(
              this._grayscale ? ct.imgGray : ct.img,
              this._uv[0],
              this._uv[1],
              px + 1 < nX ? u : u * (w / tw - nX),
              py + 1 < nY ? v : v * (h / th - nY),
              this._offset[0] + px * tw,
              this._offset[1] + py * th,
              px + 1 < nX ? tw : tw * (w / tw - nX),
              py + 1 < nY ? th : th * (h / th - nY)
            );
          }
        }
      } else if (this._nineslice_size !== null) {
        const x1 = this._nineslice_size[0];
        const y1 = this._nineslice_size[1];
        const x2 = this._nineslice_size[2];
        const y2 = this._nineslice_size[3];

        let w = this._size[0] === -1 ? screenWidth : this._size[0];
        let h = this._size[1] === -1 ? screenHeight : this._size[1];

        const x = this._offset[0];
        const y = this._offset[1];

        // Top Left
        renderCtx.drawImage(this._grayscale ? ct.imgGray : ct.img, 0, 0, x1, y1, x, y, x1, y1);
        // Top Right
        renderCtx.drawImage(this._grayscale ? ct.imgGray : ct.img, ct.width - x2, 0, x2, y1, x + w - x2, y, x1, y1);
        // Top Middle
        renderCtx.drawImage(this._grayscale ? ct.imgGray : ct.img, x1, 0, ct.width - x1 - x2, y1, x + x1, y, w - x1 - x2, y1);

        // Left Middle
        renderCtx.drawImage(this._grayscale ? ct.imgGray : ct.img, 0, y1, x1, ct.height - y1 - y2, x, y + y1, x1, h - y1 - y2);
        // Right Middle
        renderCtx.drawImage(this._grayscale ? ct.imgGray : ct.img, ct.width - x2, y1, x2, ct.height - y1 - y2, x + w - x2, y + y1, x2, h - y1 - y2);

        // Bottom Left
        renderCtx.drawImage(this._grayscale ? ct.imgGray : ct.img, 0, ct.height - y2, x1, y2, x, y + h - y2, x1, y2);
        // Bottom Right
        renderCtx.drawImage(this._grayscale ? ct.imgGray : ct.img, ct.width - x2, ct.height - y2, x2, y2, x + w - x2, y + h - y2, x1, y2);
        // Bottom Middle
        renderCtx.drawImage(this._grayscale ? ct.imgGray : ct.img, x1, ct.height - y2, ct.width - x1 - x2, y1, x + x1, y + h - y2, w - x1 - x2, y1);

        // Center
        renderCtx.drawImage(this._grayscale ? ct.imgGray : ct.img, x1, y1, ct.width - x1 - x2, ct.height - y1 - y2, x + x1, y + y1, w - x1 - x2, h - y1 - y2);
      } else {
        let w = this._size[0] === -1 ? ct.width : this._size[0];
        let h = this._size[1] === -1 ? ct.height : this._size[1];

        if (this._keep_ratio) {
          if (w >= h) {
            h = w * (ct.width / ct.height);
          }

          if (h > w) {
            w = h * (ct.height / ct.width);
          }
        }

        const u = this._uv[0];
        const v = this._uv[1];
        const uw = this._uv_size[0] === -1 ? ct.width : this._uv_size[0];
        const vh = this._uv_size[1] === -1 ? ct.height : this._uv_size[1];
        const x = this._offset[0];
        const y = this._offset[1];

        const cr = this._clip_ratio;

        if (cr !== 1) {
          switch (this._clip_direction) {
            case ClipDirection.Left:
              renderCtx.drawImage(this._grayscale ? ct.imgGray : ct.img, u, v, uw * cr, vh, x, y, w * cr, h);
              break;
            case ClipDirection.Right:
              renderCtx.drawImage(this._grayscale ? ct.imgGray : ct.img, u + (uw - uw * cr), v, uw * cr, vh, x + (uw - uw * cr), y, w * cr, h);
              break;
          }
        } else {
          renderCtx.drawImage(this._grayscale ? ct.imgGray : ct.img, u, v, uw, vh, x, y, w, h);
        }
      }
    }

    for (let i = 0; i < this._children.length; ++i) {
      this._children[i].render(renderCtx, screenWidth, screenHeight);
    }
  }
}

function parseUI(data: any) {
  els = [];

  if (data.namespace === undefined) {
    term.writeln('[ERROR] UI: namespace is missing.');
    return;
  }

  const namespace = data.namespace;
  delete data.namespace;

  function createControl(name: any, props: any): UIControl | undefined {
    if (props.ignored) return undefined;

    if (props.type === 'image') {
      const control = new UISpriteControl();

      if (typeof props.tiled === 'boolean') {
        control.setTiled(props.tiled);
      }

      if (typeof props.clip_direction === 'string') {
        switch (props.clip_direction) {
          case 'up':
            control.setClipDirection(ClipDirection.Up);
            break;
          case 'down':
            control.setClipDirection(ClipDirection.Down);
            break;
          case 'left':
            control.setClipDirection(ClipDirection.Left);
            break;
          case 'right':
            control.setClipDirection(ClipDirection.Right);
            break;
        }
      }

      if (typeof props.clip_ratio === 'number') {
        control.setClipRatio(props.clip_ratio);
      }

      if (Array.isArray(props.tiled_scale) && props.tiled_scale.length === 2) {
        control.setTiledScale(props.tiled_scale);
      }

      if (typeof props.nineslice_size === 'number') {
        const n = ~~props.nineslice_size;
        control.setNinesliceSize([n, n, n, n]);
      } else if (Array.isArray(props.nineslice_size) && props.nineslice_size.length === 4) {
        control.setNinesliceSize(props.nineslice_size);
      }

      if (props.color) {
        if (Array.isArray(props.color)) {
          if (props.color.length === 3) {
            control.setColor([...props.color.map((c: number) => c * 255), 1.0] as any);
          } else if (props.color.length === 4) {
            control.setColor(props.color.map((c: number, i: number, arr: any[]) => (i + 1 < arr.length ? c * 255 : c)));
          } else if (props.color.length > 4 || props.color.length < 3) {
            term.writeln('[ERROR] UI: ' + name + '; color property is a 3 or 4 length array');
            return undefined;
          }
        } else if (typeof props.color === 'string' && props.color.startsWith('#')) {
          const c = props.color.trim().substring(1);
          const co = parseInt(c, 16);

          const alpha = (co >> 24) & 0xff;
          const red = (co >> 16) & 0xff;
          const green = (co >> 8) & 0xff;
          const blue = (co >> 0) & 0xff;

          control.setColor([red, green, blue, c.length === 8 ? Math.min(Math.max(alpha / 255, 0), 1.0) : 1.0]);
        }
      }

      if (props.alpha && typeof props.alpha === 'number') {
        control.setAlpha(props.alpha);
      }

      if (props.size) {
        if (Array.isArray(props.size) && props.size.length === 2) {
          control.setSize(props.size);
        }
      }

      if (props.offset) {
        if (Array.isArray(props.offset) && props.offset.length === 2) {
          control.setOffset(props.offset);
        }
      }

      if (Array.isArray(props.uv) && props.uv.length === 2) {
        control.setUV(props.uv);
      }

      if (Array.isArray(props.uv_size) && props.uv_size.length === 2) {
        control.setUVSize(props.uv_size);
      }

      if (typeof props.texture === 'string') {
        control.setTexture(props.texture);
      }

      if (typeof props.visible === 'boolean') {
        control.setVisible(props.visible);
      }

      if (typeof props.grayscale === 'boolean') {
        control.setGrayscale(props.grayscale);
      }

      if (typeof props.keep_ratio === 'boolean') {
        control.setKeepRatio(props.keep_ratio);
      }

      if (Array.isArray(props.controls)) {
        for (let i = 0; i < props.controls.length; i++) {
          const e = Object.entries(props.controls[i])[0];
          const c = createControl(e[0], e[1]);
          if (c) control.addChildren(c);
        }
      }

      return control;
    }

    if (props.type === 'fill') {
      const control = new UIFillControl();

      if (props.color) {
        if (Array.isArray(props.color)) {
          if (props.color.length === 3) {
            control.setColor([...props.color.map((c: number) => c * 255), 1.0] as any);
          } else if (props.color.length === 4) {
            control.setColor(props.color.map((c: number, i: number, arr: any[]) => (i + 1 < arr.length ? c * 255 : c)));
          } else if (props.color.length > 4 || props.color.length < 3) {
            term.writeln('[ERROR] UI: ' + name + '; color property is a 3 or 4 length array');
            return undefined;
          }
        } else if (typeof props.color === 'string' && props.color.startsWith('#')) {
          const c = props.color.trim().substring(1);
          const co = parseInt(c, 16);

          const alpha = (co >> 24) & 0xff;
          const red = (co >> 16) & 0xff;
          const green = (co >> 8) & 0xff;
          const blue = (co >> 0) & 0xff;

          control.setColor([red, green, blue, c.length === 8 ? Math.min(Math.max(alpha / 255, 0), 1.0) : 1.0]);
        }
      }

      if (props.alpha && typeof props.alpha === 'number') {
        control.setAlpha(props.alpha);
      }

      if (props.size) {
        if (Array.isArray(props.size) && props.size.length === 2) {
          control.setSize(props.size);
        }
      }

      if (props.offset) {
        if (Array.isArray(props.offset) && props.offset.length === 2) {
          control.setOffset(props.offset);
        }
      }

      if (typeof props.visible === 'boolean') {
        control.setVisible(props.visible);
      }

      if (Array.isArray(props.controls)) {
        for (let i = 0; i < props.controls.length; i++) {
          const e = Object.entries(props.controls[i])[0];
          const c = createControl(e[0], e[1]);
          if (c) control.addChildren(c);
        }
      }

      return control;
    }

    if (props.type === undefined) {
      term.writeln('[ERROR] UI: ' + name + '; type is required.');
    }
  }

  Object.entries<any>(data).forEach(([name, props]) => {
    const c = createControl(name, props);

    if (c) {
      els.push(c);
    }
  });
}

window.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.code === 'KeyW') {
    e.preventDefault();
  }
  if (e.ctrlKey && e.code === 'KeyS') {
    e.preventDefault();

    try {
      const data = JSON.parse(stripJsonComments(editor.getValue()));
      parseUI(data);
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
  fontFamily: 'Fira Code, monospace'
});
const fitAddon = new FitAddon();
term.loadAddon(fitAddon);
term.open(document.getElementById('terminal') as HTMLDivElement);
fitAddon.fit();

function loop() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  for (let i = 0; i < els.length; ++i) {
    els[i].render(ctx, ~~(ctx.canvas.width / 3), ~~(ctx.canvas.height / 3));
  }

  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

parseUI(JSON.parse(stripJsonComments(base)));
