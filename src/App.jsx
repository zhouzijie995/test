import { useEffect, useRef } from "react";
import frag from "./glsl/index.frag";
import vert from "./glsl/index.vert";
import { createShader, createProgram } from "@utils";
// 定义三个顶点
const point = [];
function App() {
  const glRef = useRef(null);
  const programRef = useRef(null);
  useEffect(() => {
    const canvas = document.querySelector("#canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    glRef.current = gl;
    const vertShader = createShader(gl, gl.VERTEX_SHADER, vert);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, frag);
    //创建着色器程序
    const program = createProgram(gl, vertShader, fragShader);
    programRef.current = program;
    // 使用刚创建好的着色器程序。
    gl.useProgram(program);

    const a_Position = gl.getAttribLocation(program, "a_Position");
    // 读取宽高
    const a_ScreenSize = gl.getAttribLocation(program, "a_ScreenSize");
    // 给宽高赋值
    gl.vertexAttrib2f(a_ScreenSize, canvas.width, canvas.height);
    // 创建缓冲区
    const buffer = gl.createBuffer();

    // 绑定缓冲区
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    // 将数据写入缓冲区

    gl.enableVertexAttribArray(a_Position);
    // 传递数据
    const size = 2; // 每次取两个数据
    const type = gl.FLOAT; // 数据类型
    const normalize = false; // 是否归一化
    const stride = 0; // 间隔
    const offset = 0; // 偏移量
    gl.vertexAttribPointer(a_Position, size, type, normalize, stride, offset);
    //设置清空画布颜色为黑色。
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    //用上一步设置的清空画布颜色清空画布。
    gl.clear(gl.COLOR_BUFFER_BIT);
  }, []);
  return (
    <>
      <canvas
        width={500}
        height={500}
        id="canvas"
        onClick={(e) => {
          const x = e.pageX;
          const y = e.pageY;
          point.push(x, y);
          const gl = glRef.current;
          if (point.length % 6 === 0) {
            // webgl浮点数占用4个字节， 32位
            gl.bufferData(
              gl.ARRAY_BUFFER,
              new Float32Array(point),
              gl.STATIC_DRAW
            );
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLES, 0, point.length / 2);
          }
        }}
      ></canvas>
    </>
  );
}

export default App;
