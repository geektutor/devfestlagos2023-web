import React from "react";
import Image from "next/image";
import styles from "./rsvp-ticket.module.scss";
import CategoryPill from "../category-pill/category-pill";
import { TertiaryButton } from "../button";
import { Session } from "@/types/Session";

type RSVPTicketProps = {
  modalIsOpen?: boolean;
  onClose: () => void;
  session: Session;
};

const getDayText = (date: string) =>
  new Date(date).getDate() === 24 ? "24th November" : "25th November";

const RSVPTicket = ({ session }: RSVPTicketProps) => {
  const {
    category,
    title,
    sessionDate,
    availableSeats,
    scheduledAt,
    tagLine,
    owner,
    speakerImage,
  } = session;

  const backgroundColor = "#FFF";

  return (
    <>
      <div className={styles.ticket}>
        <div
          className={styles.speakerDetails}
          style={{
            backgroundColor: backgroundColor,
          }}
        >
          <div className={styles.speakerImage}>
            <Image className={styles.speakerImageInner} src={speakerImage} alt={owner} fill />
          </div>
          <div className={styles.speakerInfo}>
            <p className={styles.seeSession}>Tap to See Session</p>
            <h4 className={styles.speakerFullName}>{owner}</h4>
            <h4 className={styles.speakerCompany}>{tagLine}</h4>
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
                  availableSeats && availableSeats > 10
                    ? styles.seatCountOptimal
                    : styles.seatCountLow
                }`}
              >
                {availableSeats}
              </span>
            </span>
          </div>
          <p className={styles.talkTitle}>{title}</p>
          <div>
            <CategoryPill isSmall className={styles.talkDate}>
              {getDayText(sessionDate)}, {scheduledAt}
            </CategoryPill>
            <TertiaryButton className={styles.bookASeat}>Book a Seat</TertiaryButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default RSVPTicket;