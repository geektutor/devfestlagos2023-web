import React, { PropsWithChildren } from "react";
import styles from "./category-pill.module.scss";
import { classNames } from "@/utils/classNames";

type ICategoryPillProps = PropsWithChildren & {
  isActive?: boolean;
  activeBgColor?: string;
  activeTextColor?: string;
  className?: string;
  isSmall?: boolean;
  onClick?: () => void;
};

export default function CategoryPill({
  children,
  isActive,
  activeBgColor = "#FFFAEB",
  activeTextColor = "#1C1C1C",
  className,
  isSmall,
  onClick,
}: ICategoryPillProps) {
  const styleText = {
    "--active-bg-color": `${activeBgColor}`,
    "--active-text-color": `${activeTextColor}`,
  };

  return (
    <div
      onClick={onClick}
      className={classNames(
        styles.categoryPill,
        isActive && styles.active,
        isSmall && styles.isSmall,
        className,
        onClick && styles.isClickable,
      )}
      // @ts-ignore
      style={styleText}
    >
      {children}
    </div>
  );
}
