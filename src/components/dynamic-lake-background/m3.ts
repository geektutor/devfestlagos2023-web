// The code in is a slightly modified and trimmed version of https://webglfundamentals.org/webgl/resources/m3.js

const MatType = Float32Array;

/**
 * Creates a 2D translation matrix
 * @param {number} tx amount to translate in x
 * @param {number} ty amount to translate in y
 * @return {module:webgl-2d-math.Matrix3} a translation matrix that translates by tx and ty.
 * @memberOf module:webgl-2d-math
 */
const translation = (tx: number, ty: number) => {
  const dst = new MatType(9);

  dst[0] = 1;
  dst[1] = 0;
  dst[2] = 0;
  dst[3] = 0;
  dst[4] = 1;
  dst[5] = 0;
  dst[6] = tx;
  dst[7] = ty;
  dst[8] = 1;

  return dst;
};

/**
 * Takes two Matrix3s, a and b, and computes the product in the order
 * that pre-composes b with a.  In other words, the matrix returned will
 * @param {module:webgl-2d-math.Matrix3} a A matrix.
 * @param {module:webgl-2d-math.Matrix3} b A matrix.
 * @return {module:webgl-2d-math.Matrix3} the result.
 * @memberOf module:webgl-2d-math
 */
const multiply = (a: Float32Array, b: Float32Array) => {
  const dst = new MatType(9);
  const a00 = a[0 * 3 + 0];
  const a01 = a[0 * 3 + 1];
  const a02 = a[0 * 3 + 2];
  const a10 = a[1 * 3 + 0];
  const a11 = a[1 * 3 + 1];
  const a12 = a[1 * 3 + 2];
  const a20 = a[2 * 3 + 0];
  const a21 = a[2 * 3 + 1];
  const a22 = a[2 * 3 + 2];
  const b00 = b[0 * 3 + 0];
  const b01 = b[0 * 3 + 1];
  const b02 = b[0 * 3 + 2];
  const b10 = b[1 * 3 + 0];
  const b11 = b[1 * 3 + 1];
  const b12 = b[1 * 3 + 2];
  const b20 = b[2 * 3 + 0];
  const b21 = b[2 * 3 + 1];
  const b22 = b[2 * 3 + 2];

  dst[0] = b00 * a00 + b01 * a10 + b02 * a20;
  dst[1] = b00 * a01 + b01 * a11 + b02 * a21;
  dst[2] = b00 * a02 + b01 * a12 + b02 * a22;
  dst[3] = b10 * a00 + b11 * a10 + b12 * a20;
  dst[4] = b10 * a01 + b11 * a11 + b12 * a21;
  dst[5] = b10 * a02 + b11 * a12 + b12 * a22;
  dst[6] = b20 * a00 + b21 * a10 + b22 * a20;
  dst[7] = b20 * a01 + b21 * a11 + b22 * a21;
  dst[8] = b20 * a02 + b21 * a12 + b22 * a22;

  return dst;
};

/**
 * Multiplies by a 2D translation matrix
 * @param {module:webgl-2d-math.Matrix3} the matrix to be multiplied
 * @param {number} tx amount to translate in x
 * @param {number} ty amount to translate in y
 * @return {module:webgl-2d-math.Matrix3} the result
 * @memberOf module:webgl-2d-math
 */
export const translate = (m: Float32Array, tx: number, ty: number) => {
  return multiply(m, translation(tx, ty));
};

/**
 * Creates a 2D scaling matrix
 * @param {number} sx amount to scale in x
 * @param {number} sy amount to scale in y
 * @return {module:webgl-2d-math.Matrix3} a scale matrix that scales by sx and sy.
 * @memberOf module:webgl-2d-math
 */
const scaling = (sx: number, sy: number) => {
  const dst = new MatType(9);

  dst[0] = sx;
  dst[1] = 0;
  dst[2] = 0;
  dst[3] = 0;
  dst[4] = sy;
  dst[5] = 0;
  dst[6] = 0;
  dst[7] = 0;
  dst[8] = 1;

  return dst;
};

/**
 * Multiplies by a 2D scaling matrix
 * @param {module:webgl-2d-math.Matrix3} the matrix to be multiplied
 * @param {number} sx amount to scale in x
 * @param {number} sy amount to scale in y
 * @return {module:webgl-2d-math.Matrix3} the result
 * @memberOf module:webgl-2d-math
 */
export const scale = (m: Float32Array, sx: number, sy: number) => {
  return multiply(m, scaling(sx, sy));
};

/**
 * Creates a 2D projection matrix
 * @param {number} width width in pixels
 * @param {number} height height in pixels
 * @return {module:webgl-2d-math.Matrix3} a projection matrix that converts from pixels to clipspace with Y = 0 at the top.
 * @memberOf module:webgl-2d-math
 */
const projection = (m: Float32Array, width: number, height: number) => {
  const dst = new MatType(9);
  // Note: This matrix flips the Y axis so 0 is at the top.

  dst[0] = 2 / width;
  dst[1] = 0;
  dst[2] = 0;
  dst[3] = 0;
  dst[4] = -2 / height;
  dst[5] = 0;
  dst[6] = -1;
  dst[7] = 1;
  dst[8] = 1;

  return dst;
};

/**
 * @param {number} width width in pixels
 * @param {number} height height in pixels
 * @return {module:webgl-2d-math.Matrix3} the result
 * @memberOf module:webgl-2d-math
 */
export const project = (m: Float32Array, width: number, height: number) => {
  return projection(m, width, height);
};
