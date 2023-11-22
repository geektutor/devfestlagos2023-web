export const NOISE_VERTEX_SHADER = `
    attribute vec2 a_position;
    uniform mat3 u_projectionMatrix;

    void main() {
        vec3 position = u_projectionMatrix * vec3(a_position, 1.0);
        gl_Position = vec4(position.xyz, 1.0);
  
    }
`;

export const NOISE_FRAGMENT_SHADER = `
    precision mediump float;

    uniform vec3 u_color1;
    uniform vec3 u_color2;
    uniform vec2 u_resolution;

    float rand(vec2 co){
        return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
        vec2 val = gl_FragCoord.xy / u_resolution.xy;

        val *= 10.0;

        vec3 color = vec3(mix(
            u_color1,
            u_color2,
            rand(val)
        ));

        gl_FragColor = vec4(color, 1.0);
    }
`;
