/*
顶点着色器
*/
precision mediump float;

attribute vec2 a_Position;
attribute vec2 a_ScreenSize;
attribute vec4 a_color;
varying vec4   v_color;
void main(){
  // webgl中对应的x,y的坐标
    vec2 position = a_Position / a_ScreenSize * 2.0 - 1.0;
    position = position * vec2(1.0, -1.0);
    //内置 声明顶点位置
    gl_Position = vec4(position, 0.0, 1.0);
  //   gl_PointSize=20.0;
    // 使用varying在顶点着色器中，接收到的值会被传递到片元着色器中
    v_color=a_color;
}  