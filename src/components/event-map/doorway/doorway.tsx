import React, { FC } from "react";
import styles from "./doorway.module.scss";
import { classNames } from "@/utils/classNames";
import MapNode from "@/components/event-map/poi/mapNode";

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
    <div className={className}>
      <span className={styles.text}>{variant === "entrance" ? "ENTRANCE" : "EXIT"}</span>
      <MapNode type='destination' variant='middle' />
    </div>
  );
};

export default Doorway;
