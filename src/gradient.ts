import * as PIXI from 'pixi.js';
import { loadShader } from './utils';
import { Color } from './types';

export class Gradient extends PIXI.Container {
  public static shader = PIXI.Shader.from(undefined, undefined, {});
  private w: number;
  private h: number;
  private geo: PIXI.Geometry;
  private mesh: PIXI.Mesh<PIXI.Shader>;

  public static async preloadShader() {
    Gradient.shader = await loadShader('gradient');
  }

  public constructor(width: number, height: number, colors: [Color, Color, Color, Color]) {
    super();
    this.w = width;
    this.h = height;
    this.geo = new PIXI.Geometry();
    this.geo.addAttribute('aVertexPosition', [0, 0, width, 0, width, height, width, height, 0, height, 0, 0], 2);
    const c0 = colors[0].map((c, i, arr) => (i + 1 < arr.length ? c / 255 : c));
    const c1 = colors[1].map((c, i, arr) => (i + 1 < arr.length ? c / 255 : c));
    const c2 = colors[2].map((c, i, arr) => (i + 1 < arr.length ? c / 255 : c));
    const c3 = colors[3].map((c, i, arr) => (i + 1 < arr.length ? c / 255 : c));
    this.geo.addAttribute('aColor', [...c0, ...c2, ...c3, ...c3, ...c1, ...c0], 4);
    this.mesh = new PIXI.Mesh(this.geo, Gradient.shader);
    this.addChild(this.mesh);
  }

  public get size(): [number, number] {
    return [this.w, this.h];
  }

  public set size(size: [number, number]) {
    this.scale.set(size[0] / this.w, 1);
    this.scale.set(1, size[1] / this.height);
  }

  public set colors(colors: [Color, Color, Color, Color]) {
    const c0 = colors[0].map((c, i, arr) => (i + 1 < arr.length ? c / 255 : c));
    const c1 = colors[1].map((c, i, arr) => (i + 1 < arr.length ? c / 255 : c));
    const c2 = colors[2].map((c, i, arr) => (i + 1 < arr.length ? c / 255 : c));
    const c3 = colors[3].map((c, i, arr) => (i + 1 < arr.length ? c / 255 : c));
    const colorB = this.geo.getBuffer('aColor');
    colorB.update([...c0, ...c2, ...c3, ...c3, ...c1, ...c0]);
  }
}
