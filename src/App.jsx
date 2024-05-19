import { useEffect } from "react";
import frag from "./glsl/index.frag";
import vert from "./glsl/index.vert";
import { createShader, createProgram } from "@utils";
function App() {
  useEffect(() => {
    const canvas = document.querySelector("#canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    const vertShader = createShader(gl, gl.VERTEX_SHADER, vert);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, frag);
    //创建着色器程序
    const program = createProgram(gl, vertShader, fragShader);
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
