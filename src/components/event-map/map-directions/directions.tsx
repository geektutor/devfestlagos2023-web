import { DirectionText } from "@/utils/map";
import styles from "./styles.module.scss";
import ArrowLeft from "@/images/map/arrow-left.svg";
import DirectionArrow from "@/images/map/arrow.svg";
import PinIcon from "@/images/map/pin.svg";
import RightIcon from "@/images/map/right.svg";
import ArrivedIcon from "@/images/map/arrived.svg";
import StairsUpIcon from "@/images/map/stairs-up.svg";
import TurnRightIcon from "@/images/map/turn-right.svg";
import TurnLeftIcon from "@/images/map/turn-left.svg";
import StairsDownIcon from "@/images/map/stairs-down.svg";
import { FC } from "react";

type Props = {
  directions: DirectionText[];
  start: string | null;
  end: string | null;
  onClickBack: () => void;
};

const Directions: FC<Props> = ({ onClickBack, directions, start, end }) => {
  const renderIcon = (direction: DirectionText) => {
    switch (direction.icon) {
      case "arrow": {
        return <DirectionArrow style={{ rotate: `${direction.angle}deg` }} />;
      }

      case "arrived": {
        return <ArrivedIcon />;
      }

      case "stairs-down": {
        return <StairsDownIcon />;
      }

      case "stairs-up": {
        return <StairsUpIcon />;
      }

      case "left": {
        return <TurnLeftIcon />;
      }

      case "right": {
        return <TurnRightIcon />;
      }
    }
  };
  return (
    <div className={styles.directions}>
      <button className={styles.backButton} onClick={onClickBack}>
        <ArrowLeft />
      </button>
      <h3 className={styles.directionsTitle}>Directions</h3>
      <div className={styles.directionsBox}>
        <PinIcon width='24px' height='24px' />
        {start}
        <RightIcon />
        <PinIcon width='24px' height='24px' />
        {end}
      </div>
      {directions.map((direction, index) => (
        <div className={styles.directionItem} key={index}>
          {renderIcon(direction)}
          <p className={styles.directionItemText}>{direction.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Directions;
