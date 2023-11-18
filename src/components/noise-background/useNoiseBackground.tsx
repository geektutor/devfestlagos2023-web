import { useRef, useState } from "react";
import { initialise } from "./functions";

interface useNoiseBackgroundArgs {
  // The background color in rgb.
  backgroundColorRgba: { r: number; g: number; b: number };
}

const useNoiseBackground = ({ backgroundColorRgba }: useNoiseBackgroundArgs) => {
  const { r, g, b } = backgroundColorRgba;
  const colorInShaderForm = Float32Array.from([r / 255, g / 255, b / 255]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded] = useState(false);

  if (canvasRef.current) {
    initialise(canvasRef.current, colorInShaderForm).then((render) => render());
  }

  return {
    canvasRef,
    loaded,
  };
};
export default useNoiseBackground;
