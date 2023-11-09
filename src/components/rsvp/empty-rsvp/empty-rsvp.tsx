import styles from "./empty-rsvp.module.scss";
import emptyImage from "@/images/empty-rsvp.png";
import Image from "next/image";
import { PrimaryButton } from "@/components/button";
import ArrowRightDark from "@/images/arrow-right-bg-light.svg";
import React, { FC } from "react";

type Props = {
  onClick: () => void;
};

export const EmptyRsvp: FC<Props> = ({ onClick }) => {
  return (
    <div className={styles.emptyRSVP}>
      <Image src={emptyImage} alt='Empty RSVP' className={styles.image} />
      <h2 className={styles.title}>
        You currently haven’t booked any session for this day. Simply RSVP to a session and it’ll
        pop up here.
      </h2>
      <PrimaryButton onClick={onClick} icon={<ArrowRightDark />}>
        Book a session
      </PrimaryButton>
    </div>
  );
};
