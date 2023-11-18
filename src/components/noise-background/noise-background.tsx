import classes from "./noise-background.module.scss";
import useNoiseBackground, { UseNoiseBackgroundArgs } from "./useNoiseBackground";

interface Props {
  colorRange: UseNoiseBackgroundArgs["colorRange"];
}

const NoiseBackground: React.FC<Props> = ({ colorRange }) => {
  const { canvasRef } = useNoiseBackground({
    colorRange,
  });
  return <canvas ref={canvasRef} className={classes.container} />;
};

export default NoiseBackground;
