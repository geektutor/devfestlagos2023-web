import React from "react";
import Image from "next/image";
import styles from "./rsvp-ticket.module.scss";
import CategoryPill from "../category-pill/category-pill";
import { TertiaryButton } from "../button";
import { Session } from "@/types/Session";
import StarIcon from "@/images/star.svg";
import { classNames } from "@/utils/classNames";
import { useMutation } from "react-query";
import { removeRSVP } from "@/requests/rsvp";
import { firebaseAuth } from "@/firebase/app";

type RSVPTicketProps = {
  onClick: () => void;
  session: Session;
  onSelectTicket: () => void;
  isSelected: boolean;
  isSecured?: boolean;
  onRemoveSession: () => void;
};

const getDayText = (date: string) =>
  new Date(date).getDate() === 24 ? "24th November" : "25th November";

const RSVPTicket = ({
  session,
  onClick,
  isSelected,
  onSelectTicket,
  isSecured,
  onRemoveSession,
}: RSVPTicketProps) => {
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

  const removeRSVPMutation = useMutation({
    mutationFn: async () => {
      const user = firebaseAuth.currentUser;

      if (!user) return;

      const token = await user.getIdToken();

      return removeRSVP({
        sessionId: session.sessionId,
        token: token,
      });
    },
    onSuccess: () => {
      onRemoveSession();
    },
  });

  const onClickAction = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    if (isSecured) {
      removeRSVPMutation.mutate();
    } else {
      onSelectTicket();
    }
  };

  const renderButton = () => {
    const isBlueButton = isSelected || isSecured;

    let buttonText;

    if (isSecured) {
      buttonText = "Session Secured";
    } else if (isSelected) {
      buttonText = "Seat Booked";
    } else {
      buttonText = "Book a Seat";
    }

    return (
      <TertiaryButton
        className={classNames(
          styles.bookASeat,
          !isBlueButton && styles.notSelected,
          isSecured && styles.secured,
        )}
        onClick={onClickAction}
        isDisabled={removeRSVPMutation.isLoading}
        icon={
          isBlueButton ? (
            <div className={styles.bookASeatIcon}>
              <StarIcon />
            </div>
          ) : undefined
        }
      >
        <span className={styles.normalText}>{buttonText}</span>
        {isSecured && <span className={styles.hoverText}>Remove Session</span>}
      </TertiaryButton>
    );
  };

  return (
    <div className={styles.ticket} onClick={onClick}>
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
          {renderButton()}
        </div>
      </div>
    </div>
  );
};

export default RSVPTicket;
