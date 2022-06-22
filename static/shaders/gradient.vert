precision mediump float;

attribute vec2 aVertexPosition;
attribute vec4 aColor;
attribute vec2 aUvs;

uniform mat3 translationMatrix;
uniform mat3 projectionMatrix;

varying vec4 vColor;

void main() {
  vColor = aColor;
  gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
}