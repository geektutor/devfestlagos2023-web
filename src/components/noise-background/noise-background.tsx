import classes from "./noise-background.module.scss";
import useNoiseBackground from "./useNoiseBackground";

const NoiseBackground: React.FC = () => {
  const { canvasRef } = useNoiseBackground({
    colorRange: [
      { r: 0, g: 0, b: 0 },
      { r: 25.5, g: 25.5, b: 25.5 },
    ],
  });
  return <canvas ref={canvasRef} className={classes.container} />;
};

export default NoiseBackground;
