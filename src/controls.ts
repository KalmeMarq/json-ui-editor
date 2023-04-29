import { DrawContext } from './DrawContext';
import { RenderSystem } from './gl';
import { DEBUG } from './vars';

const DEBUG_COLOR = [1, 0, 0, 1];

abstract class UIProperty<T> {
  name: string;
  protected _value: T;
  protected _initialValue: T;

  constructor(name: string, initialValue: T) {
    this.name = name;
    this._value = initialValue;
    this._initialValue = initialValue;
  }

  value(): T {
    return this._value;
  }

  protected abstract parse(value: any): T;

  setValue(value: any) {
    this._value = this.parse(value);
  }

  abstract isOfType(value: any): boolean;
}

class StringUIProperty extends UIProperty<string> {
  protected parse(value: any): string {
    return value + '';
  }

  isOfType(value: any): boolean {
    return typeof value == 'string';
  }
}

class StringEnumUIProperty extends UIProperty<string> {
  values: string[];
  constructor(name: string, initialValue: string, values: string[]) {
    super(name, initialValue);
    this.values = values;
  }

  protected parse(value: any): string {
    const vl = value + '';
    if (this.values.indexOf(vl) >= 0) {
      return vl;
    }
    return this._initialValue;
  }

  isOfType(value: any): boolean {
    return typeof value == 'string' && this.values.indexOf(value) >= 0;
  }
}

class BooleanUIProperty extends UIProperty<boolean> {
  protected parse(value: any): boolean {
    return typeof value == 'string' ? value.toLowerCase() == 'true' : Boolean(value);
  }

  isOfType(value: any): boolean {
    return typeof value == 'boolean';
  }
}

class NumberUIProperty extends UIProperty<number> {
  private validate: (vl: number) => number;

  public constructor(name: string, initialValue: number, validate: (vl: number) => number = (vl) => vl) {
    super(name, initialValue);
    this.validate = validate;
  }

  protected parse(value: any): number {
    try {
      return this.validate(parseFloat(value));
    } catch (e) {
      return this.validate(this._value);
    }
  }

  isOfType(value: any): boolean {
    return typeof value == 'number';
  }
}

export abstract class CustomRenderer {
  abstract render(context: DrawContext, control: UICustomControl, mouseX: number, mouseY: number): void;
}

export class DebugCustomRenderer extends CustomRenderer {
  override render(context: DrawContext, control: UICustomControl, mouseX: number, mouseY: number) {
    context.textRend.drawWithShadowfv('Debug', 0, 0, [1, 1, 1, 1]);
  }
}

export class NametagCustomRenderer extends CustomRenderer {
  override render(context: DrawContext, control: UICustomControl, mouseX: number, mouseY: number) {
    if (control.propertyBag['#playername'] != null) {
      const plnm = control.propertyBag['#playername'].currentValue;
      const size = plnm.length * 7;
      const xpad = control.propertyBag['#x_padding'] == null ? 3 : control.propertyBag['#x_padding'].currentValue;
      const ypad = control.propertyBag['#y_padding'] == null ? 2 : control.propertyBag['#y_padding'].currentValue;
      context.drawColoredfv(control.x - xpad, control.y - ypad, 0, size + xpad + xpad, 8 + ypad + ypad, control.bgColor);
      context.textRend.drawWithShadowfv(control.propertyBag['#playername'].currentValue, control.x + xpad, control.y + ypad, control.textColor);
    }
  }
}

function clamp(value: number, min: number, max: number) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

function getDurabilityColors(ratio: number): { progress_color: number[]; background_color: number[] } {
  return {
    progress_color: [(255 - 255 * ratio) / 255.0, (255 * ratio) / 255.0, 0, 1.0],
    background_color: [(64 - 64 * ratio) / 255.0, 64 / 255.0, 0, 1.0]
  };
}

