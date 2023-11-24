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
    | "room2";
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
  );

  return <span className={className} data-node={variant} />;
};

export default MapNode;
