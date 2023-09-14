export const DRAW_IMAGE_VERTEX_SHADER = `
    attribute vec2 a_position;
    attribute vec2 a_texcoord;
    
    uniform mat3 u_matrix;
    uniform mat3 u_canvasProjectionMatrix;
    
    varying vec2 v_texcoord;

    void main() {
        gl_Position = vec4(u_canvasProjectionMatrix * u_matrix * vec3(a_position, 1), 1);
        v_texcoord = a_texcoord;
    }
`;

export const DRAW_IMAGE_FRAGMENT_SHADER = `
    precision mediump float;
 
    varying vec2 v_texcoord;
    
    uniform sampler2D u_texture;
    
    void main() {
        gl_FragColor = texture2D(u_texture, v_texcoord);
    }
`;

export const DRAW_DISTORTED_TEXTURE_VERTEX_SHADER = `
    attribute vec2 a_position;
    attribute vec2 a_texcoord;

    uniform mat3 u_canvasProjectionMatrix;
    uniform mat3 u_textureProjectionMatrix;

    varying vec2 v_texcoord;

    void main() {
        gl_Position = vec4(u_canvasProjectionMatrix * vec3(a_position, 1), 1);
        v_texcoord = (u_textureProjectionMatrix * vec3(a_texcoord, 1)).xy;
    }
`;

export const DRAW_DISTORTED_TEXTURE_FRAGMENT_SHADER = `
    precision mediump float;
    
    varying vec2 v_texcoord;

    uniform sampler2D u_texture;
    uniform sampler2D u_dudMap;

    void main() {
        gl_FragColor = texture2D(u_texture, v_texcoord);
    }
`;
