import * as PIXI from 'pixi.js';
import { loadShader } from './utils';
import { Color } from './types';

export class Vignette extends PIXI.Container {
  public static shader = PIXI.Shader.from(undefined, undefined, {});
  private w: number;
  private h: number;
  private geo: PIXI.Geometry;
  private mesh: PIXI.Mesh<PIXI.Shader>;

  public static async preloadShader() {
    Vignette.shader = await loadShader('vignette');
  }

  public constructor(width: number, height: number) {
    super();
    this.w = width;
    this.h = height;
    this.geo = new PIXI.Geometry();
    this.geo.addAttribute('aVertexPosition', [0, 0, width, 0, width, height, width, height, 0, height, 0, 0], 2);
    // const c0 = [0.0, 0.0, 0.0, 1.0];
    // this.geo.addAttribute('aColor', [...c0, ...c0, ...c0, ...c0, ...c0, ...c0], 4);
    this.mesh = new PIXI.Mesh(this.geo, Vignette.shader);
    this.addChild(this.mesh);
  }
}