export class ProgBarCustomRenderer extends CustomRenderer {
  override render(context: DrawContext, control: UICustomControl, mouseX: number, mouseY: number) {
    const currentAmount = control.getPropertyBagPropertyValueOrDefault('#progress_bar_current_amount', 1);
    const totalAmount = control.getPropertyBagPropertyValueOrDefault('#progress_bar_total_amount', 1);
    const isVisible = control.getPropertyBagPropertyValueOrDefault('#progress_bar_visible', true);
    const isDurability = control.getPropertyBagPropertyValueOrDefault('is_durability', false);

    if (!isVisible) return;

    const ratio = clamp(currentAmount / totalAmount, 0, 1);

    if (isDurability) {
      const durColors = getDurabilityColors(ratio);
      context.drawColoredfv(control.x, control.y, 0, control.w, control.h, durColors.background_color);
      context.drawColoredfv(control.x, control.y, 0, control.w * ratio, control.h, durColors.progress_color);
    } else {
      context.drawColoredfv(control.x, control.y, 0, control.w, control.h, control.secondaryColor);
      context.drawColoredfv(control.x, control.y, 0, control.w * ratio, control.h, control.primaryColor);
    }
  }
}

export class FillCustomRenderer extends CustomRenderer {
  override render(context: DrawContext, control: UICustomControl, mouseX: number, mouseY: number) {
    context.drawColoredfv(control.x, control.y, 0, control.w, control.h, control.color);
  }
}

export class GradientCustomRenderer extends CustomRenderer {
  override render(context: DrawContext, control: UICustomControl, mouseX: number, mouseY: number) {
    if (control.gradientDir == 'vertical') {
      context.drawVGradientfv(control.x, control.y, 0, control.w, control.h, control.color0, control.color1);
    } else {
      context.drawHGradientfv(control.x, control.y, 0, control.w, control.h, control.color0, control.color1);
    }
  }
}

export type UIEvent =
  | {
      type: 'mouse';
      x: number;
      y: number;
      pressed: boolean;
      double_pressed: boolean;
      emit: (buttonId: string) => void;
    }
  | {
      type: 'keyboard';
      key: string;
      x: number;
      y: number;
      emit: (buttonId: string) => void;
    }
  | {
      type: 'button_id';
      id: string;
      pressed: boolean;
      double_pressed: boolean;
      x: number;
      y: number;
      emit: (buttonId: string, control: UIControl) => void;
    };

export abstract class UIControl {
  parent?: UIControl;
  path = '';
  x = 0;
  y = 0;
  w = 0;
  h = 0;
  propertyBag: Record<string, BindingObserver> = {};
  children: UIControl[] = [];
  visible = new BooleanUIProperty('visible', true);
  anchorFrom = new StringEnumUIProperty('anchor_from', 'top_left', ['top_left', 'top_middle', 'top_right', 'left_middle', 'center', 'right_middle', 'bottom_left', 'bottom_middle', 'bottom_right']);
  anchorTo = new StringEnumUIProperty('anchor_from', 'top_left', ['top_left', 'top_middle', 'top_right', 'left_middle', 'center', 'right_middle', 'bottom_left', 'bottom_middle', 'bottom_right']);
  enabled = new BooleanUIProperty('enabled', true);
  debug?: number[];
  buttonMappings: {
    from_button_id: string;
    to_button_id: string;
    mappingType: 'pressed' | 'double_pressed' | 'global';
  }[] = [];

  isEnabled(): boolean {
    return this.parent != null ? this.parent.isEnabled() && this.enabled.value() : this.enabled.value();
  }

  abstract render(context: DrawContext, mouseX: number, mouseY: number): void;

  getPropertyBagPropertyValueOrDefault(name: string, defaultValue: any) {
    return this.propertyBag[name] == null ? defaultValue : this.propertyBag[name].currentValue;
  }

  layout() {}

  isMouseOver(mouseX: number, mouseY: number) {
    return mouseX >= this.x && mouseX < this.x + this.w && mouseY >= this.y && mouseY < this.y + this.h;
  }

