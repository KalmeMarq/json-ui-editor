import { UI_SCALE } from './constants';
import { UIControl, UICustomControl, UICustomFillRenderer, UICustomGradientRenderer, UICustomNametagRenderer, UICustomVignetteRenderer, UIFillControl, UILabelControl, UIPanelControl, UISpriteControl } from './controls';
import { UIFileVisualTreeElement } from './types';
import { clamp, evalArea, parseColor, resolveGradientDirection } from './utils';

const availableTypes = ['fill', 'custom', 'panel', 'image', 'label'];

export function createControl(parent: UIControl | null, c: UIFileVisualTreeElement): UIControl | undefined {
  if (c.properties['ignored']) return undefined;

  if (c.properties['type'] === undefined || !availableTypes.includes(c.properties['type'])) {
    // writeToConsole('[ERROR] UI: ' + c.full_name + '; type property required.');
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

  if (c.properties['text_color']) {
    control.text_color = parseColor(c.properties['text_color']);
  }

  if (c.properties['background_color']) {
    control.background_color = parseColor(c.properties['background_color']);
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
      case 'vignette_renderer':
        control.renderer = new UICustomVignetteRenderer();
        break;
      case 'name_tag_renderer':
        control.renderer = new UICustomNametagRenderer();
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

  if (typeof c.properties['property_bag'] === 'object') {
    control.property_bag = c.properties['property_bag'];
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

  const apprect = (document.getElementById('screen') as HTMLCanvasElement).getBoundingClientRect();
  if (c.properties['size']) {
    if (Array.isArray(c.properties['size']) && c.properties['size'].length === 2) {
      control.size = evalArea(c.properties['size'] as any, { parent_width: parent !== null ? parent.size[0] : apprect.width / UI_SCALE, parent_height: parent !== null ? parent.size[1] : apprect.height / UI_SCALE });
    }
  } else {
    control.size = evalArea(['100%', '100%'], { parent_width: parent !== null ? parent.size[0] : apprect.width / UI_SCALE, parent_height: parent !== null ? parent.size[1] : apprect.height / UI_SCALE });
  }

  if (c.properties['offset']) {
    if (Array.isArray(c.properties['offset']) && c.properties['offset'].length === 2) {
      control.offset = evalArea(c.properties['offset'] as any, { parent_width: parent !== null ? parent.size[0] : apprect.width / UI_SCALE, parent_height: parent !== null ? parent.size[1] : apprect.height / UI_SCALE });
    }
  } else {
    control.offset = evalArea([0, 0], { parent_width: parent !== null ? parent.size[0] : apprect.width / UI_SCALE, parent_height: parent !== null ? parent.size[1] : apprect.height / UI_SCALE });
  }

  if (typeof c.properties['anchor_from'] === 'string') {
    switch (c.properties['anchor_from']) {
      case 'top_left':
        control.anchor_from = 'top_left';
        break;
      case 'top_middle':
        control.anchor_from = 'top_middle';
        break;
      case 'top_right':
        control.anchor_from = 'top_right';
        break;
      case 'left_middle':
        control.anchor_from = 'left_middle';
        break;
      case 'center':
        control.anchor_from = 'center';
        break;
      case 'right_middle':
        control.anchor_from = 'right_middle';
        break;
      case 'bottom_left':
        control.anchor_from = 'bottom_left';
        break;
      case 'bottom_middle':
        control.anchor_from = 'bottom_middle';
        break;
      case 'bottom_right':
        control.anchor_from = 'bottom_right';
        break;
    }
  }

  if (typeof c.properties['anchor_to'] === 'string') {
    switch (c.properties['anchor_to']) {
      case 'top_left':
        control.anchor_to = 'top_left';
        break;
      case 'top_middle':
        control.anchor_to = 'top_middle';
        break;
      case 'top_right':
        control.anchor_to = 'top_right';
        break;
      case 'left_middle':
        control.anchor_to = 'left_middle';
        break;
      case 'center':
        control.anchor_to = 'center';
        break;
      case 'right_middle':
        control.anchor_to = 'right_middle';
        break;
      case 'bottom_left':
        control.anchor_to = 'bottom_left';
        break;
      case 'bottom_middle':
        control.anchor_to = 'bottom_middle';
        break;
      case 'bottom_right':
        control.anchor_to = 'bottom_right';
        break;
    }
  }
}
