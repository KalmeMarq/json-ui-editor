#version 150

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;

in vec3 aPosition;
in vec2 aUV;

out vec2 vUV;

void main() {
  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
  vUV = aUV;
}