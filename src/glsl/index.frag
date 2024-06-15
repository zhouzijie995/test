/*
片元着色器
*/
precision mediump float;

uniform  vec4 u_FragColor;

void main(){
  gl_FragColor = vec4(0.08, 0.33, 0.96, 1.0);
}