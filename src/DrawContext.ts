import { TextRenderer } from './TextRenderer';
import { RenderSystem } from './gl';
import { PROGRAMS } from './program';
import { BufferBuilder, Tessellator } from './tessellator';
import { DrawMode, VertexFormats } from './vertex_format';

export class DrawContext {
  textRend: TextRenderer;

  constructor(textRend: TextRenderer) {
    this.textRend = textRend;
  }

  public drawTexture(texture: string, x: number, y: number, z: number, width: number, height: number, u: number, v: number, us: number, vs: number, tw: number, th: number, grayscale: boolean) {
    const tessellator = Tessellator.getInstance();
    const builder = tessellator.getBufferBuilder();
    RenderSystem.setShaderTexture(0, texture);
    RenderSystem.setShader(grayscale ? PROGRAMS.GRAYSCALE_POSITION_TEXTURE : PROGRAMS.POSITION_TEXTURE);
    builder.begin(DrawMode.QUADS, VertexFormats.POSITION_TEXTURE);
    const x1 = x + width;
    const y1 = y + height;
    const u0 = u / tw;
    const v0 = v / th;
    const u1 = (u + us) / tw;
    const v1 = (v + vs) / th;

    builder.vertex(x, y, z).texture(u0, v0).next();
    builder.vertex(x, y1, z).texture(u0, v1).next();
    builder.vertex(x1, y1, z).texture(u1, v1).next();
    builder.vertex(x1, y, z).texture(u1, v0).next();
    builder.draw();
  }

  public drawBorder(x: number, y: number, z: number, width: number, height: number, red: number, green: number, blue: number, alpha: number) {
    this.drawColoredf(x, y, z, 1, height, red, green, blue, alpha);
    this.drawColoredf(x + width - 1, y, z, 1, height, red, green, blue, alpha);
    this.drawColoredf(x, y, z, width, 1, red, green, blue, alpha);
    this.drawColoredf(x, y + height - 1, z, width, 1, red, green, blue, alpha);
  }

  private drawBorderQuad(builder: BufferBuilder, x: number, y: number, z: number, w: number, h: number, red: number, green: number, blue: number, alpha: number) {
    const x1 = x + w;
    const y1 = y + h;
    builder.vertex(x, y, z).color(red, green, blue, alpha).next();
    builder.vertex(x, y1, z).color(red, green, blue, alpha).next();
    builder.vertex(x1, y1, z).color(red, green, blue, alpha).next();
    builder.vertex(x1, y, z).color(red, green, blue, alpha).next();
  }

  public drawColoredfv(x: number, y: number, z: number, width: number, height: number, color: number[]) {
    this.drawColoredf(x, y, z, width, height, color[0], color[1], color[2], color[3]);
  }

  public drawColoredf(x: number, y: number, z: number, width: number, height: number, red: number, green: number, blue: number, alpha: number) {
    const tessellator = Tessellator.getInstance();
    const builder = tessellator.getBufferBuilder();
    RenderSystem.setShader(PROGRAMS.POSITION_COLOR);
    builder.begin(DrawMode.QUADS, VertexFormats.POSITION_COLOR);
    const x1 = x + width;
    const y1 = y + height;
    builder.vertex(x, y, z).color(red, green, blue, alpha).next();
    builder.vertex(x, y1, z).color(red, green, blue, alpha).next();
    builder.vertex(x1, y1, z).color(red, green, blue, alpha).next();
    builder.vertex(x1, y, z).color(red, green, blue, alpha).next();
    builder.draw();
  }

  public drawVGradientfv(x: number, y: number, z: number, width: number, height: number, colorStart: number[], colorEnd: number[]) {
    const tessellator = Tessellator.getInstance();
    const builder = tessellator.getBufferBuilder();
    RenderSystem.setShader(PROGRAMS.POSITION_COLOR);
    builder.begin(DrawMode.QUADS, VertexFormats.POSITION_COLOR);
    const x1 = x + width;
    const y1 = y + height;
    builder.vertex(x, y, z).color(colorStart[0], colorStart[1], colorStart[2], colorStart[3]).next();
    builder.vertex(x, y1, z).color(colorEnd[0], colorEnd[1], colorEnd[2], colorEnd[3]).next();
    builder.vertex(x1, y1, z).color(colorEnd[0], colorEnd[1], colorEnd[2], colorEnd[3]).next();
    builder.vertex(x1, y, z).color(colorStart[0], colorStart[1], colorStart[2], colorStart[3]).next();
    builder.draw();
  }

  public drawHGradientfv(x: number, y: number, z: number, width: number, height: number, colorStart: number[], colorEnd: number[]) {
    const tessellator = Tessellator.getInstance();
    const builder = tessellator.getBufferBuilder();
    RenderSystem.setShader(PROGRAMS.POSITION_COLOR);
    builder.begin(DrawMode.QUADS, VertexFormats.POSITION_COLOR);
    const x1 = x + width;
    const y1 = y + height;
    builder.vertex(x, y, z).color(colorStart[0], colorStart[1], colorStart[2], colorStart[3]).next();
    builder.vertex(x, y1, z).color(colorStart[0], colorStart[1], colorStart[2], colorStart[3]).next();
    builder.vertex(x1, y1, z).color(colorEnd[0], colorEnd[1], colorEnd[2], colorEnd[3]).next();
    builder.vertex(x1, y, z).color(colorEnd[0], colorEnd[1], colorEnd[2], colorEnd[3]).next();
    builder.draw();
  }
}
