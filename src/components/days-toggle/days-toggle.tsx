import React, { FC } from "react";
import styles from "./index.module.scss";
import { classNames } from "@/utils/classNames";

type Props = {
  selectedDay: number;
  setSelectedDay: (number: number) => void;
  isCentered?: boolean;
  hasMargin?: boolean;
};

const DaysToggle: FC<Props> = ({ isCentered, setSelectedDay, selectedDay, hasMargin }) => {
  return (
    <div className={classNames(styles.days, isCentered && styles.isCentered, hasMargin &&  styles.hasMargin)}>
      {[1, 2].map((number, index) => (
        <div
          onClick={() => setSelectedDay(number)}
          key={index}
          className={
          classNames(
            styles.number,
            selectedDay === number && styles.isActive
          )
          }
        >
          Day {number}
        </div>
      ))}
    </div>
  );
};

export default DaysToggle;