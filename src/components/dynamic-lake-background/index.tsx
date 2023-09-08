import FishermanSvg from "./fisherman.svg";
import classes from "./dynamic-lake-background.module.scss";
import useDynamicLakeBackground from "./useDynamicLakeBackground";

const DynamicLakeBackground: React.FC = () => {
  const { canvasRef, fishermanWrapperRef } = useDynamicLakeBackground();
  return (
    <div className={classes.container}>
      <canvas className={classes.canvas} ref={canvasRef} />
      <div className={classes.fishermanIllustration} ref={fishermanWrapperRef}>
        <FishermanSvg />
      </div>
    </div>
  );
};

export default DynamicLakeBackground;
