import * as PIXI from 'pixi.js';
import { Color } from './types';

export class Vignette extends PIXI.Container {}

/* 
class VignetteFilter extends PIXI.Filter {
  private static frag = [
    'precision mediump float;',
    'varying vec2 vTextureCoord;',
    'uniform sampler2D uSampler;',
    'uniform float size;',
    'uniform float amount;',
    'uniform float focalPointX;',
    'uniform float focalPointY;',
    'void main() {',
    '	vec3 rgb = vec3(1.0f, 1.0f, 1.0f);',
    '	float dist = distance(vTextureCoord, vec2(focalPointX, focalPointY));',
    '	rgb *= smoothstep(0.8, size * 0.799, dist * (0.5 * amount + size));',
    '	gl_FragColor = vec4(vec3(rgb), 1.0);',
    '}'
  ].join('');

  constructor(options?: { size?: number; amount: number; focalPointX: number; focalPointY: number }) {
    super(undefined, VignetteFilter.frag, {
      size: { type: '1f', value: options?.size || 0.5 },
      amount: { type: '1f', value: options?.amount || 0.5 },
      focalPointX: { type: '1f', value: options?.focalPointX || 0.5 },
      focalPointY: { type: '1f', value: options?.focalPointY || 0.5 }
    });
  }

  public get focalPointX() {
    return this.uniforms['focalPointX'].value;
  }

  public set focalPointX(value: number) {
    this.uniforms['focalPointX'].value = value;
  }

  public get focalPointY() {
    return this.uniforms['focalPointY'].value;
  }

  public set focalPointY(value: number) {
    this.uniforms['focalPointY'].value = value;
  }

  public get size() {
    return this.uniforms['size'].value;
  }

  public set size(value: number) {
    this.uniforms['size'].value = value;
  }

  public get amount() {
    return this.uniforms['amount'].value;
  }

  public set amount(value: number) {
    this.uniforms['amount'].value = value;
  }
}

*/
