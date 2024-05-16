import { useEffect } from "react";
import frag from "./glsl/index.frag";
import vert from "./glsl/index.vert";

function App() {
  useEffect(() => {
    var canvas = document.querySelector("#canvas");
    var gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    // 创建顶点着色器对象
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    // 将源码分配给顶点着色器对象
    gl.shaderSource(vertexShader, vert);
    // 编译顶点着色器程序
    gl.compileShader(vertexShader);
    // 创建片元着色器程序
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    // 将源码分配给片元着色器对象
    gl.shaderSource(fragmentShader, frag);
    // 编译片元着色器
    gl.compileShader(fragmentShader);
    //创建着色器程序
    var program = gl.createProgram();
    //将顶点着色器挂载在着色器程序上。
    gl.attachShader(program, vertexShader);
    //将片元着色器挂载在着色器程序上。
    gl.attachShader(program, fragmentShader);
    //链接着色器程序
    gl.linkProgram(program);
    // 使用刚创建好的着色器程序。
    gl.useProgram(program);
    //设置清空画布颜色为黑色。
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    //用上一步设置的清空画布颜色清空画布。
    gl.clear(gl.COLOR_BUFFER_BIT);
    //绘制点。
    gl.drawArrays(gl.POINTS, 0, 1);
  }, []);
  return (
    <>
      <canvas width={500} height={500} id="canvas"></canvas>
    </>
  );
}

export default App;
