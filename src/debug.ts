import { Color } from './types';
import { colorFromArray, colorFromHex, colorFromRGB, colorFromHSL, evalArea, parseColor } from './utils';

declare global {
  interface Window {
    colorFromArray: (color: Color) => Color;
    colorFromHex: (color: string) => Color;
    colorFromRGB: (color: string) => Color;
    colorFromHSL: (color: string) => Color;
    evalArea: (area: any, context: any) => any;
    parseColor: any;
  }
}
window.colorFromArray = colorFromArray;
window.colorFromHex = colorFromHex;
window.colorFromRGB = colorFromRGB;
window.colorFromHSL = colorFromHSL;
window.evalArea = evalArea;
window.parseColor = parseColor;

export {};
