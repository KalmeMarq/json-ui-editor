precision mediump float;
attribute vec2 aVertexPosition;
attribute vec2 aUvs;
uniform mat3 translationMatrix;
uniform mat3 projectionMatrix;

varying vec2 vVertexPosition;

void main() {
  vec2 pos = (projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy;
  vVertexPosition = pos;

  gl_Position = vec4(vec2(pos), 0.0, 1.0);
}