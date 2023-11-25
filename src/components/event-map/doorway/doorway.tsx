import React, { FC } from "react";
import styles from "./doorway.module.scss";
import { classNames } from "@/utils/classNames";
import MapNode from "@/components/event-map/poi/mapNode";
import { LOCATIONS } from "@/utils/map";

type Props = {
  variant: "entrance" | "exit";
};

const Doorway: FC<Props> = ({ variant }) => {
  const className = classNames(
    styles.doorway,
    variant === "entrance" && styles.entrance,
    variant === "exit" && styles.exit,
  );

  return (
    <div className={className} data-room={variant === "exit" ? LOCATIONS.EXIT : LOCATIONS.ENTRANCE}>
      <span className={styles.text}>{variant === "entrance" ? "ENTRANCE" : "EXIT"}</span>
      <MapNode type='destination' variant='middle' />
    </div>
  );
};

export default Doorway;
