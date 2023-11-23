import React, { FC } from "react";
import { classNames } from "@/utils/classNames";
import { RSVP_TABS } from "@/pages/rsvp";
import { firebaseAuth } from "@/firebase/app";
import styles from "./styles.module.scss";

type Props = {
  onHide: () => void;
  isMenuOpen: boolean;
  onClickMenu: (tab: string) => () => void;
  isFadeDown?: boolean;
};

const Controls: FC<Props> = ({ onHide, isMenuOpen, onClickMenu, isFadeDown }) => {
  const onClickSignOut = () => {
    firebaseAuth.signOut();
    onHide();
  };

  return (
    <div
      className={classNames(
        styles.controls,
        isMenuOpen && styles.isActive,
        isFadeDown && styles.isFadeDown,
      )}
    >
      <button className={styles.button} onClick={onClickMenu(RSVP_TABS.GENERAL)}>
        All Sessions
      </button>
      <button className={styles.button} onClick={onClickMenu(RSVP_TABS.BOOKMARKS)}>
        Booked Sessions
      </button>
      <button className={classNames(styles.button, styles.signOut)} onClick={onClickSignOut}>
        Sign Out
      </button>
    </div>
  );
};

export default Controls;
