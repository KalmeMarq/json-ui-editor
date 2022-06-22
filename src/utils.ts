import * as PIXI from 'pixi.js';
import stripJsonComments from 'strip-json-comments';
import { Color } from './types';

export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}

export class RectangleArea {
  private _x1: number = 0;
  private _y1: number = 0;
  private _x2: number = 0;
  private _y2: number = 0;

  public set x1(x1: number) {
    this._x1 = x1;
  }

  public get x1() {
    return this._x1;
  }

  public set y1(y1: number) {
    this._y1 = y1;
  }

  public get y1() {
    return this._y1;
  }

  public set x2(x2: number) {
    this._x2 = x2;
  }

  public get x2() {
    return this._x2;
  }

  public set y2(y2: number) {
    this._y2 = y2;
  }

  public get y2() {
    return this._y2;
  }
}

export function parseColor(color: string | [number, number, number, number] | [number, number, number]): Color {
  if (Array.isArray(color)) {
    return colorFromArray(color.length === 3 ? [...color, 1.0] : color);
  } else {
    color = color.trim();
    if (color.startsWith('rgb') || color.startsWith('rgba')) {
      return colorFromRGB(color);
    } else if (color.startsWith('hsl') || color.startsWith('hsla')) {
      return colorFromHSL(color);
    } else if (color.startsWith('#')) {
      return colorFromHex(color);
    } else {
      switch (color) {
        case 'yellow':
          return [255, 255, 0, 1.0];
        case 'blue':
          return [0, 0, 255, 1.0];
        case 'green':
          return [0, 255, 0, 1.0];
        case 'red':
          return [255, 0, 0, 1.0];
        case 'black':
          return [0, 0, 0, 1.0];
        case 'white':
        default:
          return [255, 255, 255, 1.0];
      }
    }
  }
}

export function colorFromArray(color: Color): Color {
  return color.map((c, i) => (i + 1 < color.length ? clamp(~~(c * 255), 0, 255) : c)) as Color;
}

export function colorFromHex(color: string): Color {
  color = color.substring(1);

  let a = 1.0;
  let r = 255;
  let g = 255;
  let b = 255;

  if (color.length === 3) {
    color =
      'FF' +
      color
        .split('')
        .map((c) => c + c)
        .join('');
  } else if (color.length === 6) {
    color = 'FF' + color;
  } else if (color.length !== 8) {
    return [r, g, b, a];
  }

  a = clamp(parseInt(color.substring(0, 2), 16) / 255, 0, 255);
  r = clamp(parseInt(color.substring(2, 4), 16), 0, 255);
  g = clamp(parseInt(color.substring(4, 6), 16), 0, 255);
  b = clamp(parseInt(color.substring(6, 8), 16), 0, 255);

  return [r, g, b, a];
}

export function colorFromRGB(color: string): Color {
  color = color.trim();
  color = color.replace(/ /g, '');

  let a = 1.0;
  let r = 255;
  let g = 255;
  let b = 255;

  if (color.startsWith('rgba')) {
    color = color.substring(5, color.length - 1);
    const c = color.split(',').map((l) => Number(l));

    r = clamp(c[0], 0, 255);
    g = clamp(c[1], 0, 255);
    b = clamp(c[2], 0, 255);
    a = clamp(c[3], 0, 1);
  } else if (color.startsWith('rgb')) {
    color = color.substring(4, color.length - 1);
    const c = color.split(',').map((l) => Number(l));

    r = clamp(c[0], 0, 255);
    g = clamp(c[1], 0, 255);
    b = clamp(c[2], 0, 255);
  }

  return [r, g, b, a];
}

