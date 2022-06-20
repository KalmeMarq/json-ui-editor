import { GradientDirection } from './types';
import { clamp } from './utils';

export class UIControl {
  private _size: [number, number] = [-1, -1];
  private _offset: [number, number] = [0, 0];
  private _layer: number = 0;
  private _alpha: number = 0;
  private _visible: boolean = true;
  private _children: UIControl[] = [];

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

  public set color(color: [number, number, number, number]) {
    this._color = color;
  }

  public get color() {
    return this._color;
  }
}

export class UICustomControl extends UIControl {
  _renderer: null = null;
  _gradient_direction: GradientDirection = 'vertical';
  _color: [number, number, number, number] = [255, 255, 255, 1.0];
  _color1: [number, number, number, number] = [255, 255, 255, 1.0];
  _color2: [number, number, number, number] = [255, 255, 255, 1.0];

  public set renderer(renderer: null) {
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
