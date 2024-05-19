/*
片元着色器
*/
precision mediump float;

uniform  vec4 u_FragColor;

void main(){
  gl_FragColor = u_FragColor / vec4(255,255,255,1.0);
}