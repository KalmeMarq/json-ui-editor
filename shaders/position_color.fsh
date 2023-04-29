#version 150
      
uniform vec4 uColor;

in vec4 vColor;

void main() {
  gl_FragColor = vColor * uColor;
}