#version 150
    
uniform sampler2D uSampler0;
uniform vec4 uColor;

in vec2 vUV;

void main() {
  vec4 color = texture(uSampler0, vUV) * uColor;
  float avg = (color.r + color.g + color.b) / 3.0;
  
  gl_FragColor = vec4(avg, avg, avg, color.a);
}