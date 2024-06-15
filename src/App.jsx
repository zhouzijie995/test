import { useEffect, useRef } from "react";
import frag from "./glsl/index.frag";
import vert from "./glsl/index.vert";
import { createShader, createProgram } from "@utils";
import { randomColor } from "../utils";
// 定义三个顶点
const point = [];
const colorList = [];
function App() {
  const glRef = useRef(null);
  const programRef = useRef(null);
  const positionBufferRef = useRef(null);
  const colorBufferRef = useRef(null);
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
    const a_color = gl.getAttribLocation(program, "a_color");
    // 读取宽高
    const a_ScreenSize = gl.getAttribLocation(program, "a_ScreenSize");
    // 给宽高赋值
    gl.vertexAttrib2f(a_ScreenSize, canvas.width, canvas.height);
    // 创建位置缓冲区
    const positionBuffer = gl.createBuffer();
    positionBufferRef.current = positionBuffer;
    // 绑定缓冲区
    gl.enableVertexAttribArray(a_Position);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    // 创建颜色缓冲区
    const colorBuffer = gl.createBuffer();
    colorBufferRef.current = colorBuffer;
    // 绑定缓冲区
    gl.enableVertexAttribArray(a_color);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(a_color, 4, gl.FLOAT, false, 0, 0);

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
          const temp_color = randomColor();
          colorList.push(
            temp_color.r,
            temp_color.g,
            temp_color.b,
            temp_color.a
          );

          if (point.length > 0) {
            const gl = glRef.current;
            const positionBuffer = positionBufferRef.current;
            const colorBuffer = colorBufferRef.current;
            // 每次要重新bindBuffer
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            // 将动态改为静态
            gl.bufferData(
              gl.ARRAY_BUFFER,
              new Float32Array(point),
              gl.STATIC_DRAW
            );
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
            gl.bufferData(
              gl.ARRAY_BUFFER,
              new Float32Array(colorList),
              gl.STATIC_DRAW
            );
            if (point.length % 6 === 0) {
              gl.clear(gl.COLOR_BUFFER_BIT);
              gl.drawArrays(gl.TRIANGLES, 0, point.length / 2);
            }
          }
        }}
      ></canvas>
    </>
  );
}

export default App;
