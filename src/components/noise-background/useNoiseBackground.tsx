import { useRef, useState } from "react";
import { initialise } from "./functions.js";

interface useNoiseBackgroundArgs {
  // The background color in hexadecimal. Example #ff00ff
  backgroundColorRgba: { r: number; g: number; b: number; a?: number };
}

const useNoiseBackground = ({
  backgroundColorRgba = { r: 5, g: 5, b: 5, a: 1 },
}: useNoiseBackgroundArgs) => {
  const { r, g, b, a } = backgroundColorRgba;
  const colorInShaderForm = Float32Array.from([r / 255, g, 255, b / 255, a || 1]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded] = useState(false);

  if (canvasRef.current) {
    initialise(canvasRef.current, colorInShaderForm);
  }

  return {
    canvasRef,
    loaded,
  };
};
export default useNoiseBackground;
