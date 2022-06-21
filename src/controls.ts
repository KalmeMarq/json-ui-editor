import { Color, GradientDirection } from './types';
import { clamp } from './utils';
import * as PIXI from 'pixi.js';

export class UIControl {
  protected _parent: UIControl | null = null;
  protected _container = new PIXI.Container();
  private _size: [number, number] = [-1, -1];
  private _offset: [number, number] = [0, 0];
  private _layer: number = 0;
  private _alpha: number = 0;
  private _visible: boolean = true;
  private _children: UIControl[] = [];

  public init() {}

  public getRenderableContainer() {
    return this._container;
  }

  public set parent(parent: UIControl | null) {
    this._parent = parent;
  }

  public get parent() {
    return this._parent;
  }

  public set size(size: [number, number]) {
    this._size = size;
  }

  public get size() {
    return this._size;
  }

  public set offset(offset: [number, number]) {
    this._offset = offset;
  }

  public get offset() {
    return this._offset;
  }

  public set layer(layer: number) {
    this._layer = layer;
  }

  public get layer() {
    return this._layer;
  }

  public set alpha(alpha: number) {
    this._alpha = clamp(alpha, 0, 1);
  }

  public get alpha() {
    return this._alpha;
  }

  public set visible(visible: boolean) {
    this._visible = visible;
  }

  public get visible() {
    return this._visible;
  }

  public addChild(control: UIControl) {
    this._children.push(control);
  }

  public getChildren() {
    const c: UIControl[] = [this];

    for (let i = 0; i < this._children.length; i++) {
      c.push(...this._children[i].getChildren());
    }

    return c;
  }
}

export class UIPanelControl extends UIControl {
  public override init(): void {
    let x = this.offset[0];
    let y = this.offset[1];

    if (this.parent) {
      x += this.parent.offset[0];
      y += this.parent.offset[1];
    }

    let zIndex = this.layer;
    if (this.parent) {
      zIndex += this.parent.layer;
    }

    this._container.position.set(x, y);
    this._container.zIndex = zIndex;
  }
}

export class UILabelControl extends UIControl {
  private _text: string = '';
  private _color: [number, number, number, number] = [255, 255, 255, 1.0];
  private _shadow: boolean = false;

  public set text(text: string) {
    this._text = text;
  }

  public get text() {
    return this._text;
  }

  public set color(color: [number, number, number, number]) {
    this._color = color;
  }

  public get color() {
    return this._color;
  }

  public set shadow(shadow: boolean) {
    this._shadow = shadow;
  }

  public get shadow() {
    return this._shadow;
  }
}

export class UIFillControl extends UIControl {
  private _color: [number, number, number, number] = [255, 255, 255, 1.0];

  public override init(): void {
    const gf = new PIXI.Graphics();
    const color = (this._color[0] << 16) | (this._color[1] << 8) | (this._color[2] << 0);

    let x = this.offset[0];
    let y = this.offset[1];

    if (this.parent) {
      x += this.parent.offset[0];
      y += this.parent.offset[1];
    }

    let zIndex = this.layer;
    if (this.parent) {
      zIndex += this.parent.layer;
    }

    gf.beginFill(color, this._color[3]);
    gf.drawRect(0, 0, this.size[0], this.size[1]);
    gf.endFill();

    this._container.addChild(gf);
    this._container.position.set(x, y);
    this._container.zIndex = zIndex;
  }

  public set color(color: [number, number, number, number]) {
    this._color = color;
  }

  public get color() {
    return this._color;
  }
}

export abstract class UICustomRenderer {
  abstract getRenderable(control: UICustomControl): PIXI.DisplayObject;
}

export class UICustomFillRenderer extends UICustomRenderer {
  override getRenderable(control: UICustomControl): PIXI.Graphics {
    const gf = new PIXI.Graphics();
    const color = (control.color[0] << 16) | (control.color[1] << 8) | (control.color[2] << 0);

    gf.beginFill(color, control.color[3]);
    gf.drawRect(0, 0, control.size[0], control.size[1]);
    gf.endFill();

    return gf;
  }
}

export class UICustomGradientRenderer extends UICustomRenderer {
  private gradient(width: number, height: number, from: Color, to: Color, direction: GradientDirection) {
    const c = document.createElement('canvas');
    c.width = width;
    c.height = height;
    const ct = c.getContext('2d') as CanvasRenderingContext2D;
    const grd = direction === 'horizontal' ? ct.createLinearGradient(0, 0, width, 0) : ct.createLinearGradient(0, 0, 0, height);
    grd.addColorStop(0, `rgba(${from[0]},${from[1]},${from[2]},${from[3]})`);
    grd.addColorStop(1, `rgba(${to[0]},${to[1]},${to[2]},${to[3]})`);
    ct.fillStyle = grd;
    ct.fillRect(0, 0, width, height);
    return PIXI.Texture.from(c);
  }

  getRenderable(control: UICustomControl): PIXI.DisplayObject {
    const gf = new PIXI.Graphics();
    gf.width = control.size[0];
    gf.height = control.size[1];
    gf.beginTextureFill({
      texture: this.gradient(control.size[0], control.size[1], control.color1, control.color2, control.gradient_direction)
    });
    gf.drawRect(0, 0, control.size[0], control.size[1]);
    gf.endFill();
    return gf;
  }
}

export class UICustomControl extends UIControl {
  _renderer: null | UICustomRenderer = null;
  _gradient_direction: GradientDirection = 'vertical';
  _color: [number, number, number, number] = [255, 255, 255, 1.0];
  _color1: [number, number, number, number] = [255, 255, 255, 1.0];
  _color2: [number, number, number, number] = [255, 255, 255, 1.0];

  public override init(): void {
    let x = this.offset[0];
    let y = this.offset[1];

    if (this.parent) {
      x += this.parent.offset[0];
      y += this.parent.offset[1];
    }

    let zIndex = this.layer;
    if (this.parent) {
      zIndex += this.parent.layer;
    }

    if (this.renderer !== null) {
      const c = this.renderer.getRenderable(this);
      this._container.addChild(c);
    }
    this._container.position.set(x, y);
    this._container.zIndex = zIndex;
  }

  public set renderer(renderer: UICustomRenderer | null) {
    this._renderer = renderer;
  }

  public get renderer() {
    return this._renderer;
  }

  public set color(color: [number, number, number, number]) {
    this._color = color;
  }

  public get color() {
    return this._color;
  }

  public set color1(color1: [number, number, number, number]) {
    this._color1 = color1;
  }

  public get color1() {
    return this._color1;
  }

  public set color2(color2: [number, number, number, number]) {
    this._color2 = color2;
  }

  public get color2() {
    return this._color2;
  }

  public set gradient_direction(gradient_direction: GradientDirection) {
    this._gradient_direction = gradient_direction;
  }

  public get gradient_direction() {
    return this._gradient_direction;
  }
}
