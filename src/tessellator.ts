import { DrawMode, VertexFormat, VertexFormatAttribute } from './vertex_format';

export class BufferBuilder {
  private format?: VertexFormat;
  private mode?: DrawMode;
  private attrib?: VertexFormatAttribute;
  private buffer: Float32Array;
  private attribIdx = 0;
  private attribOff = 0;
  private vertexCount = 0;
  private building = false;

  public constructor(initialCapacity = 64) {
    this.buffer = new Float32Array(initialCapacity);
  }

  public begin(mode: DrawMode, format: VertexFormat) {
    if (this.building) {
      throw new Error('Already building');
    }
    this.building = true;
    this.format = format;
    this.mode = mode;
    this.attrib = format.attributes[0];
    this.vertexCount = 0;
    this.attribIdx = 0;
    this.attribOff = 0;
  }

  public vertex(x: number, y: number, z: number): BufferBuilder {
    this.buffer[this.attribOff] = x;
    this.buffer[this.attribOff + 1] = y;
    this.buffer[this.attribOff + 2] = z;
    this.nextAttribute();
    return this;
  }

  public normal(x: number, y: number, z: number): BufferBuilder {
    this.buffer[this.attribOff] = x;
    this.buffer[this.attribOff + 1] = y;
    this.buffer[this.attribOff + 2] = z;
    this.nextAttribute();
    return this;
  }

  public texture(u: number, v: number): BufferBuilder {
    this.buffer[this.attribOff] = u;
    this.buffer[this.attribOff + 1] = v;
    this.nextAttribute();
    return this;
  }

  public color(r: number, g: number, b: number, a: number): BufferBuilder {
    this.buffer[this.attribOff] = r;
    this.buffer[this.attribOff + 1] = g;
    this.buffer[this.attribOff + 2] = b;
    this.buffer[this.attribOff + 3] = a;
    this.nextAttribute();
    return this;
  }

  private nextAttribute() {
    this.attribOff += this.attrib!.size;
    this.attribIdx = (this.attribIdx + 1) % this.format!.attributes.length;
    this.attrib = this.format!.attributes[this.attribIdx];
  }

  public next() {
    ++this.vertexCount;
  }

  public draw() {
    if (!this.building) {
      throw new Error('Not building');
    }

    if (this.vertexCount > 0) {
      const vb = this.format!.getVertexBuffer();
      vb.upload(this.buffer.subarray(0, this.attribOff), this.attribOff, this.vertexCount, this.mode!, this.format!);
      vb.draw();
    }

    this.vertexCount = 0;
    this.attribIdx = 0;
    this.attrib = undefined;
    this.attribOff = 0;
    this.building = false;
  }
}

export class Tessellator {
  private static INSTANCE: Tessellator;

  public static getInstance(): Tessellator {
    if (Tessellator.INSTANCE == null) {
      Tessellator.INSTANCE = new Tessellator();
    }
    return Tessellator.INSTANCE;
  }

  private buffer: BufferBuilder;

  public constructor(initialCapacity = 64) {
    this.buffer = new BufferBuilder(initialCapacity);
  }

  public getBufferBuilder(): BufferBuilder {
    return this.buffer;
  }

  public draw() {
    this.buffer.draw();
  }
}
