import { useEffect, useRef } from "react";
import {
  renderSceneToTexture,
  prepareRenderSceneToTexture,
  initialise,
  prepareRenderSceneToCanvas,
  renderDistortedSceneToCanvas,
} from "./functions";

const useDynamicLakeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fishermanWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      if (canvasRef.current && fishermanWrapperRef.current) {
        const initData = await initialise(canvasRef.current);

        const renderToTextureData = prepareRenderSceneToTexture(
          fishermanWrapperRef.current,
          initData,
        );
        const texture = renderSceneToTexture(initData, renderToTextureData);

        const renderToCanvasData = prepareRenderSceneToCanvas(texture, initData);

        renderDistortedSceneToCanvas(initData, renderToCanvasData);
      }
    })();
  }, []);

  return {
    canvasRef,
    fishermanWrapperRef,
  };
};

export default useDynamicLakeBackground;
