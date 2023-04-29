import { DrawContext } from './DrawContext';
import { RenderSystem } from './gl';
import { DEBUG } from './vars';

const DEBUG_COLOR = [1, 0, 0, 1];

export abstract class CustomRenderer {
  abstract render(context: DrawContext, control: CustomControl, mouseX: number, mouseY: number): void;
}

export class DebugCustomRenderer extends CustomRenderer {
  override render(context: DrawContext, control: CustomControl, mouseX: number, mouseY: number) {
    context.textRend.drawWithShadowfv('Debug', 0, 0, [1, 1, 1, 1]);
  }
}

export class NametagCustomRenderer extends CustomRenderer {
  override render(context: DrawContext, control: CustomControl, mouseX: number, mouseY: number) {
    if (control.propertyBag['#playername'] != null) {
      context.textRend.drawWithShadowfv(control.propertyBag['#playername'].currentValue, control.x, control.y, control.textColor);
    }
  }
}

export class ProgBarCustomRenderer extends CustomRenderer {
  override render(context: DrawContext, control: CustomControl, mouseX: number, mouseY: number) {}
}

export class FillCustomRenderer extends CustomRenderer {
  override render(context: DrawContext, control: CustomControl, mouseX: number, mouseY: number) {
    context.drawColoredfv(control.x, control.y, 0, control.w, control.h, control.color);
  }
}

export class GradientCustomRenderer extends CustomRenderer {
  override render(context: DrawContext, control: CustomControl, mouseX: number, mouseY: number) {
    if (control.gradientDir == 'vertical') {
      context.drawVGradientfv(control.x, control.y, 0, control.w, control.h, control.color0, control.color1);
    } else {
      context.drawHGradientfv(control.x, control.y, 0, control.w, control.h, control.color0, control.color1);
    }
  }
}

export abstract class Control {
  parent?: Control;
  path = '';
  x = 0;
  y = 0;
  w = 0;
  h = 0;
  propertyBag: Record<string, BindingObserver> = {};
  children: Control[] = [];
  visible = true;
  debug?: number[];

  abstract render(context: DrawContext, mouseX: number, mouseY: number): void;

  getPropertyBagProperty(name: string) {
    return this.propertyBag[name];
  }
}

export class ButtonControl extends Control {
  defaultControl = 'default';
  hoverControl = 'hover';
  lockedControl = 'locked';

  private dirty = true;

  private hovered = false;
  private enabled = true;

