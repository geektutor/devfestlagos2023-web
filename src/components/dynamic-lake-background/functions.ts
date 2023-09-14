import { identity, scale, translate } from "./m3";
import {
  DRAW_DISTORTED_TEXTURE_FRAGMENT_SHADER,
  DRAW_DISTORTED_TEXTURE_VERTEX_SHADER,
  DRAW_IMAGE_FRAGMENT_SHADER,
  DRAW_IMAGE_VERTEX_SHADER,
} from "./shaders";
import {
  convertAssetToTexture,
  createProgram,
  createShader,
  createTextureToRenderTo,
  resizeCanvasToDisplaySize,
  setQuadVertices,
} from "./webgl-utility";

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
  const waterDuDvMap = await loadImage("/404-images/water-dudv-map.jpeg");

  return { boatShadowImage, bigWaveImage, smallWaveImage, waterDuDvMap };
};

export const initialise = async (canvas: HTMLCanvasElement) => {
  resizeCanvasToDisplaySize(canvas);

  const gl = canvas.getContext("webgl", { alpha: false });

  if (!gl) throw new Error("Failed to inistialise WebGL");

  gl.enable(gl.BLEND);

  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  const drawImageVertexShader = createShader(gl, gl.VERTEX_SHADER, DRAW_IMAGE_VERTEX_SHADER);
  if (!drawImageVertexShader) throw new Error("Failed to create 'draw image' vertex shader");

  const drawDistortedTextureVertexShader = createShader(
    gl,
    gl.VERTEX_SHADER,
    DRAW_DISTORTED_TEXTURE_VERTEX_SHADER,
  );
  if (!drawDistortedTextureVertexShader)
    throw new Error("Failed to create 'draw distorted texture' vertex shader");

  const drawImageFragmentShader = createShader(gl, gl.FRAGMENT_SHADER, DRAW_IMAGE_FRAGMENT_SHADER);
  if (!drawImageFragmentShader) throw new Error("Failed to create 'draw image' fragment shader");

  const drawDistortedTextureFragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    DRAW_DISTORTED_TEXTURE_FRAGMENT_SHADER,
  );
  if (!drawDistortedTextureFragmentShader)
    throw new Error("Failed to create 'draw distorted texture' fragment shader");

  const renderSceneToTextureProgram = createProgram(
    gl,
    drawImageVertexShader,
    drawImageFragmentShader,
  );
  if (!renderSceneToTextureProgram) throw new Error("Failed to create 'draw image' program");

  const distortSceneAndRenderToCanvasProgram = createProgram(
    gl,
    drawDistortedTextureVertexShader,
    drawDistortedTextureFragmentShader,
  );
  if (!distortSceneAndRenderToCanvasProgram)
    throw new Error("Failed to create 'draw distorted texture' program");

  const assets = await loadAssets();

  return {
    canvas,
    gl,
    renderSceneToTextureProgram,
    distortSceneAndRenderToCanvasProgram,
    assets,
  };
};

