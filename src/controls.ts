import { AnchorPoint, ClipDirection, Color, FontSize, GradientDirection, Tiled } from './types';
import { clamp } from './utils';
import * as PIXI from 'pixi.js';
import { Gradient } from './gradient';

export class UIControl {
  protected _parent: UIControl | null = null;
  protected _container = new PIXI.Container();
  private _size: [number, number] = [-1, -1];
  private _offset: [number, number] = [0, 0];
  private _layer: number = 0;
  private _alpha: number = 0;
  private _anchor_from: AnchorPoint = 'center';
  private _anchor_to: AnchorPoint = 'center';
  private _visible: boolean = true;
  protected _children: UIControl[] = [];

  public init(offsetX: number, offsetY: number, screenWidth: number, screenHeight: number) {
    this.onVisibilityChanged(this.visible);
  }

  public onVisibilityChanged(visible: boolean) {
    this._container.visible = visible && !this.visible ? false : visible;

    for (let i = 0; i < this._children.length; i++) {
      this._children[i].onVisibilityChanged(visible);
    }
  }

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
    this._container.visible = visible;
  }

  public get visible() {
    return this._visible;
  }

  public set anchor_from(anchor_from: AnchorPoint) {
    this._anchor_from = anchor_from;
  }

  public get anchor_from() {
    return this._anchor_from;
  }

  public set anchor_to(anchor_to: AnchorPoint) {
    this._anchor_to = anchor_to;
  }

  public get anchor_to() {
    return this._anchor_to;
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

  protected getAnchoredOffset(width: number, height: number, screenWidth: number, screenHeight: number) {
    let x = 0;
    let y = 0;

    switch (this.anchor_from) {
      case 'top_left':
        switch (this.anchor_to) {
          case 'bottom_left':
            y -= height;
            break;
          case 'bottom_middle':
            x -= width / 4;
            y -= height;
            break;
          case 'bottom_right':
            x -= width;
            y -= height;
            break;
          case 'left_middle':
            y -= height / 2;
            break;
          case 'right_middle':
            x -= width;
            y -= height / 4;
            break;
          case 'center':
            x -= width / 2;
            y -= height / 2;
            break;
          case 'top_middle':
            x -= width / 4;
            y -= height / 2;
            break;
          case 'top_right':
            x -= width;
            y -= height / 2;
            break;
        }
        break;
      case 'bottom_left':
        if (this.parent) {
          y = this.parent.size[1];
          y -= height;
        } else {
          y = screenHeight;
          y -= height;
        }

        switch (this.anchor_to) {
          case 'top_left':
            y += height;
            break;
          case 'top_middle':
            x -= width / 2;
            y += height;
            break;
          case 'top_right':
            x -= width;
            y += height;
            break;
          case 'left_middle':
            y += height / 2;
            break;
          case 'center':
            x -= width / 2;
            y += height / 2;
            break;
          case 'right_middle':
            x -= width;
            y += height / 2;
            break;
          case 'bottom_middle':
            x -= width / 2;
            break;
          case 'bottom_right':
            x -= width;
            break;
        }
        break;
      case 'bottom_middle':
        if (this.parent) {
          x = this.parent.size[0] / 2;
          x -= width / 2;
          y = this.parent.size[1];
          y -= height;
        } else {
          x = screenWidth / 2;
          x -= width / 2;
          y = screenHeight;
          y -= height;
        }

        switch (this.anchor_to) {
          case 'top_left':
            x += width / 2;
            y += height;
            break;
          case 'top_middle':
            y += height;
            break;
          case 'top_right':
            x -= width / 2;
            y += height;
            break;
          case 'left_middle':
            x += width / 2;
            y += height / 2;
            break;
          case 'center':
            y += height / 2;
            break;
          case 'right_middle':
            x -= width / 2;
            y += height / 2;
            break;
          case 'bottom_left':
            x += width / 2;
            break;
          case 'bottom_right':
            x -= width / 2;
            break;
        }
        break;
      case 'bottom_right':
        if (this.parent) {
          x = this.parent.size[0];
          x -= width;
          y = this.parent.size[1];
          y -= height;
        } else {
          x = screenWidth;
          x -= width;
          y = screenHeight;
          y -= height;
        }

        switch (this.anchor_to) {
          case 'top_left':
            x += width;
            y += height;
            break;
          case 'top_middle':
            x += width / 2;
            y += height;
            break;
          case 'top_right':
            y += height;
            break;
          case 'left_middle':
            x += width;
            y += height / 2;
            break;
          case 'center':
            x += width / 2;
            y += height / 2;
            break;
          case 'right_middle':
            y += height / 2;
            break;
          case 'bottom_left':
            x += width;
            break;
          case 'bottom_middle':
            x += width / 2;
            break;
        }
        break;
      case 'top_middle':
        if (this.parent) {
          x = this.parent.size[0] / 2;
          x -= width / 2;
        } else {
          x = screenWidth / 2;
          x -= width / 2;
        }

        switch (this.anchor_to) {
          case 'top_left':
            x += width / 2;
            break;
          case 'top_right':
            x -= width / 2;
            break;
          case 'left_middle':
            x += width / 2;
            y -= height / 2;
            break;
          case 'right_middle':
            x -= width / 2;
            y -= height / 2;
            break;
          case 'center':
            y -= height / 2;
            break;
          case 'bottom_left':
            x += width / 2;
            y -= height;
            break;
          case 'bottom_middle':
            y -= height;
            break;
          case 'bottom_right':
            x -= width / 2;
            y -= height;
            break;
        }
        break;
      case 'top_right':
        if (this.parent) {
          x = this.parent.size[0];
          x -= width;
        } else {
          x = screenWidth;
          x -= width;
        }

        switch (this.anchor_to) {
          case 'top_left':
            x += width;
            break;
          case 'top_middle':
            x += width / 2;
            break;
          case 'left_middle':
            x += width;
            y -= height / 2;
            break;
          case 'right_middle':
            y -= height / 2;
            break;
          case 'center':
            x += width / 2;
            y -= height / 2;
            break;
          case 'bottom_left':
            x += width;
            y -= height;
            break;
          case 'bottom_right':
            y -= height;
            break;
          case 'bottom_middle':
            x += width / 2;
            y -= height;
            break;
        }
        break;
      case 'left_middle':
        if (this.parent) {
          y = this.parent.size[1] / 2;
          y -= height / 2;
        } else {
          y = screenHeight / 2;
          y -= height / 2;
        }

        switch (this.anchor_to) {
          case 'top_left':
            y += height / 2;
            break;
          case 'top_middle':
            x -= width / 2;
            y += height / 2;
            break;
          case 'top_right':
            x -= width;
            y += height / 2;
            break;
          case 'center':
            x -= width / 2;
            break;
          case 'right_middle':
            x -= width;
            break;
          case 'bottom_left':
            y -= height / 2;
            break;
          case 'bottom_right':
            x -= width;
            y -= height / 2;
            break;
          case 'bottom_middle':
            x -= width / 2;
            y -= height / 2;
            break;
        }
        break;
      case 'right_middle':
        if (this.parent) {
          x = this.parent.size[0];
          x -= width;
          y = this.parent.size[1] / 2;
          y -= height / 2;
        } else {
          x = screenWidth;
          x -= width;
          y = screenHeight / 2;
          y -= height / 2;
        }

        switch (this.anchor_to) {
          case 'top_left':
            x += width;
            y += height / 2;
            break;
          case 'top_middle':
            x += width / 2;
            y += height / 2;
            break;
          case 'top_right':
            y += height / 2;
            break;
          case 'left_middle':
            x += width;
            break;
          case 'center':
            x += width / 2;
            break;
          case 'bottom_left':
            x += width;
            y -= height / 2;
            break;
          case 'bottom_middle':
            x += width / 2;
            y -= height / 2;
            break;
          case 'bottom_right':
            y -= height / 2;
            break;
        }
        break;
      case 'center':
        if (this.parent) {
          x = this.parent.size[0] / 2;
          x -= width / 2;
          y = this.parent.size[1] / 2;
          y -= height / 2;
        } else {
          x = screenWidth / 2;
          x -= width / 2;
          y = screenHeight / 2;
          y -= height / 2;
        }

        switch (this.anchor_to) {
          case 'top_left':
            x += width / 2;
            y += height / 2;
            break;
          case 'top_middle':
            y += height / 2;
            break;
          case 'top_right':
            x -= width / 2;
            y += height / 2;
            break;
          case 'left_middle':
            x += width / 2;
            break;
          case 'right_middle':
            x -= width / 2;
            break;
          case 'bottom_left':
            x += width / 2;
            y -= height / 2;
            break;
          case 'bottom_middle':
            y -= height / 2;
            break;
          case 'bottom_right':
            x -= width / 2;
            y -= height / 2;
            break;
        }
        break;
    }

    return [x, y];
  }
}

