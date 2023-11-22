import Image from "next/image";
import styles from "./rsvp-ticket-details.module.scss";
import Alarm from "@/images/alarm.svg";
import Error from "@/images/error.svg";
import HourGlass from "@/images/hourglass.svg";
import Group from "@/images/group.svg";
import Location from "@/images/pin-drop.svg";
import CloseCircle from "@/images/close-circle.svg";
import CategoryPill from "@/components/category-pill/category-pill";
import { classNames } from "@/utils/classNames";
import { Session } from "@/types/Session";
import React, { useEffect } from "react";
import RsvpButton from "@/components/rsvp/rsvp-button/rsvp-button";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

type RSVPTicketDetailsProps = {
  modalIsOpen?: boolean;
  onClose: () => void;
  session: Session | null;
  onSelectTicket: () => void;
  isSelected: boolean;
  isSecured?: boolean;
  onRemoveSession: () => void;
  speakerImage: string;
};

const getDayText = (date: string) =>
  new Date(date).getDate() === 24 ? "24th November" : "25th November";

const RSVPTicketDetails = ({
  modalIsOpen,
  onClose,
  session,
  isSelected,
  onSelectTicket,
  isSecured,
  onRemoveSession,
  speakerImage,
}: RSVPTicketDetailsProps) => {
  const timeLeft = "30"; //todo: Actually calculate this using the scheduledAt and sessionDate

  useEffect(() => {
    if (modalIsOpen) disableBodyScroll(document.body);
    else enableBodyScroll(document.body);
  }, [modalIsOpen]);

  const renderContent = () => {
    if (!session) return null;

    const { title, sessionDate, availableSeats, scheduledAt, tagLine, owner, hall } = session;

    return (
      <>
        <div className={styles.topButtons}>
          <div className={styles.timeAndSeatCount}>
            <CategoryPill className={styles.time}>
              <HourGlass />
              <span>{timeLeft}m</span>
            </CategoryPill>
            <CategoryPill className={styles.seatCount}>
              <Group />
              <span>{`${availableSeats} Seats Left`}</span>
            </CategoryPill>
          </div>
          <button className={styles.modalClose} onClick={onClose}>
            <CloseCircle />
          </button>
        </div>
        <h1 className={styles.talkTitle}>{title}</h1>
        <p className={styles.speakerHeading}>Speaker</p>
        <div className={styles.speakerSection}>
          <div className={styles.speakerImage}>
            <Image className={styles.speakerImageInner} src={speakerImage} alt={owner} fill />
          </div>
          <h3 className={styles.speakerName}>{owner}</h3>
        </div>
        <p className={styles.speakerRole}>{tagLine}</p>
        <div className={styles.talkDateAndLocation}>
          <CategoryPill className={styles.talkDate}>
            <Alarm />
            <span>
              {getDayText(sessionDate)}, <strong>{scheduledAt}</strong>
            </span>
          </CategoryPill>
          <CategoryPill className={styles.location}>
            <Location />
            <span>{hall}</span>
          </CategoryPill>
        </div>
        <div className={styles.finalCTA}>
          <span>
            <Error />
          </span>
          <span>Save your spot for this talk by booking a seat for this talk!</span>
        </div>

        <RsvpButton
          isSelected={isSelected}
          onSelectTicket={onSelectTicket}
          isSecured={isSecured}
          onRemoveSession={onRemoveSession}
          isFullWidth
          session={session}
        />
      </>
    );
  };

  return (
    <div className={classNames(styles.modal, modalIsOpen && styles.active)}>
      <div className={styles.modalOverlay} onClick={onClose} />
      <div className={styles.modalContent}>{renderContent()}</div>
    </div>
  );
};

export default RSVPTicketDetails;
