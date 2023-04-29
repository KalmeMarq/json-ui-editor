#version 150
    
uniform sampler2D uSampler0;
uniform vec4 uColor;

in vec2 vUV;

void main() {
  gl_FragColor = texture(uSampler0, vUV) * uColor;
}