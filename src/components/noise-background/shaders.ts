export const NOISE_VERTEX_SHADER = `
    attribute vec2 a_position;
    uniform mat3 projectionMatrix;

    void main() {
        gl_Position = vec4(projectionMatrix * a_position, 0, 1);
    }
`;

export const NOISE_FRAGMENT_SHADER = `
    precision mediump float;

    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`;
