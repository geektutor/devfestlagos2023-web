import {
  createProgram,
  createShader,
  getProjectionMatrix,
  resizeCanvasToDisplaySize,
  setQuadVertices,
} from "@/utils/webgl-utility";
import { NOISE_FRAGMENT_SHADER, NOISE_VERTEX_SHADER } from "./shaders";

export const initialise = async (canvas: HTMLCanvasElement, color: Float32Array) => {
  const gl = canvas.getContext("webgl");
  if (!gl) throw new Error("Failed to inistialise WebGL");

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, NOISE_VERTEX_SHADER);
  if (!vertexShader) throw new Error("Failed to create noise background vertex shader");

  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, NOISE_FRAGMENT_SHADER);
  if (!fragmentShader) throw new Error("Failed to create noise background fragment shader");

  const program = createProgram(gl, vertexShader, fragmentShader);
  if (!program) throw new Error("Failed to create noise background program");

  const projectionMatrixLocation = gl.getUniformLocation(program, "u_projectionMatrix");
  const pixelColorUniformLocation = gl.getUniformLocation(program, "u_pixelColor");
  const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");

  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  const positionBuffer = gl.createBuffer();

  const render = () => {
    resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clearColor(0, 0, 0, 0);

    gl.clear(gl.COLOR_BUFFER_BIT);

    const projectionMatrix = getProjectionMatrix(gl.canvas);

    gl.useProgram(program);

    gl.uniformMatrix3fv(projectionMatrixLocation, false, projectionMatrix);

    gl.uniform3fv(pixelColorUniformLocation, color);
    gl.uniform2fv(
      resolutionUniformLocation,
      Float32Array.from([gl.canvas.width, gl.canvas.height]),
    );

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    setQuadVertices(gl);

    gl.enableVertexAttribArray(positionAttributeLocation);

    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  };
  return render;
};