  onEvent(event: UIEvent) {
    for (const mapping of this.buttonMappings) {
      if (event.type == 'button_id' && mapping.from_button_id == event.id) {
        if (this instanceof UIButtonControl) console.log(event, mapping);
        if (event.double_pressed && mapping.mappingType == 'double_pressed' && this.isMouseOver(event.x, event.y)) {
          event.emit(mapping.to_button_id, this);
          return;
        } else if (event.pressed && mapping.mappingType == 'pressed' && this.isMouseOver(event.x, event.y)) {
          event.emit(mapping.to_button_id, this);
          return;
        } else if (event.pressed && mapping.mappingType == 'global') {
          event.emit(mapping.to_button_id, this);
        }
      }
    }

    for (let i = 0; i < this.children.length; ++i) {
      this.children[i].onEvent(event);
    }
  }
}

export class UIButtonControl extends UIControl {
  defaultControl = new StringUIProperty('default_control', 'default');
  hoverControl = new StringUIProperty('hover_control', 'hover');
  lockedControl = new StringUIProperty('locked_control', 'locked');

  private dirty = true;

  private hovered = false;

  public render(context: DrawContext, mouseX: number, mouseY: number): void {
    if (!this.visible.value()) return;

    this.hovered = mouseX >= this.x && mouseX < this.x + this.w && mouseY >= this.y && mouseY < this.y + this.h;

    if (this.dirty) {
      this.dirty = false;

      for (let i = 0; i < this.children.length; ++i) {
        const control = this.children[i];
        control.x += this.x;
        control.y += this.y;
      }
    }

    for (let i = 0; i < this.children.length; ++i) {
      const control = this.children[i];

      if (control.path.endsWith('/' + this.defaultControl.value())) {
        control.visible.setValue(this.enabled.value() && !this.hovered);
      } else if (control.path.endsWith('/' + this.hoverControl.value())) {
        control.visible.setValue(this.enabled.value() && this.hovered);
      } else if (control.path.endsWith('/' + this.lockedControl.value())) {
        control.visible.setValue(!this.enabled.value());
      }

      control.render(context, mouseX, mouseY);
    }

    if (DEBUG) {
      context.drawBorder(this.x, this.y, 0, this.w, this.h, 1, 0, 0, 1);
    } else if (this.debug != null) {
      context.drawBorder(this.x, this.y, 0, this.w, this.h, this.debug[0], this.debug[1], this.debug[2], this.debug[3]);
    }
  }
}

export class UIScreenControl extends UIControl {
  renderOnlyWhenTopMost = true;
  forceRenderBelow = false;

  public render(context: DrawContext, mouseX: number, mouseY: number): void {
    if (!this.visible.value()) return;

    for (let i = 0; i < this.children.length; ++i) {
      this.children[i].render(context, mouseX, mouseY);
    }
  }
}

export class UIStackPanelControl extends UIControl {
  orientation = new StringEnumUIProperty('orientation', 'vertical', ['vertical', 'horizontal']);
  rowgap = new NumberUIProperty('row_gap', 0, (vl) => clamp(vl, 0, Infinity));
  colgap = new NumberUIProperty('column_gap', 0, (vl) => clamp(vl, 0, Infinity));
  private dirty = true;

  public render(context: DrawContext, mouseX: number, mouseY: number): void {
    if (!this.visible.value()) return;

    if (this.dirty) {
      this.dirty = false;

      if (this.orientation.value() == 'horizontal') {
        let xx = this.x;

        for (let i = 0; i < this.children.length; ++i) {
          this.children[i].x = xx;
          this.children[i].y = this.y;
          xx += this.children[i].w + this.colgap.value();
        }
      } else {
        let yy = this.y;

        for (let i = 0; i < this.children.length; ++i) {
          this.children[i].y = yy;
          this.children[i].x = this.x;
          yy += this.children[i].h + this.rowgap.value();
        }
      }
    }

    for (let i = 0; i < this.children.length; ++i) {
      this.children[i].render(context, mouseX, mouseY);
    }

    if (DEBUG) {
      context.drawBorder(this.x, this.y, 0, this.w, this.h, 1, 0, 0, 1);
    } else if (this.debug != null) {
      context.drawBorder(this.x, this.y, 0, this.w, this.h, this.debug[0], this.debug[1], this.debug[2], this.debug[3]);
    }
  }
}

