import { ShaderProgram } from './gl';

export const PROGRAMS: Record<'POSITION' | 'POSITION_COLOR' | 'POSITION_TEXTURE' | 'GRAYSCALE_POSITION_TEXTURE', ShaderProgram> = {
  POSITION: {
    id: null,
    projectionUniform: null,
    modelViewUniform: null,
    colorUniform: null,
    hasTexture: false,
    samplers: [],
    vertex: await (await fetch('shaders/position.vsh')).text(),
    fragment: await (await fetch('shaders/position.fsh')).text()
  },
  POSITION_COLOR: {
    id: null,
    projectionUniform: null,
    modelViewUniform: null,
    colorUniform: null,
    hasTexture: false,
    samplers: [],
    vertex: await (await fetch('shaders/position_color.vsh')).text(),
    fragment: await (await fetch('shaders/position_color.fsh')).text()
  },
  POSITION_TEXTURE: {
    id: null,
    projectionUniform: null,
    modelViewUniform: null,
    colorUniform: null,
    hasTexture: true,
    samplers: [],
    vertex: await (await fetch('shaders/position_texture.vsh')).text(),
    fragment: await (await fetch('shaders/position_texture.fsh')).text()
  },
  GRAYSCALE_POSITION_TEXTURE: {
    id: null,
    projectionUniform: null,
    modelViewUniform: null,
    colorUniform: null,
    hasTexture: true,
    samplers: [],
    vertex: await (await fetch('shaders/grayscale_position_texture.vsh')).text(),
    fragment: await (await fetch('shaders/grayscale_position_texture.fsh')).text()
  }
};

export function preparePrograms(gl: WebGL2RenderingContext) {
  for (const program of Object.values(PROGRAMS)) {
    program.id = gl.createProgram();

    const vS = gl.createShader(gl.VERTEX_SHADER)!;
    const fS = gl.createShader(gl.FRAGMENT_SHADER)!;

    const transformSource = (source: string, frag: boolean) => {
      source = source.trim();

      if (source.includes('#version 150')) {
        source = source.replace('#version 150', '').trim();
        if (frag) source = source.replace(/in\s+/g, 'varying ');
        else source = source.replace(/out\s+/g, 'varying ');

        if (!frag) source = source.replace(/in\s+/g, 'attribute ');

        if (frag) {
          source = source.replace(/texture(?=\([a-zA-Z0-9]+\s*,\s*[a-zA-Z0-9]+\))/g, 'texture2D');
        }
      }

      return source;
    };

    gl.shaderSource(vS, transformSource(program.vertex, false));
    gl.shaderSource(fS, 'precision mediump float;\n' + transformSource(program.fragment, true));

    gl.compileShader(vS);
    let succ = gl.getShaderInfoLog(vS);
    if (succ != null) {
      console.log(succ);
    }

    gl.compileShader(fS);
    succ = gl.getShaderInfoLog(fS);
    if (succ != null) {
      console.log(succ);
    }

    gl.attachShader(program.id!, vS);
    gl.attachShader(program.id!, fS);

    gl.linkProgram(program.id!);
    succ = gl.getProgramInfoLog(program.id!);
    if (succ != null) {
      console.log(succ);
    }

    gl.validateProgram(program.id!);

    gl.detachShader(program.id!, vS);
    gl.detachShader(program.id!, fS);
    gl.deleteShader(vS);
    gl.deleteShader(fS);

    program.projectionUniform = gl.getUniformLocation(program.id!, 'uProjectionMatrix');
    program.modelViewUniform = gl.getUniformLocation(program.id!, 'uModelViewMatrix');
    program.colorUniform = gl.getUniformLocation(program.id!, 'uColor');

    if (program.hasTexture) {
      for (let i = 0; i < 4; ++i) {
        const n = gl.getUniformLocation(program.id!, 'uSampler' + i);
        if (n != null) {
          program.samplers.push(n);
        }
      }
    }
  }
}
