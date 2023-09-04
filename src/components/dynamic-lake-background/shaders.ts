export const DRAW_IMAGE_VERTEX_SHADER = `
    attribute vec2 a_position;
    attribute vec2 a_texcoord;
    
    uniform mat3 u_matrix;
    
    varying vec2 v_texcoord;

    void main() {
        gl_Position = vec4(u_matrix * vec3(a_position, 1), 1);
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
