import React from "react";
import Image from "next/image";
import styles from "./rsvp-ticket.module.scss";
import CategoryPill from "../category-pill/category-pill";
import { Session } from "@/types/Session";
import RsvpButton from "@/components/rsvp/rsvp-button/rsvp-button";
import { classNames } from "@/utils/classNames";

type RSVPTicketProps = {
  onClick: () => void;
  session: Session;
  onSelectTicket: () => void;
  isSelected: boolean;
  isSecured?: boolean;
  onRemoveSession: () => void;
  isLoading?: boolean;
  image: string;
};

const backgroundColors = [
  "#F6EEEE",
  "#EEF3F6",
  "#FFF1CC",
  "#EDCCFF",
  "#F6EEEE",
  "#F6FEEE",
  "#EEF4F6",
  "#FFF2CC",
  "#EDCDFF",
  "#F6EDEE",
];

const getDayText = (date: string) =>
  new Date(date).getDate() === 24 ? "24th November" : "25th November";

const RSVPTicket = ({
  session,
  onClick,
  isSelected,
  onSelectTicket,
  isSecured,
  onRemoveSession,
  isLoading,
  image,
}: RSVPTicketProps) => {
  const { title, sessionDate, availableSeats, scheduledAt, tagLine, owner } = session;

  //generate random color
  const backgroundColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];

  return (
    <div className={classNames(styles.ticket, isLoading && styles.isLoading)} onClick={onClick}>
      <div
        className={styles.speakerDetails}
        style={{
          backgroundColor: backgroundColor,
        }}
      >
        <div className={styles.speakerImage}>
          <Image
            className={styles.speakerImageInner}
            src={image}
            alt={owner}
            fill
            onError={(e) => (e.currentTarget.src = "/user.png")}
          />
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
          <RsvpButton
            isSelected={isSelected}
            onSelectTicket={onSelectTicket}
            isSecured={isSecured}
            onRemoveSession={onRemoveSession}
            session={session}
          />
        </div>
      </div>
    </div>
  );
};

export default RSVPTicket;
