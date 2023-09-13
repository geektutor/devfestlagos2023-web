import React from "react";
import styles from "./category-pill.module.scss";
import { classNames } from "@/utils/classNames";

interface ICategoryPillProps {
  text: string;
  isActive: boolean;
  activeBgColor?: string;
  activeTextColor?: string;
}

export default function CategoryPill({
  text,
  isActive,
  activeBgColor = "#FFFAEB",
  activeTextColor = "#1C1C1C",
}: ICategoryPillProps) {
  const styleText = {
    "--active-bg-color": `${activeBgColor}`,
    "--active-text-color": `${activeTextColor}`,
  };

  // @ts-ignore
  return (
    <div className={classNames(styles.categoryPill, isActive && styles.active)} style={styleText}>
      {text}
    </div>
  );
}
