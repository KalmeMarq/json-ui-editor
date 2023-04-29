import { GL, RenderSystem } from './gl';
import { PROGRAMS } from './program';
import { Tessellator } from './tessellator';
import { DrawMode, VertexFormats } from './vertex_format';

export class TextRenderer {
  fontData: any;
  constructor(fontData: any) {
    this.fontData = fontData;
  }

  drawWithShadowfv(text: string, x: number, y: number, color: number[]) {
    if (text.length == 0) return;

    RenderSystem.enableBlend();
    GL.glBlendFuncSeparate(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA, GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);
    const tes = Tessellator.getInstance();
    const builder = tes.getBufferBuilder();
    RenderSystem.setShaderTexture(0, 'ascii.png');
    RenderSystem.setShader(PROGRAMS.POSITION_TEXTURE_COLOR);

    let xx = x;
    const y1 = y + 8;
    for (let i = 0; i < text.length; ++i) {
      const dt = this.fontData[text[i]];
      if (text[i] == ' ') xx += 4;

      if (dt == null) continue;

      const u0 = dt.u / 128;
      const v0 = dt.v / 128;
      const u1 = (dt.u + 8) / 128;
      const v1 = (dt.v + 8) / 128;
      builder.begin(DrawMode.QUADS, VertexFormats.POSITION_TEXTURE_COLOR);

      builder.vertex(xx, y, 0).texture(u0, v0).color(color[0], color[1], color[2], color[3]).next();
      builder.vertex(xx, y1, 0).texture(u0, v1).color(color[0], color[1], color[2], color[3]).next();
      builder
        .vertex(xx + 8, y1, 0)
        .texture(u1, v1)
        .color(color[0], color[1], color[2], color[3])
        .next();
      builder
        .vertex(xx + 8, y, 0)
        .texture(u1, v0)
        .color(color[0], color[1], color[2], color[3])
        .next();
      builder.draw();
      xx += dt['a'];
    }

    RenderSystem.disableBlend();
  }

  draw(text: string, x: number, y: number, color: number[]) {
    this.drawWithShadowfv(text, x, y, color);
  }
}
