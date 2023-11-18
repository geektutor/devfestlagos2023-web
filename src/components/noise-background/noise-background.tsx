import classes from "./noise-background.module.scss";
import useNoiseBackground from "./useNoiseBackground";

const NoiseBackground: React.FC = () => {
  const { canvasRef } = useNoiseBackground({ backgroundColorRgba: { r: 5, g: 5, b: 5 } });
  return <canvas ref={canvasRef} className={classes.container} />;
};

export default NoiseBackground;
