import { useEffect, useRef, useState } from "react";
import frag from "./glsl/index.frag";
import vert from "./glsl/index.vert";
import { createShader, createProgram, randomColor } from "@utils";

function App() {
  const [pointList, setPointList] = useState([]);
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
    const a_ScreenSize = gl.getAttribLocation(program, "a_ScreenSize");

    gl.vertexAttrib2f(a_ScreenSize, canvas.width, canvas.height);

    // 使用刚创建好的着色器程序。
    gl.useProgram(program);
    //设置清空画布颜色为黑色。
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    //用上一步设置的清空画布颜色清空画布。
    gl.clear(gl.COLOR_BUFFER_BIT);
    //绘制点。
    canvas.addEventListener("click", (event) => {
      const x = event.clientX;
      const y = event.clientY;
      const color = randomColor();
      setPointList((pre) => [...pre, { x, y, color }]);
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      //用上一步设置的清空画布颜色清空画布。
      gl.clear(gl.COLOR_BUFFER_BIT);
    });
  }, []);
  useEffect(() => {
    if (pointList.length && glRef.current && programRef.current) {
      const gl = glRef.current;
      const program = programRef.current;
      const a_Position = gl.getAttribLocation(program, "a_Position");
      const u_FragColor = gl.getUniformLocation(program, "u_FragColor");
      pointList.forEach((item) => {
        gl.vertexAttrib2f(a_Position, item.x, item.y);
        gl.uniform4f(
          u_FragColor,
          item.color.r,
          item.color.g,
          item.color.b,
          item.color.a
        );

        gl.drawArrays(gl.POINTS, 0, 1);
      });
    }
  }, [pointList]);
  return (
    <>
      <canvas width={500} height={500} id="canvas"></canvas>
    </>
  );
}

export default App;
