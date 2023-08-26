import classes from "./fisherman.module.scss";

import FishermanSvg from "./fisherman.svg";

const Fisherman: React.FC = () => (
  <div className={classes.container}>
    <div className={classes.fishermanWrapper}>
      <FishermanSvg />
    </div>
  </div>
);

export default Fisherman;
