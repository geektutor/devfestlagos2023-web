import FishermanSvg from "./fisherman.svg";
import classes from "./dynamic-lake-background.module.scss";
import useDynamicLakeBackground from "./useDynamicLakeBackground";

const DynamicLakeBackground: React.FC = () => {
  const { canvasRef, fishermanWrapperRef, loaded } = useDynamicLakeBackground();
  return (
    <div
      className={classes.container}
      style={{ transition: "opacity 0.5s", opacity: loaded ? 1 : 0 }}
    >
      <canvas className={classes.canvas} ref={canvasRef} />
      <div className={classes.fishermanIllustration} ref={fishermanWrapperRef}>
        <FishermanSvg />
      </div>
    </div>
  );
};

export default DynamicLakeBackground;
