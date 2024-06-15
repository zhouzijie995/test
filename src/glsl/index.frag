/*
片元着色器
*/
precision mediump float;

uniform  vec4 u_FragColor;

void main(){
  gl_FragColor = vec4(0.9608, 0.0784, 0.0784, 1.0);
}