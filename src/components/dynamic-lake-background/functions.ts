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
  const waterDuDvMap = await loadImage("/404-images/water-dudv-map.png");
  const firstFour = await loadImage("/404-images/first-four.png");
  const zero = await loadImage("/404-images/zero.png");
  const secondFour = await loadImage("/404-images/second-four.png");
  const rightHandOarShadow = await loadImage("/404-images/right-hand-oar-shadow.png");
  const leftHandOarShadow = await loadImage("/404-images/left-hand-oar-shadow.png");
  const stalkClover = await loadImage("/404-images/stalk-clover.png");
  const clover = await loadImage("/404-images/clover.png");
  const leftOarRipple = await loadImage("/404-images/left-oar-ripple.png");
  const rightOarRipple = await loadImage("/404-images/right-oar-ripple.png");

  return {
    boatShadowImage,
    bigWaveImage,
    smallWaveImage,
    waterDuDvMap,
    firstFour,
    zero,
    secondFour,
    rightHandOarShadow,
    leftHandOarShadow,
    stalkClover,
    clover,
    leftOarRipple,
    rightOarRipple,
  };
};

export const initialise = async (canvas: HTMLCanvasElement, fishermanWrapper: HTMLDivElement) => {
  resizeCanvasToDisplaySize(canvas);

  const gl = canvas.getContext("webgl");

  if (!gl) throw new Error("Failed to inistialise WebGL");

  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.clearColor(1, 0.9804, 0.9216, 1);

  gl.enable(gl.BLEND);

  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

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

  const dpr = window.devicePixelRatio;

  gl.useProgram(renderSceneToTextureProgram);

  const projectionUniformLocation = gl.getUniformLocation(
    renderSceneToTextureProgram,
    "u_canvasProjectionMatrix",
  );

  // look up where the vertex data needs to go.
  const rttPositionLocation = gl.getAttribLocation(renderSceneToTextureProgram, "a_position");
  const rttTexcoordLocation = gl.getAttribLocation(renderSceneToTextureProgram, "a_texcoord");

  // lookup uniforms
  const rttMatrixLocation = gl.getUniformLocation(renderSceneToTextureProgram, "u_matrix");
  const rttTextureLocation = gl.getUniformLocation(renderSceneToTextureProgram, "u_texture");

  // Create a buffer.
  const rttPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, rttPositionBuffer);

  // Put a unit quad in the buffer
  const rttPositions = [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(rttPositions), gl.STATIC_DRAW);

  // Create a buffer for texture coords
  const rttTexcoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, rttTexcoordBuffer);

  // Put texcoords in the buffer
  const rttTexcoords = [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(rttTexcoords), gl.STATIC_DRAW);

  type StaticTextureKeys = Exclude<keyof typeof assets, "waterDuDvMap">;

  const textures = Object.entries(assets).reduce(
    (acc, [textureName, image]) => {
      if (textureName !== "waterDuDvMap") {
        acc[textureName as StaticTextureKeys] = convertAssetToTexture(gl, image);
      }

      return acc;
    },
    {} as Record<StaticTextureKeys, WebGLTexture>,
  );

  const frameBuffer = gl.createFramebuffer();

  // This function renders to texture
  const renderSceneToTexture = () => {
    resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);

    gl.useProgram(renderSceneToTextureProgram);
    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // prettier-ignore
    const projectionMatrix = [
    2 / gl.canvas.width, 0, 0,
    0, (-2 / gl.canvas.height), 0,
    -1, 1, 1
  ];

    gl.uniformMatrix3fv(projectionUniformLocation, false, projectionMatrix);

    const { clientHeight, clientWidth, offsetTop, offsetLeft } = fishermanWrapper;
    const xOffset = offsetLeft * dpr;
    const yOffset = offsetTop * dpr;

    const boatHeight = clientHeight * dpr; // I multiple by 0.78 because the actual bot is 78% the height of the bounding box

    const boatWidth = clientWidth * 0.42 * dpr;

    /* NOTE: The following translations and scaling used on each item can be hardcoded into a single matrix
    and then multiplied by the projection in shader. However, this is much easier to,
    read, debug and understand. An example of what it could look like is:

    | boatWidth  0            0 |
    | 1          boatHeight   0 |
    | x          y            1 |
    
    Read more here:
    https://webglfundamentals.org/webgl/lessons/webgl-2d-matrices.html
  */
    /* NOTE: When getting dimensions to translate by, I do a lot of multiplication by boatWidth/boatHeight in order to make things relative
 to the boat height and width defined in CSS */
    const staticAssets = [
      {
        texture: textures.bigWaveImage,
        matrix: (() => {
          const waveWidth = 1.83 * boatWidth;
          const waveHeight = 1.9 * boatHeight;

          let matrix = identity();
          matrix = translate(matrix, xOffset + boatWidth * 0.4, gl.canvas.height - waveHeight);
          matrix = scale(matrix, waveWidth, waveHeight);
          return matrix;
        })(),
      },
      {
        texture: textures.smallWaveImage,
        matrix: (() => {
          const waveWidth = boatWidth * 1.05;
          const waveHeight = 0.75 * boatHeight;

          let matrix = identity();
          matrix = translate(matrix, xOffset + 0.815 * boatWidth, gl.canvas.height - waveHeight);
          matrix = scale(matrix, waveWidth, waveHeight);
          return matrix;
        })(),
      },

      {
        texture: textures.boatShadowImage,
        matrix: (() => {
          let matrix = identity();
          matrix = translate(matrix, xOffset + 0.75 * boatWidth, yOffset + 0.04 * boatHeight);
          matrix = scale(matrix, boatWidth + 0.03 * boatWidth, boatHeight);
          return matrix;
        })(),
      },

      {
        texture: textures.firstFour,
        matrix: (() => {
          let matrix = identity();

          matrix = translate(
            matrix,
            Math.max(gl.canvas.width * 0.1, 100),
            gl.canvas.height - gl.canvas.height * 0.4,
          );
          matrix = scale(
            matrix,
            Math.max(gl.canvas.width * 0.06, 160),
            Math.max(gl.canvas.width * 0.07, 180),
          );
          return matrix;
        })(),
      },

      {
        texture: textures.zero,
        matrix: (() => {
          let matrix = identity();

          matrix = translate(
            matrix,
            Math.max(gl.canvas.width * 0.2, 250),
            gl.canvas.height - gl.canvas.height * 0.5,
          );
          matrix = scale(
            matrix,
            Math.max(gl.canvas.width * 0.06, 160),
            Math.max(gl.canvas.width * 0.07, 180),
          );
          return matrix;
        })(),
      },
      {
        texture: textures.secondFour,
        matrix: (() => {
          let matrix = identity();

          matrix = translate(
            matrix,
            Math.max(gl.canvas.width * 0.3, 600),
            gl.canvas.height - gl.canvas.height * 0.4,
          );

          matrix = scale(
            matrix,
            Math.max(gl.canvas.width * 0.06, 160),
            Math.max(gl.canvas.width * 0.07, 180),
          );

          return matrix;
        })(),
      },
      {
        texture: textures.rightHandOarShadow,
        matrix: (() => {
          let matrix = identity();

          const oarWidth = boatWidth;
          const oarHeight = 0.038 * boatHeight;

          matrix = translate(matrix, xOffset + 0.07 * boatWidth, yOffset + boatHeight / 1.85);

          matrix = scale(matrix, oarWidth, oarHeight);

          return matrix;
        })(),
      },
      {
        texture: textures.leftHandOarShadow,
        matrix: (() => {
          let matrix = identity();

          const oarWidth = boatWidth;
          const oarHeight = 0.1 * boatHeight;

          matrix = translate(matrix, xOffset + 1.43 * boatWidth, yOffset + boatHeight / 1.73);

          matrix = scale(matrix, oarWidth, oarHeight);

          return matrix;
        })(),
      },
      {
        texture: textures.stalkClover,
        matrix: (() => {
          let matrix = identity();

          matrix = translate(matrix, xOffset + 2.5 * boatWidth, yOffset);

          matrix = scale(matrix, 65, 80);

          return matrix;
        })(),
      },
      {
        texture: textures.clover,
        matrix: (() => {
          let matrix = identity();

          matrix = translate(matrix, xOffset + 4 * boatWidth, yOffset * 1.5);

          matrix = scale(matrix, 65, 65);

          return matrix;
        })(),
      },
      {
        texture: textures.leftOarRipple,
        matrix: (() => {
          let matrix = identity();

          matrix = translate(matrix, xOffset + 2.18 * boatWidth, yOffset + boatHeight * 0.55);

          const rippleHeight = 0.2 * boatHeight;
          matrix = scale(matrix, rippleHeight, rippleHeight);

          return matrix;
        })(),
      },
      {
        texture: textures.rightOarRipple,
        matrix: (() => {
          let matrix = identity();

          matrix = translate(matrix, xOffset - 0.2 * boatWidth, yOffset * 1.38);

          const rippleHeight = 0.2 * boatHeight;
          matrix = scale(matrix, rippleHeight, rippleHeight);

          return matrix;
        })(),
      },
    ];

    const targetTexture = createTextureToRenderTo(gl);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);

    const attachmentPoint = gl.COLOR_ATTACHMENT0;
    gl.framebufferTexture2D(gl.FRAMEBUFFER, attachmentPoint, gl.TEXTURE_2D, targetTexture, 0);

    staticAssets.forEach(({ texture, matrix }) => {
      gl.bindTexture(gl.TEXTURE_2D, texture);

      gl.useProgram(renderSceneToTextureProgram);

      // Setup the attributes to pull data from our buffers
      gl.bindBuffer(gl.ARRAY_BUFFER, rttPositionBuffer);
      gl.enableVertexAttribArray(rttPositionLocation);
      gl.vertexAttribPointer(rttPositionLocation, 2, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, rttTexcoordBuffer);
      gl.enableVertexAttribArray(rttTexcoordLocation);
      gl.vertexAttribPointer(rttTexcoordLocation, 2, gl.FLOAT, false, 0, 0);

      // Set the matrix.
      gl.uniformMatrix3fv(rttMatrixLocation, false, matrix);

      // Tell the shader to get the texture from texture unit 0
      gl.uniform1i(rttTextureLocation, 0);

      // draw the quad (2 triangles, 6 vertices)
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    });

    return targetTexture;
  };

  gl.useProgram(distortSceneAndRenderToCanvasProgram);

  const rtcProjectionUniformLocation = gl.getUniformLocation(
    distortSceneAndRenderToCanvasProgram,
    "u_canvasProjectionMatrix",
  );

  const textureProjectionUniformLocation = gl.getUniformLocation(
    distortSceneAndRenderToCanvasProgram,
    "u_textureProjectionMatrix",
  );

  const moveFactorUniform = gl.getUniformLocation(
    distortSceneAndRenderToCanvasProgram,
    "moveFactor",
  );

  // gl.uniform1f(moveFactorUniform, moveFactor);

  // look up where the vertex data needs to go.
  const rtcPositionLocation = gl.getAttribLocation(
    distortSceneAndRenderToCanvasProgram,
    "a_position",
  );
  const rtcTexcoordLocation = gl.getAttribLocation(
    distortSceneAndRenderToCanvasProgram,
    "a_texcoord",
  );

  // lookup uniforms
  const rtcTextureLocation = gl.getUniformLocation(
    distortSceneAndRenderToCanvasProgram,
    "u_texture",
  );
  const dudvMapUniformLocation = gl.getUniformLocation(
    distortSceneAndRenderToCanvasProgram,
    "u_dudvMap",
  );

  const dudvMapTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, dudvMapTexture);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, assets.waterDuDvMap);

  // Create a buffer.
  const rtcPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, rtcPositionBuffer);

  setQuadVertices(gl);

  // Create a buffer for texture coords
  const rtcTexcoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, rtcTexcoordBuffer);

  setQuadVertices(gl);

  const render = (moveFactor: number) => {
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Clear the canvas AND the depth buffer.
    gl.clearColor(1, 0.9804, 0.9216, 1);

    const sceneTexture = renderSceneToTexture();
    resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.useProgram(distortSceneAndRenderToCanvasProgram);

    // prettier-ignore
    const projectionMatrix = [
          2 / gl.canvas.width, 0, 0,
          0, (-2 / gl.canvas.height), 0,
          -1, 1, 1
        ];

    gl.uniformMatrix3fv(rtcProjectionUniformLocation, false, projectionMatrix);

    // prettier-ignore
    const textureProjectionMatrix = [
      1 / canvas.width, 0, 0,
      0, (-1 / canvas.height), 0,
      0, 1, 1
    ];

    gl.uniformMatrix3fv(textureProjectionUniformLocation, false, textureProjectionMatrix);

    gl.uniform1f(moveFactorUniform, moveFactor);

    // remove bound framebuffer so it defaults to rendering to canvas
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    // Tell the shader to get the texture from texture unit 0
    gl.uniform1i(rtcTextureLocation, 0);
    // Tell the shader to get the texture from texture unit 1
    gl.uniform1i(dudvMapUniformLocation, 1);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, dudvMapTexture);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, sceneTexture);

    // Setup the attributes to pull data from our buffers
    gl.bindBuffer(gl.ARRAY_BUFFER, rtcPositionBuffer);
    gl.enableVertexAttribArray(rtcPositionLocation);
    gl.vertexAttribPointer(rtcPositionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, rtcTexcoordBuffer);
    gl.enableVertexAttribArray(rtcTexcoordLocation);
    gl.vertexAttribPointer(rtcTexcoordLocation, 2, gl.FLOAT, false, 0, 0);

    gl.clear(gl.COLOR_BUFFER_BIT);

    // Clear the canvas AND the depth buffer.
    gl.clearColor(1, 0.9804, 0.9216, 1);

    // draw the quad (2 triangles, 6 vertices)
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    gl.deleteTexture(sceneTexture);
  };

  return render;
};
