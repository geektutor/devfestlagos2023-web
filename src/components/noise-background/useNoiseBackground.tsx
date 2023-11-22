import { useRef, useState } from "react";
import { initialise } from "./functions";

type NoiseBackgroundColor = { r: number; g: number; b: number };

export interface UseNoiseBackgroundArgs {
  // The background color in rgb.
  colorRange: NoiseBackgroundColor[];
}

const useNoiseBackground = ({ colorRange }: UseNoiseBackgroundArgs) => {
  const [color1, color2] = colorRange;
  const color1InShaderForm = Float32Array.from([color1.r / 255, color1.g / 255, color1.b / 255]);
  const color2InShaderForm = Float32Array.from([color2.r / 255, color2.g / 255, color2.b / 255]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded] = useState(false);

  if (canvasRef.current) {
    initialise(canvasRef.current, color1InShaderForm, color2InShaderForm).then((render) =>
      render(),
    );
  }

  return {
    canvasRef,
    loaded,
  };
};
export default useNoiseBackground;
