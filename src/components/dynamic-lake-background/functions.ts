/* eslint-disable @typescript-eslint/no-unused-vars */
import { DRAW_IMAGE_FRAGMENT_SHADER, DRAW_IMAGE_VERTEX_SHADER } from "./shaders";

export const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (shader) {
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }
    console.error(gl.getShaderInfoLog(shader));

    gl.deleteShader(shader);
  }
};

export const createProgram = (
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader,
) => {
  const program = gl.createProgram();
  if (program) {
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }

    console.error(gl.getProgramInfoLog(program));

    gl.deleteProgram(program);
  }
};

// This ensures that the canvas rendering area matches the size of the canvas determined via CSS
export const resizeCanvasToDisplaySize = (canvas: HTMLCanvasElement) => {
  const dpr = window.devicePixelRatio;
  const { width, height } = canvas.getBoundingClientRect();
  const displayWidth = Math.round(width * dpr);
  const displayHeight = Math.round(height * dpr);

  // Check if the canvas is not the same size.
  const needResize = canvas.width != displayWidth || canvas.height != displayHeight;

  if (needResize) {
    // Make the canvas the same size
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }

  return needResize;
};

const loadImage = (url: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.onload = () => resolve(image);
    image.onerror = (e) => reject(e);
  });

const loadAssets = async () => {
  const boatShadowImage = await loadImage("/404-images/boat-shadow.png");
  const bigWaveImage = await loadImage("/404-images/big-wave.png");
  const smallWaveImage = await loadImage("/404-images/small-wave.png");

  return { boatShadowImage, bigWaveImage, smallWaveImage };
};

export const initWebGL = async (canvas: HTMLCanvasElement) => {
  const gl = canvas.getContext("webgl");

  if (!gl) throw new Error("Failed to inistialise WebGL");

  const drawImageVertexShader = createShader(gl, gl.VERTEX_SHADER, DRAW_IMAGE_VERTEX_SHADER);

  if (!drawImageVertexShader) throw new Error("Failed to create 'draw image' vertex shader");

  const drawImageFragmentShader = createShader(gl, gl.FRAGMENT_SHADER, DRAW_IMAGE_FRAGMENT_SHADER);

  if (!drawImageFragmentShader) throw new Error("Failed to create 'draw image' fragment shader");

  const drawImageProgram = createProgram(gl, drawImageVertexShader, drawImageFragmentShader);

  if (!drawImageProgram) throw new Error("Failed to create 'draw image' program");

  return {
    gl,
    drawImageProgram,
  };
};

export const initImageLayerDraw = async (gl: WebGLRenderingContext, program: WebGLProgram) => {
  // look up where the vertex data needs to go.
  const positionLocation = gl.getAttribLocation(program, "a_position");
  const texcoordLocation = gl.getAttribLocation(program, "a_texcoord");

  // lookup uniforms
  const matrixLocation = gl.getUniformLocation(program, "u_matrix");
  const textureLocation = gl.getUniformLocation(program, "u_texture");

  // Create a buffer.
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Put a unit quad in the buffer
  const positions = [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // Create a buffer for texture coords
  const texcoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);

  // Put texcoords in the buffer
  const texcoords = [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW);

  const assets = await loadAssets();

  /* These will be responsible for correctly scaling and positioning the assets/textures.
  The idea is to make everything relative to the boat */
  // prettier-ignore
  const staticAssetsTransMatrix = {
    boatShadowImage: [
      1, 1, 1,
      1, 1, 1,
      1, 1, 1
    ],
    bigWaveImage: [
      1, 1, 1,
      1, 1, 1,
      1, 1, 1
    ],
    smallWaveImage: [
      1, 1, 1,
      1, 1, 1,
      1, 1, 1
    ],


  }

  const convertAssetToTexture = () => {
    //
  };

  return {
    assets,
    positionLocation,
    texcoordLocation,
    matrixLocation,
    textureLocation,
    staticAssetsTransMatrix,
  };
};

const drawAssets = (
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  assetsInfo: ReturnType<typeof initImageLayerDraw>,
) => {
  //
};