export class UIPanelControl extends UIControl {
  public override init(offsetX: number, offsetY: number, screenWidth: number, screenHeight: number): void {
    super.init(offsetX, offsetY, screenWidth, screenHeight);

    let zIndex = this.layer;
    if (this.parent) {
      zIndex += this.parent.layer;
    }

    let [x, y] = this.getAnchoredOffset(this.size[0], this.size[1], screenWidth, screenHeight);

    x += this.offset[0] + offsetX;
    y += this.offset[1] + offsetY;

    this._container.position.set(x, y);
    this._container.zIndex = zIndex;

    for (let i = 0; i < this._children.length; i++) {
      this._children[i].init(x - offsetX, y - offsetY, screenWidth, screenHeight);
    }
  }
}

export class UILabelControl extends UIControl {
  private _text: string = '';
  private _color: [number, number, number, number] = [255, 255, 255, 1.0];
  private _shadow: boolean = false;
  private _font_size: FontSize = 'normal';
  private _font_scale_factor = 1.0;

  public override init(offsetX: number, offsetY: number, screenWidth: number, screenHeight: number): void {
    super.init(offsetX, offsetY, screenWidth, screenHeight);

    let zIndex = this.layer;
    if (this.parent) {
      zIndex += this.parent.layer;
    }

    let scaleFactor = 1.0;

    if (this.font_size !== 'normal') {
      if (this.font_size === 'small') {
        scaleFactor = 0.5;
      } else if (this.font_size === 'large') {
        scaleFactor = 2;
      } else if (this.font_size === 'extra_large') {
        scaleFactor = 4;
      }
    }

    if (this.font_scale_factor !== 1) {
      scaleFactor = this.font_scale_factor;
    }

    if (this.shadow) {
      const txt = new PIXI.Text(this.text, {
        fontFamily: 'Minecraft',
        fontSize: 8,
        wordWrap: true,
        wordWrapWidth: this.size[0],
        fill: ((this.color[0] * 0.25) << 16) | ((this.color[1] * 0.25) << 8) | (this.color[2] * 0.25)
      });
      txt.resolution = 2;
      txt.position.set(1, 1);
      this._container.addChild(txt);
    }

    const txt = new PIXI.Text(this.text, {
      fontFamily: 'Minecraft',
      fontSize: 8,
      wordWrap: true,
      wordWrapWidth: this.size[0],
      fill: (this.color[0] << 16) | (this.color[1] << 8) | this.color[2]
    });
    txt.resolution = 2;

    let [x, y] = this.getAnchoredOffset(this.size[0], this.size[1], screenWidth, screenHeight);

    x += this.offset[0] + offsetX;
    y += this.offset[1] + offsetY;

    this._container.addChild(txt);

    this._container.position.set(x, y);
    this._container.zIndex = zIndex;

    for (let i = 0; i < this._children.length; i++) {
      this._children[i].init(x - offsetX, y - offsetY, screenWidth, screenHeight);
    }
  }

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

