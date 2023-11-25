import React from "react";
import { classNames } from "@/utils/classNames";
import styles from "./styles.module.scss";

type Props = {
  type: "door" | "destination";
  variant:
    | "bottomMiddle"
    | "middle"
    | "bottomRight"
    | "bottomLeft"
    | "middleLeft"
    | "topMiddle"
    | "room2"
    | "hallway"
    | "room3Left"
    | "room3Right";
};

const MapNode = ({ type, variant }: Props) => {
  const className = classNames(
    styles.poi,
    type === "door" && styles.door,
    type === "destination" && styles.destination,
    type === "destination" && styles.destination,
    variant === "bottomMiddle" && styles.bottomMiddle,
    variant === "middle" && styles.middle,
    variant === "bottomRight" && styles.bottomRight,
    variant === "bottomLeft" && styles.bottomLeft,
    variant === "middleLeft" && styles.middleLeft,
    variant === "topMiddle" && styles.topMiddle,
    variant === "room2" && styles.room2,
    variant === "hallway" && styles.hallway,
    variant === "room3Left" && styles.room3Left,
    variant === "room3Right" && styles.room3Right,
  );

  return <span className={className} data-node={type} />;
};

export default MapNode;
