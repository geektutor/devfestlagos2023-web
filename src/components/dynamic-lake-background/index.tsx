import FishermanSvg from "./fisherman.svg";
import classes from "./dynamic-lake-background.module.scss";
import useDynamicLakeBackground from "./useDynamicLakeBackground";

const DynamicLakeBackground: React.FC = () => {
  const { canvasRef, fishermanWrapperRef } = useDynamicLakeBackground();
  return (
    <div className={classes.container}>
      <div className={classes.fishermanIllustration} ref={fishermanWrapperRef}>
        <FishermanSvg />
      </div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default DynamicLakeBackground;
