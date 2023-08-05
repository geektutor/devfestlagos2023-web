import { useEffect, useRef } from "react";
export const useEffectOnce = (effect: () => void) => {
  const hasCalledEffect = useRef(false);

  useEffect(() => {
    if (!hasCalledEffect.current) {
      effect();
      hasCalledEffect.current = true;
    }
  }, []);
};