export class UICustomControl extends UIControl {
  renderer?: CustomRenderer;
  gradientDir: 'vertical' | 'horizontal' = 'vertical';
  color0 = [1, 1, 1, 1];
  color1 = [1, 1, 1, 1];
  color = [1, 1, 1, 1];
  textColor = [1, 1, 1, 1];
  bgColor = [50 / 255.0, 50 / 255.0, 50 / 255.0, 0.6];
  dirty = true;
  primaryColor = [0, 255 / 255.0, 0, 1.0];
  secondaryColor = [76 / 255.0, 76 / 255.0, 76 / 255.0, 1];

  public render(context: DrawContext, mouseX: number, mouseY: number) {
    if (!this.visible.value()) return;

    if (this.dirty) {
      this.dirty = false;
    }

    if (this.renderer != null) {
      this.renderer.render(context, this, mouseX, mouseY);
    }

    for (let i = 0; i < this.children.length; ++i) {
      this.children[i].render(context, mouseX, mouseY);
    }

    if (DEBUG) {
      context.drawBorder(this.x, this.y, 0, this.w, this.h, 1, 0, 0, 1);
    } else if (this.debug != null) {
      context.drawBorder(this.x, this.y, 0, this.w, this.h, this.debug[0], this.debug[1], this.debug[2], this.debug[3]);
    }
  }
}

export class UILabelControl extends UIControl {
  text = '';
  color = [1, 1, 1, 1];
  lockedColor = [1, 1, 1, 1];
  shadow = false;

  public render(context: DrawContext, mouseX: number, mouseY: number): void {
    if (!this.visible.value()) return;

    if (this.text.length > 0) {
      context.textRend.drawWithShadowfv(this.text, this.x, this.y, this.isEnabled() ? this.color : this.lockedColor);
    }

    for (let i = 0; i < this.children.length; ++i) {
      this.children[i].render(context, mouseX, mouseY);
    }

    if (DEBUG) {
      context.drawBorder(this.x, this.y, 0, this.w, this.h, 1, 0, 0, 1);
    } else if (this.debug != null) {
      context.drawBorder(this.x, this.y, 0, this.w, this.h, this.debug[0], this.debug[1], this.debug[2], this.debug[3]);
    }
  }
}

export class UIImageControl extends UIControl {
  texture = 'null';
  u = 0;
  v = 0;
  us = -1;
  vs = -1;
  tw = -1;
  th = -1;
  color = [1, 1, 1, 1];
  tiled: 'x' | 'y' | 'both' | 'none' = 'none';
  tiledScale = [1, 1];
  clipRatio = 1;
  grayscale = false;

  public constructor() {
    super();
  }

  public render(context: DrawContext, mouseX: number, mouseY: number) {
    if (!this.visible.value()) return;

    if (this.texture != 'null') {
      const tex = RenderSystem.getTexture(this.texture);

      context.drawColoredTexture(
        this.texture,
        this.x,
        this.y,
        0,
        this.w,
        this.h,
        this.u,
        this.v,
        this.us == -1 ? tex.width : this.us,
        this.vs == -1 ? tex.height : this.vs,
        this.tw == -1 ? tex.width : this.tw,
        this.th == -1 ? tex.height : this.th,
        this.color,
        this.grayscale
      );
    }

    for (let i = 0; i < this.children.length; ++i) {
      this.children[i].render(context, mouseX, mouseY);
    }

    if (DEBUG) {
      context.drawBorder(this.x, this.y, 0, this.w, this.h, 1, 0, 0, 1);
    } else if (this.debug != null) {
      context.drawBorder(this.x, this.y, 0, this.w, this.h, this.debug[0], this.debug[1], this.debug[2], this.debug[3]);
    }
  }
}

export class BindingObserver {
  ups: ((v: any) => void)[] = [];
  currentValue: any;