  public set font_size(font_size: FontSize) {
    this._font_size = font_size;
  }

  public get font_size() {
    return this._font_size;
  }

  public set font_scale_factor(font_scale_factor: number) {
    this._font_scale_factor = clamp(font_scale_factor, 0, Infinity);
  }

  public get font_scale_factor() {
    return this._font_scale_factor;
  }
}

export class UIFillControl extends UIControl {
  private _color: [number, number, number, number] = [255, 255, 255, 1.0];

  public override init(offsetX: number, offsetY: number, screenWidth: number, screenHeight: number): void {
    super.init(offsetX, offsetY, screenWidth, screenHeight);
    const gf = new PIXI.Graphics();
    const color = (this._color[0] << 16) | (this._color[1] << 8) | (this._color[2] << 0);

    let [x, y] = this.getAnchoredOffset(this.size[0], this.size[1], screenWidth, screenHeight);

    x += this.offset[0] + offsetX;
    y += this.offset[1] + offsetY;

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

    for (let i = 0; i < this._children.length; i++) {
      this._children[i].init(x - offsetX, y - offsetY, screenWidth, screenHeight);
    }
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
  getRenderable(control: UICustomControl): PIXI.DisplayObject {
    const grad = new Gradient(
      control.size[0],
      control.size[1],
      control.gradient_direction === 'vertical' ? [control.color1, control.color2, control.color1, control.color2] : [control.color1, control.color1, control.color2, control.color2]
    );
    return grad;
  }
}

export class UICustomVignetteRenderer extends UICustomRenderer {
  getRenderable(control: UICustomControl): PIXI.DisplayObject {
    const vig = new PIXI.Container();

    // vig.width = control.size[0];
    // vig.height = control.size[1];

    // // const gf = new PIXI.Graphics();
    // // gf.beginFill(0xff0000, 0.0);
    // // gf.drawRect(0, 0, control.size[0], control.size[1]);
    // // gf.endFill();

    // // vig.addChild(gf);

    // const crt = new CRTFilter();
    // crt.vignetting = 0.25;
    // crt.vignettingAlpha = 0.5;
    // crt.vignettingBlur = 0.5;
    // crt.lineContrast = 0;
    // crt.lineWidth = 0;
    // crt.verticalLine = false;

    // vig.filters = [
    //   new VignetteFilter({
    //     size: 1,
    //     amount: 0.5,
    //     focalPointX: 0.5,
    //     focalPointY: 0.5
    //   })
    // ];

    return vig;
  }
}

export class UICustomControl extends UIControl {
  _renderer: null | UICustomRenderer = null;
  _gradient_direction: GradientDirection = 'vertical';
  _color: [number, number, number, number] = [255, 255, 255, 1.0];
  _color1: [number, number, number, number] = [255, 255, 255, 1.0];
  _color2: [number, number, number, number] = [255, 255, 255, 1.0];

