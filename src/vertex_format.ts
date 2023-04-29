import { GL, RenderSystem } from './gl';

export const COMPONENT_TYPE: Record<'UBYTE' | 'FLOAT', ComponentType> = {
  UBYTE: {
    glType: GL.UNSIGNED_BYTE,
    byteLength: 1
  },
  FLOAT: {
    glType: GL.FLOAT,
    byteLength: 4
  }
};

type SetupStateTask = (index: number, size: number, type: number, stride: number, offset: number) => void;
type ClearStateTask = (index: number) => void;

type ComponentType = { glType: number; byteLength: number };

const _M4BUFF = new Float32Array(16);

export class VertexBuffer {
  static lastBound: WebGLBuffer | null = null;
  static lastIBOBound: WebGLBuffer | null = null;

  format?: VertexFormat;
  mode?: DrawMode;
  vbo: WebGLBuffer;
  ibo: WebGLBuffer;
  vertexCount = 0;
  lastSize = -1;
  indicesCount = 0;

  constructor() {
    this.vbo = GL.glCreateBuffer()!;
    this.ibo = GL.glCreateBuffer()!;
  }

  upload(buffer: Float32Array, size: number, vertexCount: number, mode: DrawMode, format: VertexFormat) {
    if (VertexBuffer.lastBound != this.vbo) {
      VertexBuffer.lastBound = this.vbo;
      GL.glBindBuffer(GL.ARRAY_BUFFER, this.vbo);
    }

    if (this.lastSize < size) {
      this.lastSize = size;
      GL.glBufferData(GL.ARRAY_BUFFER, buffer, GL.DYNAMIC_DRAW);
    } else {
      GL.glBufferSubData(GL.ARRAY_BUFFER, 0, buffer);
    }

    if (VertexBuffer.lastIBOBound != this.ibo) {
      VertexBuffer.lastIBOBound = this.ibo;
      GL.glBindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.ibo);
    }

    const idxCount = ~~((vertexCount / 4) * 6);

    if (this.indicesCount < idxCount) {
      this.indicesCount = idxCount;
      if (mode == DrawMode.QUADS) {
        console.log('idxc', idxCount);
        const b = new Uint16Array(this.indicesCount);
        for (let i = 0; i < b.length; i += 6) {
          b[i] = 0;
          b[i + 1] = 1;
          b[i + 2] = 2;
          b[i + 3] = 2;
          b[i + 4] = 3;
          b[i + 5] = 0;
        }
        GL.glBufferData(GL.ELEMENT_ARRAY_BUFFER, b, GL.STATIC_DRAW);
      }
    }

    this.lastSize = size;

    this.vertexCount = vertexCount;
    this.mode = mode;
    this.format = format;
  }

  public draw() {
    if (this.vertexCount == 0) return;

    this.format!.setupState();

    const shader = RenderSystem.getShader();
    RenderSystem.useProgram(shader.id!);

    if (shader.colorUniform != null) {
      GL.glUniform4fv(shader.colorUniform, RenderSystem.getShaderColor());
    }

    if (shader.projectionUniform != null) {
      GL.glUniformMatrix4fv(shader.projectionUniform, false, RenderSystem.getProjectionMatrix().get(_M4BUFF));
    }

    if (shader.modelViewUniform != null) {
      GL.glUniformMatrix4fv(shader.modelViewUniform, false, RenderSystem.getModelViewMatrix().get(_M4BUFF));
    }

    if (shader.hasTexture) {
      const tex = RenderSystem.getShaderTexture();
      GL.glBindTexture(GL.TEXTURE_2D, tex.id);
      GL.glUniform1i(shader.samplers[0], 0);
    }

    GL.glDrawElements(this.mode!.glType, this.indicesCount, GL.UNSIGNED_SHORT, 0);

    this.format!.clearState();
  }
}

export class VertexFormat {
  attributes: VertexFormatAttribute[];
  offsets: number[];
  stride: number;
  vertexBuffer?: VertexBuffer;

