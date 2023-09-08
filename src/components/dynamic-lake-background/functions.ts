import { identity, scale, translate } from "./m3";
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

  resizeCanvasToDisplaySize(canvas);

  gl.useProgram(drawImageProgram);

  const projectionUniformLocation = gl.getUniformLocation(
    drawImageProgram,
    "u_canvas_projection_matrix",
  );

  // prettier-ignore
  const projectionMatrix = [
    2 / canvas.width, 0, 0,
    0, (-2 / canvas.height), 0,
    -1, 1, 1
  ];

  gl.uniformMatrix3fv(projectionUniformLocation, false, projectionMatrix);

  return {
    gl,
    drawImageProgram,
  };
};

const convertAssetToTexture = (gl: WebGLRenderingContext, image: HTMLImageElement) => {
  const texture = gl.createTexture();
  if (!texture) throw new Error("Failed to create texture");

  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Fill the texture with a 1x1 blue pixel.
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 255, 255]),
  );

  // let's assume all images are not a power of 2
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

  return texture;
};

export const initImageLayerDraw = async (
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  fishermanWrapper: HTMLDivElement,
) => {
  const dpr = window.devicePixelRatio;
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

  const { clientHeight } = fishermanWrapper;
  const { x, y } = fishermanWrapper.getBoundingClientRect();

  const staticAssets = [
    {
      texture: convertAssetToTexture(gl, assets.boatShadowImage),
      matrix: (() => {
        let matrix = identity();

        const xOffset = x * dpr;
        const yOffset = y * dpr;
        const boatHeight = clientHeight * 0.78 * dpr * 1.02; // I multiple by 0.78 because the actual bot is 78% the height of the bounding box

        /* The Boat ratio is 150.83 / 347.7. Therefore we calculate the boat width
        relative to the boat height. */
        const boatWidth = (150.83 * boatHeight) / 347.7;

        /* NOTE: The following translate and scale can be hardcoded into a single matrix
        and then multiplied by the projection in shader. However, this is much easier to,
        read, debug and understand. That said, the following 2 lines is the same as:

        | boatWidth  0            0 |
        | 1          boatHeight   0 |
        | x          y            1 |
        
        Read more here:
        https://webglfundamentals.org/webgl/lessons/webgl-2d-matrices.html
        */

        matrix = translate(
          matrix,
          xOffset + boatWidth - boatWidth / 50,
          yOffset + boatHeight / 6.3,
        );
        matrix = scale(matrix, boatWidth, boatHeight);
        return matrix;
      })(),
    },
  ];

  return {
    positionLocation,
    texcoordLocation,
    matrixLocation,
    textureLocation,
    staticAssets,
    positionBuffer,
    texcoordBuffer,
  };
};

export const drawAssets = (
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  assetsInfo: Awaited<ReturnType<typeof initImageLayerDraw>>,
) => {
  const {
    staticAssets,
    positionLocation,
    positionBuffer,
    texcoordBuffer,
    texcoordLocation,
    matrixLocation,
    textureLocation,
  } = assetsInfo;

  resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);

  // Tell WebGL how to convert from clip space to pixels
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.clear(gl.COLOR_BUFFER_BIT);

  staticAssets.forEach(({ texture, matrix }) => {
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.useProgram(program);

    // Setup the attributes to pull data from our buffers
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
    gl.enableVertexAttribArray(texcoordLocation);
    gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);

    // Set the matrix.
    gl.uniformMatrix3fv(matrixLocation, false, matrix);

    // Tell the shader to get the texture from texture unit 0
    gl.uniform1i(textureLocation, 0);

    // draw the quad (2 triangles, 6 vertices)
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  });
};
