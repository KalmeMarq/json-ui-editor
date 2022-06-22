precision mediump float;
    
uniform float size;
uniform float amount;
uniform float focalPointX;
uniform float focalPointY;

varying vec2 vVertexPosition;

void main() {
  vec3 rgb = vec3(1.0, 0.0, 1.0);

  float alpha = 0.5;
  
  gl_FragColor = vec4(vec3(rgb), alpha);
}