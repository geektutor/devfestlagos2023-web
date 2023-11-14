// import { NOISE_FRAGMENT_SHADER, NOISE_VERTEX_SHADER } from "./shaders";
// import { createProgram, createShader, resizeCanvasToDisplaySize } from "./webgl-functions";

export const initialise = (canvas: HTMLCanvasElement, color: Float32Array) => {
  console.log(canvas);
  console.log(color);
  //   resizeCanvasToDisplaySize(canvas);
  //   const gl = canvas.getContext("webgl");
  //   if (!gl) throw new Error("Failed to inistialise WebGL");
  //   gl.clear(gl.COLOR_BUFFER_BIT);
  //   gl.clearColor(color[0], color[1], color[2], color[3]);
  //   const vertexShader = createShader(gl, gl.VERTEX_SHADER, NOISE_FRAGMENT_SHADER)!;
  //   const fragmentShader = createShader(gl, gl.VERTEX_SHADER, NOISE_VERTEX_SHADER)!;
  //   const program = createProgram(gl, vertexShader, fragmentShader)!;
  //   const projectionMatrixLocation = gl.getUniformLocation(program, "projectionMatrix")!;
  //   // prettier-ignore
  //   const projectionMatrix = [
  //     2 / gl.canvas.width, 0, 0,
  //     0, (-2 / gl.canvas.height), 0,
  //     -1, 1, 1
  //   ];
  //   gl.uniformMatrix3fv(projectionMatrixLocation, false, projectionMatrix);
  //   const aPosition = gl.getAttribLocation(program, "a_position");
};