  constructor(attributes: VertexFormatAttribute[]) {
    this.attributes = attributes;
    this.offsets = [];
    let s = 0;
    for (const attr of attributes) {
      this.offsets.push(s);
      s += attr.byteLength;
    }
    this.stride = s;
  }

  getVertexBuffer(): VertexBuffer {
    if (this.vertexBuffer == null) {
      this.vertexBuffer = new VertexBuffer();
    }
    return this.vertexBuffer;
  }

  public setupState() {
    for (let i = 0; i < this.attributes.length; ++i) {
      this.attributes[i].setupState(i, this.stride, this.offsets[i]);
    }
  }

  public clearState() {
    for (let i = 0; i < this.attributes.length; ++i) {
      this.attributes[i].clearState(i);
    }
  }
}

export class VertexFormatAttribute {
  size: number;
  byteLength: number;
  type: ComponentType;
  setupTask: SetupStateTask;
  clearTask: ClearStateTask;

  constructor(size: number, type: ComponentType, setupTask: SetupStateTask, clearTask: ClearStateTask) {
    this.byteLength = size * type.byteLength;
    this.size = size;
    this.type = type;
    this.setupTask = setupTask;
    this.clearTask = clearTask;
  }

  setupState(index: number, stride: number, offset: number) {
    this.setupTask(index, this.size, this.type.glType, stride, offset);
  }

  clearState(index: number) {
    this.clearTask(index);
  }
}

export const POSITION_ATTRIBUTE = new VertexFormatAttribute(
  3,
  COMPONENT_TYPE.FLOAT,
  (idx, sz, type, srtd, off) => {
    GL.glEnableVertexAttribArray(idx);
    GL.glVertexAttribPointer(idx, sz, type, false, srtd, off);
  },
  (idx) => {
    GL.glDisableVertexAttribArray(idx);
  }
);
export const NORMAL_ATTRIBUTE = new VertexFormatAttribute(
  3,
  COMPONENT_TYPE.FLOAT,
  (idx, sz, type, srtd, off) => {
    GL.glEnableVertexAttribArray(idx);
    GL.glVertexAttribPointer(idx, sz, type, false, srtd, off);
  },
  (idx) => {
    GL.glDisableVertexAttribArray(idx);
  }
);
export const TEXTURE_ATTRIBUTE = new VertexFormatAttribute(
  2,
  COMPONENT_TYPE.FLOAT,
  (idx, sz, type, srtd, off) => {
    GL.glEnableVertexAttribArray(idx);
    GL.glVertexAttribPointer(idx, sz, type, false, srtd, off);
  },
  (idx) => {
    GL.glDisableVertexAttribArray(idx);
  }
);
export const COLOR_ATTRIBUTE = new VertexFormatAttribute(
  4,
  COMPONENT_TYPE.FLOAT,
  (idx, sz, type, srtd, off) => {
    GL.glEnableVertexAttribArray(idx);
    GL.glVertexAttribPointer(idx, sz, type, false, srtd, off);
  },
  (idx) => {
    GL.glDisableVertexAttribArray(idx);
  }
);

export const VertexFormats = {
  POSITION: new VertexFormat([POSITION_ATTRIBUTE]),
  POSITION_COLOR: new VertexFormat([POSITION_ATTRIBUTE, COLOR_ATTRIBUTE]),
  POSITION_TEXTURE: new VertexFormat([POSITION_ATTRIBUTE, TEXTURE_ATTRIBUTE]),
  POSITION_TEXTURE_COLOR_NORMAL: new VertexFormat([POSITION_ATTRIBUTE, TEXTURE_ATTRIBUTE, COLOR_ATTRIBUTE, NORMAL_ATTRIBUTE])
} as const;

export type DrawMode = { glType: number };
export const DrawMode: Record<'QUADS' | 'TRIANGLES' | 'TRIANGLE_FAN' | 'TRIANGLE_STRIP', DrawMode> = {
  QUADS: { glType: GL.TRIANGLES },
  TRIANGLES: { glType: GL.TRIANGLES },
  TRIANGLE_FAN: { glType: GL.TRIANGLE_FAN },
  TRIANGLE_STRIP: { glType: GL.TRIANGLE_STRIP }
} as const;