export function colorFromHSL(color: string): Color {
  color = color.trim();
  color = color.replace(/ /g, '');

  let a = 1.0;
  let r = 255;
  let g = 255;
  let b = 255;

  if (color.startsWith('hsla')) {
    color = color.substring(5, color.length - 1);
    const c = color.split(',').map((l, i) => Number(l.replace('%', '')));

    const h = c[0];
    const s = c[1] / 100;
    const l = c[2] / 100;

    let a = s * Math.min(l, 1 - l);
    let f = (n = 0, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

    r = f(0);
    g = f(8);
    b = f(4);
    a = clamp(c[3], 0, 1);
  } else if (color.startsWith('hsl')) {
    color = color.substring(4, color.length - 1);
    const c = color.split(',').map((l) => Number(l.replace('%', '')));

    const h = c[0];
    const s = c[1] / 100;
    const l = c[2] / 100;

    let a = s * Math.min(l, 1 - l);
    let f = (n = 0, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

    r = f(0);
    g = f(8);
    b = f(4);
  }

  return [r, g, b, a];
}

/* { vertex: string; fragment: string; uniforms?: { name: string; type: string; value: unknown }[] } */
export async function loadShader(name: string): Promise<PIXI.Shader> {
  const def = await (await fetch('./shaders/' + name + '.json')).json();

  const vert = await (await fetch('./shaders/' + def.vertex + '.vert')).text();
  const frag = await (await fetch('./shaders/' + def.fragment + '.frag')).text();

  const uniforms: Record<string, unknown> = {};
  if (def.uniforms !== uniforms && Array.isArray(def.uniforms)) {
    def.uniforms.forEach((uni: { name: string; type: string; value: unknown }) => {
      uniforms[uni.name] = { type: uni.type, value: uni.value };
    });
  }

  const shader = PIXI.Shader.from(vert, frag, uniforms);

  return shader;
}

export function tokenizeAreaValue(value: string) {
  const tokens: { value: number; type: '%' | 'px' | '+' | '-' }[] = [];

  let cursor = 0;
  let char = '';

  while (cursor < value.length) {
    char = value[cursor];

    if (char === ' ' || char === '\t' || char === '\r' || char === '\n') {
      cursor += 1;
    } else if ('0123456789'.includes(char)) {
      let n = '';
      let dotCount = 0;

      do {
        if (char === '.') {
          ++dotCount;
          if (dotCount > 1) {
            break;
          }
        }

        n += char;
        char = value[++cursor];
      } while (('0123456789_'.includes(char) || char === '.') && cursor < value.length);

      let nm = Number(n.replace(/_/g, ''));
      if (isNaN(nm)) {
        nm = 0;
      }

      if (char + value[cursor + 1] === 'px') {
        tokens.push({ value: nm, type: 'px' });
        cursor += 2;
      } else if (char === '%') {
        tokens.push({ value: nm, type: '%' });
        cursor += 1;
      }
    } else if (char === '+') {
      tokens.push({ value: 0, type: '+' });
      cursor += 1;
    } else if (char === '-') {
      tokens.push({ value: 0, type: '-' });
      cursor += 1;
    } else {
      throw Error('bruh');
    }
  }

  return tokens;
}

export function evalArea(value: [string | number, string | number], context: { parent_width: number; parent_height: number }): [number, number] {
  const w = typeof value[0] === 'string' ? tokenizeAreaValue(value[0]) : [{ value: value[0], type: 'px' }];
  const h = typeof value[1] === 'string' ? tokenizeAreaValue(value[1]) : [{ value: value[1], type: 'px' }];

  const evalV = (
    tokens: {
      value: number;
      type: string;
    }[],
    isWidth: boolean
  ) => {
    let v = 0;

    let cursor = 0;
    while (cursor < tokens.length) {
      const token = tokens[cursor];

      if (token.type === 'px') {
        v += token.value;
        cursor++;
      } else if (token.type === '%') {
        v += (token.value / 100) * (isWidth ? context.parent_width : context.parent_height);
        cursor++;
      } else if (token.type === '+') {
        const next = tokens[cursor + 1];

        cursor++;

        if (next !== undefined) {
          if (next.type === 'px') {
            v += next.value;
          } else if (next.type === '%') {
            v += (next.value / 100) * (isWidth ? context.parent_width : context.parent_height);
          }

          cursor++;
        }
      } else if (token.type === '-') {
        const next = tokens[cursor + 1];

        cursor++;

        if (next !== undefined) {
          if (next.type === 'px') {
            v -= next.value;
          } else if (next.type === '%') {
            v -= (next.value / 100) * (isWidth ? context.parent_width : context.parent_height);
          }

          cursor++;
        }
      } else {
        throw Error('damn');
      }
    }

    return v;
  };

  return [evalV(w, true), evalV(h, false)];
}

export function parseJsonC(text: string) {
  return JSON.parse(stripJsonComments(text));
}

export function resolveGradientDirection(value: string) {
  if (value === 'horizontal') {
    return value;
  } else if (value === 'vertical') {
    return value;
  } else {
    return 'vertical';
  }
}