export const prepareRenderSceneToTexture = (
  fishermanWrapper: HTMLDivElement,
  initData: Awaited<ReturnType<typeof initialise>>,
) => {
  const { canvas, gl, renderSceneToTextureProgram, assets } = initData;
  const dpr = window.devicePixelRatio;

  gl.useProgram(renderSceneToTextureProgram);

  const projectionUniformLocation = gl.getUniformLocation(
    renderSceneToTextureProgram,
    "u_canvasProjectionMatrix",
  );

  // prettier-ignore
  const projectionMatrix = [
    2 / canvas.width, 0, 0,
    0, (-2 / canvas.height), 0,
    -1, 1, 1
  ];

  gl.uniformMatrix3fv(projectionUniformLocation, false, projectionMatrix);

  // look up where the vertex data needs to go.
  const positionLocation = gl.getAttribLocation(renderSceneToTextureProgram, "a_position");
  const texcoordLocation = gl.getAttribLocation(renderSceneToTextureProgram, "a_texcoord");

  // lookup uniforms
  const matrixLocation = gl.getUniformLocation(renderSceneToTextureProgram, "u_matrix");
  const textureLocation = gl.getUniformLocation(renderSceneToTextureProgram, "u_texture");

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

  const { clientHeight } = fishermanWrapper;
  const { x, y } = fishermanWrapper.getBoundingClientRect();
  const xOffset = x * dpr;
  const yOffset = y * dpr;

  const boatHeight = clientHeight * 0.78 * dpr * 1.02; // I multiple by 0.78 because the actual bot is 78% the height of the bounding box

  /* The Boat ratio is 150.83 / 347.7. Therefore we calculate the boat width
  relative to the boat height. */
  const boatWidth = (150.83 * boatHeight) / 347.7;
  /* NOTE: The following translations and scaling used on each item can be hardcoded into a single matrix
    and then multiplied by the projection in shader. However, this is much easier to,
    read, debug and understand. An example of what it could look like is:

    | boatWidth  0            0 |
    | 1          boatHeight   0 |
    | x          y            1 |
    
    Read more here:
    https://webglfundamentals.org/webgl/lessons/webgl-2d-matrices.html
  */
  const staticAssets = [
    {
      texture: convertAssetToTexture(gl, assets.bigWaveImage),
      matrix: (() => {
        const waveWidth = 1.83 * boatWidth;
        const waveHeight = 1.9 * boatHeight;

        let matrix = identity();
        matrix = translate(matrix, xOffset + boatWidth * 0.75, gl.canvas.height - waveHeight);
        matrix = scale(matrix, waveWidth, waveHeight);
        return matrix;
      })(),
    },
    {
      texture: convertAssetToTexture(gl, assets.smallWaveImage),
      matrix: (() => {
        const waveWidth = 0.97 * boatWidth;
        const waveHeight = 0.75 * boatHeight;

        let matrix = identity();
        matrix = translate(
          matrix,
          xOffset + boatWidth + 0.08 * boatWidth,
          gl.canvas.height - waveHeight,
        );
        matrix = scale(matrix, waveWidth, waveHeight);
        return matrix;
      })(),
    },

    {
      texture: convertAssetToTexture(gl, assets.boatShadowImage),
      matrix: (() => {
        let matrix = identity();

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

export const renderSceneToTexture = (
  initData: Awaited<ReturnType<typeof initialise>>,
  preparedData: ReturnType<typeof prepareRenderSceneToTexture>,
) => {
  const { gl, renderSceneToTextureProgram } = initData;
  const {
    staticAssets,
    positionLocation,
    positionBuffer,
    texcoordBuffer,
    texcoordLocation,
    matrixLocation,
    textureLocation,
  } = preparedData;

  resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);

  const targetTexture = createTextureToRenderTo(gl);

  // Tell WebGL how to convert from clip space to pixels
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.clearColor(1, 0.9804, 0.9216, 1);

  const frameBuffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);

  const attachmentPoint = gl.COLOR_ATTACHMENT0;
  gl.framebufferTexture2D(gl.FRAMEBUFFER, attachmentPoint, gl.TEXTURE_2D, targetTexture, 0);

  staticAssets.forEach(({ texture, matrix }) => {
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.useProgram(renderSceneToTextureProgram);

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

  return targetTexture;
};

export const prepareRenderSceneToCanvas = (
  sceneTexture: WebGLTexture,
  initData: Awaited<ReturnType<typeof initialise>>,
) => {
  const {
    gl,
    canvas,
    distortSceneAndRenderToCanvasProgram,
    assets: { waterDuDvMap },
  } = initData;

  gl.useProgram(distortSceneAndRenderToCanvasProgram);

  const projectionUniformLocation = gl.getUniformLocation(
    distortSceneAndRenderToCanvasProgram,
    "u_canvasProjectionMatrix",
  );

  const textureProjectionUniformLocation = gl.getUniformLocation(
    distortSceneAndRenderToCanvasProgram,
    "u_textureProjectionMatrix",
  );

  // prettier-ignore
  const projectionMatrix = [
      2 / canvas.width, 0, 0,
      0, (-2 / canvas.height), 0,
      -1, 1, 1
    ];

  gl.uniformMatrix3fv(projectionUniformLocation, false, projectionMatrix);

  // prettier-ignore
  const textureProjectionMatrix = [
    1 / canvas.width, 0, 0,
    0, (-1 / canvas.height), 0,
    0, 1, 1
  ];

  gl.uniformMatrix3fv(textureProjectionUniformLocation, false, textureProjectionMatrix);

  // look up where the vertex data needs to go.
  const positionLocation = gl.getAttribLocation(distortSceneAndRenderToCanvasProgram, "a_position");
  const texcoordLocation = gl.getAttribLocation(distortSceneAndRenderToCanvasProgram, "a_texcoord");

  // lookup uniforms
  const textureLocation = gl.getUniformLocation(distortSceneAndRenderToCanvasProgram, "u_texture");
  const dudvMapUniformLocation = gl.getUniformLocation(
    distortSceneAndRenderToCanvasProgram,
    "u_dudvMap",
  );

  const dudvMapTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, dudvMapTexture);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, waterDuDvMap);

  // Create a buffer.
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  setQuadVertices(gl);

  // Create a buffer for texture coords
  const texcoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);

  setQuadVertices(gl);

  return {
    positionLocation,
    positionBuffer,
    texcoordLocation,
    texcoordBuffer,
    textureLocation,
    sceneTexture,
    dudvMapUniformLocation,
    dudvMapTexture,
  };
};

export const renderDistortedSceneToCanvas = (
  initData: Awaited<ReturnType<typeof initialise>>,
  preparedData: ReturnType<typeof prepareRenderSceneToCanvas>,
) => {
  const { gl, distortSceneAndRenderToCanvasProgram } = initData;
  const {
    positionLocation,
    texcoordLocation,
    textureLocation,
    sceneTexture,
    positionBuffer,
    texcoordBuffer,
    dudvMapUniformLocation,
    dudvMapTexture,
  } = preparedData;

  resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);

  // Tell WebGL how to convert from clip space to pixels
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.useProgram(distortSceneAndRenderToCanvasProgram);

  // remove bound framebuffer so it defaults to rendering to canvas
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);

  // Tell the shader to get the texture from texture unit 0
  gl.uniform1i(textureLocation, 0);
  // Tell the shader to get the texture from texture unit 1
  gl.uniform1i(dudvMapUniformLocation, 1);

  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, dudvMapTexture);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, sceneTexture);

  // Setup the attributes to pull data from our buffers
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
  gl.enableVertexAttribArray(texcoordLocation);
  gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);

  gl.clear(gl.COLOR_BUFFER_BIT);

  // Clear the canvas AND the depth buffer.
  gl.clearColor(1, 0.9804, 0.9216, 1);

  // draw the quad (2 triangles, 6 vertices)
  gl.drawArrays(gl.TRIANGLES, 0, 6);
};
