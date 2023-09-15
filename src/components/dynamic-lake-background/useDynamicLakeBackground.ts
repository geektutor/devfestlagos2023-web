import { useCallback, useEffect, useRef, useState } from "react";
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
  const [initData, setInitData] = useState<Awaited<ReturnType<typeof initialise>> | null>(null);

  const render = useCallback(() => {
    if (initData && fishermanWrapperRef.current) {
      const renderToTextureData = prepareRenderSceneToTexture(
        fishermanWrapperRef.current,
        initData,
      );
      const texture = renderSceneToTexture(initData, renderToTextureData);

      const renderToCanvasData = prepareRenderSceneToCanvas(texture, initData);

      renderDistortedSceneToCanvas(initData, renderToCanvasData);
    }
  }, [initData]);

  useEffect(() => {
    if (canvasRef.current && fishermanWrapperRef.current) {
      initialise(canvasRef.current).then(setInitData);
    }
  }, []);

  useEffect(() => {
    const draw = () => {
      render();
      requestAnimationFrame(draw);
    };

    if (initData) {
      const animationFrame = requestAnimationFrame(draw);

      return () => {
        cancelAnimationFrame(animationFrame);
      };
    }
  }, [initData, render]);

  return {
    canvasRef,
    fishermanWrapperRef,
  };
};

export default useDynamicLakeBackground;
