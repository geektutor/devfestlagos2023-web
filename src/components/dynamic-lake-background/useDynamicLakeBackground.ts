import { useCallback, useEffect, useRef, useState } from "react";
import {
  renderSceneToTexture,
  prepareRenderSceneToTexture,
  initialise,
  prepareRenderSceneToCanvas,
  renderDistortedSceneToCanvas,
} from "./functions";

export const WAVE_SPEED = 0.03;

const useDynamicLakeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fishermanWrapperRef = useRef<HTMLDivElement>(null);
  const [initData, setInitData] = useState<Awaited<ReturnType<typeof initialise>> | null>(null);
  const prevTimestamp = useRef(0);
  const moveFactor = useRef(0);

  const render = useCallback(() => {
    if (initData && fishermanWrapperRef.current) {
      const renderToTextureData = prepareRenderSceneToTexture(
        fishermanWrapperRef.current,
        initData,
      );
      const texture = renderSceneToTexture(initData, renderToTextureData);

      const renderToCanvasData = prepareRenderSceneToCanvas(texture, initData, moveFactor.current);

      renderDistortedSceneToCanvas(initData, renderToCanvasData);
    }
  }, [initData]);

  useEffect(() => {
    if (canvasRef.current && fishermanWrapperRef.current) {
      initialise(canvasRef.current).then(setInitData);
    }
  }, []);

  useEffect(() => {
    prevTimestamp.current = Date.now();

    const draw = () => {
      const timeNow = Date.now();
      const timePassed = timeNow - prevTimestamp.current;

      moveFactor.current += WAVE_SPEED * (timePassed / 1000);

      // Loop to zero when it gets to 1
      moveFactor.current %= 1;

      prevTimestamp.current = timeNow;

      render();
      requestAnimationFrame(draw);
    };

    if (initData) {
      const animationFrame = requestAnimationFrame(draw);

      return () => {
        cancelAnimationFrame(animationFrame);
        prevTimestamp.current = 0;
        moveFactor.current = 0;
      };
    }
  }, [initData, render]);

  return {
    canvasRef,
    fishermanWrapperRef,
  };
};

export default useDynamicLakeBackground;