  public override init(offsetX: number, offsetY: number, screenWidth: number, screenHeight: number): void {
    super.init(offsetX, offsetY, screenWidth, screenHeight);
    this._container.removeChildren();

    let zIndex = this.layer;
    if (this.parent) {
      zIndex += this.parent.layer;
    }

    if (this.renderer !== null) {
      const c = this.renderer.getRenderable(this);
      this._container.addChild(c);
    }

    let [x, y] = this.getAnchoredOffset(this.size[0], this.size[1], screenWidth, screenHeight);

    x += this.offset[0] + offsetX;
    y += this.offset[1] + offsetY;

    this._container.position.set(x, y);
    this._container.zIndex = zIndex;

    for (let i = 0; i < this._children.length; i++) {
      this._children[i].init(x - offsetX, y - offsetY, screenWidth, screenHeight);
    }
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

export class UISpriteControl extends UIControl {
  public static cacheTxr: Record<string, PIXI.Texture> = {};
  private _texture = '';
  private _nineslice_size: [number, number, number, number] | null = null;
  private _color: Color = [255, 255, 255, 1.0];
  private _uv: [number, number] = [0, 0];
  private _uv_size: [number, number] = [-1, -1];
  private _base_size: [number, number] = [-1, -1];
  private _grayscale = false;
  private _keep_ratio = false;
  private _tiled: Tiled = false;
  private _tiled_scale: [number, number] = [1, 1];
  private _clip_ratio = 1.0;
  private _clip_direction: ClipDirection = 'left';

  public override init(offsetX: number, offsetY: number, screenWidth: number, screenHeight: number): void {
    if (this.texture === '') return;

    if (this.texture.startsWith('data:image/') && UISpriteControl.cacheTxr[this.texture] === undefined) {
      const img = new Image();
      img.src = this.texture;
      const base = new PIXI.BaseTexture(img);
      const texture = new PIXI.Texture(base);
      img.onload = () => {
        UISpriteControl.cacheTxr[this.texture] = texture;
        this.initImage(offsetX, offsetY, screenWidth, screenHeight);
      };
    } else {
      this.initImage(offsetX, offsetY, screenWidth, screenHeight);
    }
  }

  public initImage(offsetX: number, offsetY: number, screenWidth: number, screenHeight: number) {
    let zIndex = this.layer;
    if (this.parent) {
      zIndex += this.parent.layer;
    }

    let txr = UISpriteControl.cacheTxr[this.texture];
    let w = this.size[0] === -1 ? txr.width : this.size[0];
    let h = this.size[1] === -1 ? txr.height : this.size[1];

    if (this.keep_ratio) {
      if (w >= h) {
        h = w * (txr.width / txr.height);
      }

      if (h > w) {
        w = h * (txr.height / txr.width);
      }
    }

    let txr_u = clamp(this.uv[0], 0, txr.width);
    let txr_v = clamp(this.uv[1], 0, txr.height);
    let txr_u_width = this.uv_size[0] === -1 ? txr.width : clamp(this.uv_size[0], 0, txr.width - txr_u);
    let txr_v_height = this.uv_size[1] === -1 ? txr.height : clamp(this.uv_size[1], 0, txr.height - txr_v);

    // console.log(txr_u, txr_v, txr_u_width, txr_v_height);
    let spriteoffX = 0;
    let spriteoffY = 0;

    if (this.clip_ratio !== 1) {
      if (this.clip_direction === 'left') {
        txr_u_width *= this.clip_ratio;
        w *= this.clip_ratio;
      } else if (this.clip_direction === 'up') {
        txr_v_height *= this.clip_ratio;
        h *= this.clip_ratio;
      } else if (this.clip_direction === 'down') {
        spriteoffY += h - h * this.clip_ratio;
        txr_v = txr_v + txr_v_height * this.clip_ratio;
        txr_v_height *= this.clip_ratio;
        h *= this.clip_ratio;
      } else if (this.clip_direction === 'right') {
        spriteoffX += w - w * this.clip_ratio;
        txr_u = txr_u + txr_u_width * this.clip_ratio;
        txr_u_width *= this.clip_ratio;
        w *= this.clip_ratio;
      }
    }

    txr = new PIXI.Texture(txr.baseTexture, new PIXI.Rectangle(txr_u, txr_v, txr_u_width, txr_v_height));
    txr.update();

    let sprite: PIXI.Sprite | PIXI.Container = new PIXI.Sprite(txr);
    sprite.width = w;
    sprite.height = h;
    sprite.x = spriteoffX;
    sprite.y = spriteoffY;

    if (this.nineslice_size !== null) {
      sprite = new PIXI.NineSlicePlane(txr, this.nineslice_size[0], this.nineslice_size[1], this.nineslice_size[2], this.nineslice_size[3]);
      if (sprite instanceof PIXI.NineSlicePlane) {
        sprite.width = w;
        sprite.height = h;
      }
    }
    if (this.tiled) {
      sprite = new PIXI.TilingSprite(txr, w, h);

      if (sprite instanceof PIXI.TilingSprite) {
        sprite.tilePosition.x = spriteoffX;
        sprite.tilePosition.y = spriteoffY;

        sprite.tileScale.set(this.tiled_scale[0], this.tiled_scale[1]);
      }
    }

    if (this.grayscale) {
      const grayS = new PIXI.filters.ColorMatrixFilter();
      grayS.desaturate();
      sprite.filters = [grayS];
    }

    if (sprite instanceof PIXI.Sprite) {
      sprite.tint = (this.color[0] << 16) | (this.color[1] << 8) | this.color[2];
    }

    let [x, y] = this.getAnchoredOffset(w, h, screenWidth, screenHeight);

    x += this.offset[0] + offsetX;
    y += this.offset[1] + offsetY;

    this._container.addChild(sprite);

    this._container.position.set(x, y);
    this._container.zIndex = zIndex;

    for (let i = 0; i < this._children.length; i++) {
      this._children[i].init(x - offsetX, y - offsetY, screenWidth, screenHeight);
    }
  }

  public set texture(texture: string) {
    this._texture = texture;
  }

  public get texture() {
    return this._texture;
  }

  public set nineslice_size(nineslice_size: null | [number, number, number, number]) {
    this._nineslice_size = nineslice_size;
  }

  public get nineslice_size() {
    return this._nineslice_size;
  }

  public set color(color: Color) {
    this._color = color;
  }

  public get color() {
    return this._color;
  }

  public set uv(uv: [number, number]) {
    this._uv = uv;
  }

  public get uv() {
    return this._uv;
  }

  public set uv_size(uv_size: [number, number]) {
    this._uv_size = uv_size;
  }

  public get uv_size() {
    return this._uv_size;
  }

  public set base_size(base_size: [number, number]) {
    this._base_size = base_size;
  }

  public get base_size() {
    return this._base_size;
  }

  public set grayscale(grayscale: boolean) {
    this._grayscale = grayscale;
  }

  public get grayscale() {
    return this._grayscale;
  }

  public set keep_ratio(keep_ratio: boolean) {
    this._keep_ratio = keep_ratio;
  }

  public get keep_ratio() {
    return this._keep_ratio;
  }

  public set tiled(tiled: Tiled) {
    this._tiled = tiled;
  }

  public get tiled() {
    return this._tiled;
  }

  public set tiled_scale(tiled_scale: [number, number]) {
    this._tiled_scale = tiled_scale;
  }

  public get tiled_scale() {
    return this._tiled_scale;
  }

  public set clip_ratio(clip_ratio: number) {
    this._clip_ratio = clamp(clip_ratio, 0, 1);
  }

  public get clip_ratio() {
    return this._clip_ratio;
  }

  public set clip_direction(clip_direction: ClipDirection) {
    this._clip_direction = clip_direction;
  }

  public get clip_direction() {
    return this._clip_direction;
  }
}
