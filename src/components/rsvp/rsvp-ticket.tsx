import React from "react";
import Image from "next/image";
import styles from "./rsvp-ticket.module.scss";
import CategoryPill from "../category-pill/category-pill";
import { TertiaryButton } from "../button";
import { TalkType } from "@/types/Talk";

type RSVPTicketProps = {
  talk: TalkType;
};

const getDayText = (day: 1 | 2) => (day === 1 ? "24th November" : "25th November");

const RSVPTicket = ({ talk }: RSVPTicketProps) => {
  const {
    category,
    title,
    date,
    seatCount,
    speaker: { name, company, day, role, image, backgroundColor },
  } = talk;

  return (
    <div className={styles.ticket}>
      <div
        className={styles.speakerDetails}
        style={{
          backgroundColor: backgroundColor,
        }}
      >
        <div className={styles.speakerImage}>
          <Image className={styles.speakerImageInner} src={image} alt={name} fill />
        </div>
        <div className={styles.speakerInfo}>
          <p className={styles.seeSession}>Tap to See Session</p>
          <h4 className={styles.speakerFullName}>{name}</h4>
          <h4 className={styles.speakerCompany}>
            {role}, <span>{company}</span>
          </h4>
        </div>
      </div>
      <div className={styles.ticketDivider} style={{ backgroundColor: backgroundColor }}>
        &nbsp;
      </div>
      <div className={styles.talkDetails}>
        <div className={styles.talkCategoryAndAvailability}>
          <CategoryPill className={styles.talkCategory} isSmall>
            {category}
          </CategoryPill>
          <span className={styles.talkAvailability}>
            Seats:{" "}
            <span
              className={`${
                seatCount && seatCount > 10 ? styles.seatCountOptimal : styles.seatCountLow
              }`}
            >
              {seatCount}
            </span>
          </span>
        </div>
        <p className={styles.talkTitle}>{title}</p>
        <div>
          <CategoryPill isSmall className={styles.talkDate}>
            {getDayText(day)}, {date}
          </CategoryPill>
          <TertiaryButton className={styles.bookASeat}>Book a Seat</TertiaryButton>
        </div>
      </div>
    </div>
  );
};

export default RSVPTicket;