  public render(context: DrawContext, mouseX: number, mouseY: number): void {
    if (!this.visible) return;

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

      if (control.path.endsWith('/' + this.defaultControl)) {
        control.visible = this.enabled && !this.hovered;
      } else if (control.path.endsWith('/' + this.hoverControl)) {
        control.visible = this.enabled && this.hovered;
      } else if (control.path.endsWith('/' + this.lockedControl)) {
        control.visible = !this.enabled;
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

export class ScreenControl extends Control {
  renderOnlyWhenTopMost = true;
  forceRenderBelow = false;

  public render(context: DrawContext, mouseX: number, mouseY: number): void {
    if (!this.visible) return;

    for (let i = 0; i < this.children.length; ++i) {
      this.children[i].render(context, mouseX, mouseY);
    }
  }
}

export class StackPanelControl extends Control {
  orientation: 'vertical' | 'horizontal' = 'vertical';
  rowgap = 0;
  colgap = 0;
  private dirty = true;

  public render(context: DrawContext, mouseX: number, mouseY: number): void {
    if (!this.visible) return;

    if (this.dirty) {
      this.dirty = false;

      if (this.orientation == 'horizontal') {
        let xx = this.x;

        for (let i = 0; i < this.children.length; ++i) {
          this.children[i].x = xx;
          this.children[i].y = this.y;
          xx += this.children[i].w + this.colgap;
        }
      } else {
        let yy = this.y;

        for (let i = 0; i < this.children.length; ++i) {
          this.children[i].y = yy;
          this.children[i].x = this.x;
          yy += this.children[i].h + this.rowgap;
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

export class CustomControl extends Control {
  renderer?: CustomRenderer;
  gradientDir: 'vertical' | 'horizontal' = 'vertical';
  color0 = [1, 1, 1, 1];
  color1 = [1, 1, 1, 1];
  color = [1, 1, 1, 1];
  textColor = [1, 1, 1, 1];
  bgColor = [1, 1, 1, 1];

  public render(context: DrawContext, mouseX: number, mouseY: number) {
    if (!this.visible) return;

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

export class LabelControl extends Control {
  text = '';
  color = [1, 1, 1, 1];
  shadow = false;

  public render(context: DrawContext, mouseX: number, mouseY: number): void {
    if (!this.visible) return;

    if (this.text.length > 0) {
      context.textRend.drawWithShadowfv(this.text, this.x, this.y, this.color);
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

export class ImageControl extends Control {
  texture = 'null';
  u = 0;
  v = 0;
  us = -1;
  vs = -1;
  tw = -1;
  th = -1;
  tiled: 'x' | 'y' | 'both' | 'none' = 'none';
  tiledScale = [1, 1];
  clipRatio = 1;
  grayscale = false;

  public constructor() {
    super();
  }

  public render(context: DrawContext, mouseX: number, mouseY: number) {
    if (!this.visible) return;

    if (this.texture != 'null') {
      const tex = RenderSystem.getTexture(this.texture);

      context.drawTexture(
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

export function createControl(name: string, parent: Control | null, parsedTrees: Record<string, Record<string, any>>, props: any, bindings: Record<string, Binding>, tree: Record<string, Control>) {
  let control: Control;
  if (props['type'] == 'image') {
    control = new ImageControl();
  } else if (props['type'] == 'label') {
    control = new LabelControl();
  } else if (props['type'] == 'custom') {
    control = new CustomControl();
  } else if (props['type'] == 'stack_panel') {
    control = new StackPanelControl();
  } else if (props['type'] == 'button') {
    control = new ButtonControl();
  } else if (props['type'] == 'screen') {
    control = new ScreenControl();
  } else {
    return;
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

  if (control instanceof ImageControl) {
    if (props['texture'] != null) {
      control.texture = props['texture'];
    }

    if (props['grayscale'] != null) {
      control.grayscale = props['grayscale'];
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
  } else if (control instanceof CustomControl) {
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
      control.color = props['color'];
    }

    if (props['color1'] != null) {
      const vx = props['color1'];
      if (typeof vx === 'string' && vx.startsWith('#')) {
        if (control.propertyBag[vx] == null) control.propertyBag[vx] = new BindingObserver((v) => ((control as CustomControl).color0 = v));
      } else {
        control.color0 = props['color1'];
      }
    }

    if (props['color2'] != null) {
      const vx = props['color2'];
      if (typeof vx === 'string' && vx.startsWith('#')) {
        if (control.propertyBag[vx] == null) control.propertyBag[vx] = new BindingObserver((v) => ((control as CustomControl).color1 = v));
      } else {
        control.color1 = props['color2'];
      }
    }

    if (props['gradient_direction'] != null) {
      control.gradientDir = props['gradient_direction'];
    }
  } else if (control instanceof StackPanelControl) {
    if (props['orientation'] != null) {
      control.orientation = props['orientation'];
    }

    if (props['gap'] != null) {
      if (props['column_gap'] == null) props['column_gap'] = props['gap'][1];
      if (props['row_gap'] == null) props['row_gap'] = props['gap'][0];
    }

    if (props['row_gap'] != null) {
      control.rowgap = props['row_gap'];
    }

    if (props['column_gap'] != null) {
      control.colgap = props['column_gap'];
    }
  } else if (control instanceof ScreenControl) {
    if (props['force_render_below'] != null) {
      control.forceRenderBelow = props['force_render_below'];
    }

    if (props['render_only_when_top_most'] != null) {
      control.renderOnlyWhenTopMost = props['render_only_when_top_most'];
    }
  } else if (control instanceof LabelControl) {
    if (props['text'] != null) {
      const vx = props['text'];
      if (typeof vx === 'string' && vx.startsWith('#')) {
        if (control.propertyBag[vx] == null) control.propertyBag[vx] = new BindingObserver((v) => ((control as LabelControl).text = v));
      } else {
        control.text = props['text'];
      }
    }

    if (props['color'] != null) {
      control.color = props['color'];
    }

    if (props['shadow'] != null) {
      control.text = props['shadow'];
    }
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

  control.propertyBag['#visible'] = new BindingObserver((v) => (control.visible = v));
  control.propertyBag['#visible'].currentValue = true;

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
