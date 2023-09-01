import { useEffect, useRef } from "react";
import { initImageLayerDraw, initWebGL } from "./functions";

const useDynamicLakeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fishermanWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      if (canvasRef.current && fishermanWrapperRef.current) {
        // render boat shadow and big wave shadow to a texture
        // render that texture to the canvas
        const { gl, drawImageProgram } = await initWebGL(canvasRef.current);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const imageLayerDrawData = await initImageLayerDraw(gl, drawImageProgram);
      }
    })();
  }, []);

  return {
    canvasRef,
    fishermanWrapperRef,
  };
};

export default useDynamicLakeBackground;
