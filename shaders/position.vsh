#version 150

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;

in vec3 aPosition;

void main() {
  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
}