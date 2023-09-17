import { useEffect, useRef, useState } from "react";
import { initialise } from "./functions";

export const WAVE_SPEED = 0.03;

const useDynamicLakeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fishermanWrapperRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const prevTimestamp = useRef(0);
  const moveFactor = useRef(0);

  useEffect(() => {
    if (canvasRef.current && fishermanWrapperRef.current) {
      initialise(canvasRef.current, fishermanWrapperRef.current).then((render) => {
        setLoaded(true);
        prevTimestamp.current = Date.now();

        const draw = () => {
          const timeNow = Date.now();
          const timePassed = timeNow - prevTimestamp.current;

          moveFactor.current += WAVE_SPEED * (timePassed / 1000);

          // Loop to zero when it gets to 1
          moveFactor.current %= 1;

          prevTimestamp.current = timeNow;

          render(moveFactor.current);

          requestAnimationFrame(draw);
        };

        requestAnimationFrame(draw);
      });
    }
  }, []);

  return {
    canvasRef,
    fishermanWrapperRef,
    loaded,
  };
};

export default useDynamicLakeBackground;