  constructor(up?: (v: any) => void) {
    if (up != null) this.ups.push(up);
  }

  addUp(up: (v: any) => void) {
    this.ups.push(up);
  }

  update(value: any) {
    this.currentValue = value;
    for (let i = 0; i < this.ups.length; ++i) {
      this.ups[i](value);
    }
  }
}

export class Binding {
  obs: BindingObserver[] = [];
  value: any;

  setValue(v: any) {
    this.value = v;
    this.notifyAll();
    return this;
  }

  add(ob: BindingObserver) {
    this.obs.push(ob);
  }

  notifyAll() {
    this.obs.forEach((ob) => ob.update(this.value));
  }
}

const typeProp = new StringEnumUIProperty('type', '', ['image', 'label', 'custom', 'stack_panel', 'button', 'screen']);

export function createControl(
  name: string,
  parent: UIControl | null,
  parsedTrees: Record<string, Record<string, any>>,
  props: any,
  bindings: Record<string, Binding>,
  tree: Record<string, UIControl>
) {
  let control: UIControl;
  if (props['type'] == 'image') {
    control = new UIImageControl();
  } else if (props['type'] == 'label') {
    control = new UILabelControl();
  } else if (props['type'] == 'custom') {
    control = new UICustomControl();
  } else if (props['type'] == 'stack_panel') {
    control = new UIStackPanelControl();
  } else if (props['type'] == 'button') {
    control = new UIButtonControl();
  } else if (props['type'] == 'screen') {
    control = new UIScreenControl();
  } else {
    const path = (parent != null ? parent.path : '') + '/' + name;
    (window as any).writeToConsole(path + ": type doesn't allow value '" + props['type'] + "'. Possible value: " + [...typeProp.values].join(', '), 'error');
    return;
  }

  function validateAndSet(prop: UIProperty<any>, value: any) {
    if (prop.isOfType(value)) prop.setValue(value);
    else (window as any).writeToConsole(control.path + ': ' + prop.name + " doesn't allow the value '" + (typeof value === 'string' ? '"' + value + '"' : value) + "'", 'error');
  }

  control.path = (parent != null ? parent.path : '') + '/' + name;

  if (props['offset'] != null) {
    if (props['x'] == null) props['x'] = props['offset'][0];
    if (props['y'] == null) props['y'] = props['offset'][1];
  }

  if (props['x'] != null) {
    const vx = props['x'];

    if (typeof vx === 'string' && vx.startsWith('#')) {
      if (control.propertyBag[vx] == null) {
        control.propertyBag[vx] = new BindingObserver((v) => (control.x = v));
      }
    } else {
      control.x = parseFloat(vx);
    }
  }

  if (props['y'] != null) {
    const vx = props['y'];

    if (typeof vx === 'string' && vx.startsWith('#')) {
      if (control.propertyBag[vx] == null) control.propertyBag[vx] = new BindingObserver((v) => (control.y = v));
    } else {
      control.y = parseFloat(vx);
    }
  }

  if (props['size'] != null) {
    if (props['width'] == null) props['width'] = props['size'][0];
    if (props['height'] == null) props['height'] = props['size'][1];
  }

  if (props['enabled'] != null) {
    const vx = props['enabled'];
    if (typeof vx === 'string' && vx.startsWith('#')) {
      if (control.propertyBag[vx] == null) control.propertyBag[vx] = new BindingObserver((v) => control.enabled.setValue(v));
      else control.propertyBag[vx].addUp((v) => control.enabled.setValue(v));
    } else {
      validateAndSet(control.enabled, props['enabled']);
    }
  }

  if (props['visible'] != null) {
    const vx = props['enabled'];
    if (typeof vx === 'string' && vx.startsWith('#')) {
      if (control.propertyBag[vx] == null) control.propertyBag[vx] = new BindingObserver((v) => control.visible.setValue(v));
      else control.propertyBag[vx].addUp((v) => control.visible.setValue(v));
    } else {
      validateAndSet(control.enabled, props['visible']);
    }
  }

  if (props['width'] != null) {
    const vx = props['width'];
    if (typeof vx === 'string' && vx.startsWith('#')) {
      if (control.propertyBag[vx] == null) control.propertyBag[vx] = new BindingObserver((v) => (control.w = v));
      else control.propertyBag[vx].addUp((v) => (control.w = v));
    } else {
      control.w = props['width'];
    }
  }

  if (props['height'] != null) {
    const vx = props['height'];
    if (typeof vx === 'string' && vx.startsWith('#')) {
      if (control.propertyBag[vx] == null) control.propertyBag[vx] = new BindingObserver((v) => (control.h = v));
      else control.propertyBag[vx].addUp((v) => (control.h = v));
    } else {
      control.h = props['height'];
    }
  }

  if (props['debug'] != null) {
    if (props['debug'] == 'red') {
      control.debug = [1, 0, 0, 1];
    } else if (props['debug'] == 'white') {
      control.debug = [1, 1, 1, 1];
    } else if (props['debug'] == 'black') {
      control.debug = [0, 0, 0, 1];
    } else if (props['debug'] == 'yellow') {
      control.debug = [1, 1, 0, 1];
    } else if (props['debug'] == 'green') {
      control.debug = [0, 1, 0, 1];
    } else if (props['debug'] == 'blue') {
      control.debug = [0, 0, 1, 1];
    } else if (props['debug'] == 'magenta') {
      control.debug = [1, 0, 1, 1];
    }
  }

  if (control instanceof UIImageControl) {
    if (props['texture'] != null) {
      control.texture = props['texture'];
    }

    if (props['grayscale'] != null) {
      control.grayscale = props['grayscale'];
    }

    if (props['color'] != null) {
      const p = props['color'];
      if (Array.isArray(p) && p.length >= 3) {
        if (p.length == 3) control.color = [...p, 1];
        else if (p.length == 4) control.color = p;
      }
    }

    if (props['uv'] != null) {
      control.u = props['uv'][0];
      control.v = props['uv'][1];
    }

    if (props['uv_size'] != null) {
      if (props['u_size'] == null) props['u_size'] = props['uv_size'][0];
      if (props['v_size'] == null) props['v_size'] = props['uv_size'][1];
    }

    if (props['u_size'] != null) {
      control.us = props['u_size'];
    }

    if (props['v_size'] != null) {
      control.vs = props['v_size'];
    }

    if (props['base_size'] != null) {
      if (props['base_width'] == null) props['base_width'] = props['base_size'][0];
      if (props['base_height'] == null) props['base_height'] = props['base_size'][1];
    }

    if (props['base_width'] != null) {
      control.tw = props['base_width'];
    }

    if (props['base_height'] != null) {
      control.th = props['base_height'];
    }
  } else if (control instanceof UICustomControl) {
    if (props['renderer'] != null) {
      control.renderer =
        props['renderer'] == 'fill_renderer'
          ? new FillCustomRenderer()
          : props['renderer'] == 'name_tag_renderer'
          ? new NametagCustomRenderer()
          : props['renderer'] == 'progress_bar_renderer'
          ? new ProgBarCustomRenderer()
          : props['renderer'] == 'debug_renderer'
          ? new DebugCustomRenderer()
          : new GradientCustomRenderer();
    }

    if (props['color'] != null) {
      const p = props['color'];
      if (Array.isArray(p) && p.length >= 3) {
        if (p.length == 3) control.color = [...p, 1];
        else if (p.length == 4) control.color = p;
      }
    }

    if (props['color1'] != null) {
      const vx = props['color1'];
      if (typeof vx === 'string' && vx.startsWith('#')) {
        if (control.propertyBag[vx] == null) control.propertyBag[vx] = new BindingObserver((v) => ((control as UICustomControl).color0 = v));
      } else {
        control.color0 = props['color1'];
      }
    }

    if (props['color2'] != null) {
      const vx = props['color2'];
      if (typeof vx === 'string' && vx.startsWith('#')) {
        if (control.propertyBag[vx] == null) control.propertyBag[vx] = new BindingObserver((v) => ((control as UICustomControl).color1 = v));
      } else {
        control.color1 = props['color2'];
      }
    }

    if (props['gradient_direction'] != null) {
      control.gradientDir = props['gradient_direction'];
    }
  } else if (control instanceof UIStackPanelControl) {
    if (props['orientation'] != null) {
      validateAndSet(control.orientation, props['orientation']);
    }

    if (props['gap'] != null) {
      if (props['column_gap'] == null) props['column_gap'] = props['gap'][1];
      if (props['row_gap'] == null) props['row_gap'] = props['gap'][0];
    }

    if (props['row_gap'] != null) {
      validateAndSet(control.rowgap, props['row_gap']);
    }

    if (props['column_gap'] != null) {
      validateAndSet(control.colgap, props['column_gap']);
    }
  } else if (control instanceof UIScreenControl) {
    if (props['force_render_below'] != null) {
      control.forceRenderBelow = props['force_render_below'];
    }

    if (props['render_only_when_top_most'] != null) {
      control.renderOnlyWhenTopMost = props['render_only_when_top_most'];
    }
  } else if (control instanceof UILabelControl) {
    if (props['text'] != null) {
      const vx = props['text'];
      if (typeof vx === 'string' && vx.startsWith('#')) {
        if (control.propertyBag[vx] == null) control.propertyBag[vx] = new BindingObserver((v) => ((control as UILabelControl).text = v));
      } else {
        control.text = props['text'];
      }
    }

    if (props['color'] != null) {
      control.color = props['color'];
    }

    if (props['locked_color'] != null) {
      control.lockedColor = props['locked_color'];
    }

    if (props['shadow'] != null) {
      control.text = props['shadow'];
    }
  } else if (control instanceof UIButtonControl) {
    if (props[control.defaultControl.name]) {
      validateAndSet(control.defaultControl, props[control.defaultControl.name]);
    }
    if (props[control.lockedControl.name]) {
      validateAndSet(control.lockedControl, props[control.lockedControl.name]);
    }
    if (props[control.lockedControl.name]) {
      validateAndSet(control.lockedControl, props[control.lockedControl.name]);
    }
  }

  if (props['button_mappings'] != null) {
    for (const mapping of props['button_mappings']) {
      control.buttonMappings.push({ from_button_id: mapping['from_button_id'], to_button_id: mapping['to_button_id'], mappingType: mapping['mapping_type'] });
    }

    console.log(control.buttonMappings);
  }

  if (props['controls'] != null) {
    for (const child of props['controls']) {
      for (const [ky, vl] of Object.entries(child)) {
        const ctrl = createControl(ky, control, parsedTrees, vl, bindings, tree);
        if (ctrl) {
          ctrl.parent = control;
          tree[ctrl.path] = ctrl;
          control.children.push(ctrl);
        }
        break;
      }
    }
  }

  control.propertyBag['#visible'] = new BindingObserver((v) => control.visible.setValue(v));
  control.propertyBag['#visible'].currentValue = true;

  control.propertyBag['#enabled'] = new BindingObserver((v) => control.enabled.setValue(v));
  control.propertyBag['#enabled'].currentValue = true;

  if (props['property_bag'] != null) {
    Object.entries<any>(props['property_bag']).forEach(([k, v]) => {
      if (control.propertyBag[k] == null) control.propertyBag[k] = new BindingObserver();
      control.propertyBag[k].currentValue = v;
    });
  }

  if (props['bindings'] != null) {
    for (const bind of props['bindings']) {
      const bn = bind['binding_name'];
      let bnov = bind['binding_name_override'];
      if (bnov == null) bnov = bn;

      if (bindings[bn] == null) bindings[bn] = new Binding();

      if (control.propertyBag[bnov] == null) {
        control.propertyBag[bnov] = new BindingObserver();
      }

      bindings[bn].add(control.propertyBag[bnov]);
    }
  }

  return control;
}
