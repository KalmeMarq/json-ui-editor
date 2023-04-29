import * as monaco from 'monaco-editor';

export type FontSize = 'small' | 'normal' | 'large' | 'extra_large';
export type TextAlignment = 'left' | 'center' | 'right';
export type ClipDirection = 'left' | 'up' | 'down' | 'right';
export type Tiled = boolean | 'x' | 'y';
export type GradientDirection = 'vertical' | 'horizontal';
export type AnchorPoint = 'top_left' | 'top_middle' | 'top_right' | 'left_middle' | 'center' | 'right_middle' | 'bottom_left' | 'bottom_middle' | 'bottom_right';
export type Color = [number, number, number, number];

export interface ExplorerFileJson {
  type: 'json';
  name: string;
  contextMenu: boolean;
  model: monaco.editor.ITextModel;
}

export interface ExplorerFileText {
  type: 'text';
  name: string;
  contextMenu: boolean;
  model: monaco.editor.ITextModel;
}

export interface ExplorerFileImage {
  type: 'image';
  name: string;
  contextMenu: boolean;
  element: HTMLImageElement;
}

export type ExplorerFile = ExplorerFileJson | ExplorerFileText | ExplorerFileImage;
