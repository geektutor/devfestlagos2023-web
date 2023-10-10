import Image from "next/image";
import styles from "./rsvp-ticket-details.module.scss";
import Alarm from "@/images/alarm.svg";
import Error from "@/images/error.svg";
import HourGlass from "@/images/hourglass.svg";
import Group from "@/images/group.svg";
import Location from "@/images/pin-drop.svg";
import CloseCircle from "@/images/close-circle.svg";
import CategoryPill from "@/components/category-pill/category-pill";
import { TertiaryButton } from "@/components/button";
import { TalkType } from "@/types/Talk";
import { classNames } from "@/utils/classNames";

type RSVPTicketDetailsProps = {
  modalIsOpen?: boolean;
  onClose: () => void;
  talk: TalkType;
};

const getDayText = (day: 1 | 2) => (day === 1 ? "24th November" : "25th November");

const RSVPTicketDetails = ({ talk, modalIsOpen, onClose }: RSVPTicketDetailsProps) => {
  const {
    title,
    date,
    description,
    seatCount,
    timeLeft,
    hall,
    speaker: { name, company, day, role, image },
  } = talk;
  return (
    <div className={classNames(styles.modal, modalIsOpen && styles.active)}>
      <div className={styles.modalOverlay} onClick={onClose} />
      <div className={styles.modalContent}>
        <div className={styles.topButtons}>
          <div className={styles.timeAndSeatCount}>
            <CategoryPill className={styles.time}>
              <HourGlass />
              <span>{timeLeft}m</span>
            </CategoryPill>
            <CategoryPill className={styles.seatCount}>
              <Group />
              <span>{`${seatCount} Seats Left`}</span>
            </CategoryPill>
          </div>
          <div className={styles.modalClose}>
            <CloseCircle />
          </div>
        </div>
        <h1 className={styles.talkTitle}>{title}</h1>
        <p className={styles.speakerHeading}>Speaker</p>
        <div className={styles.speakerSection}>
          <div className={styles.speakerImage}>
            <Image className={styles.speakerImageInner} src={image} alt={name} fill />
          </div>
          <CategoryPill isSmall className={styles.speakerButton}>
            See Speaker Page
          </CategoryPill>
        </div>
        <h3 className={styles.speakerName}>{name}</h3>
        <p className={styles.speakerRole}>
          {role}, {company}
        </p>
        <div className={styles.talkDateAndLocation}>
          <CategoryPill className={styles.talkDate}>
            <Alarm />
            <span>
              {getDayText(day)}, <strong>{date}</strong>
            </span>
          </CategoryPill>
          <CategoryPill className={styles.location}>
            <Location />
            <span>{`Hall ${hall}`}</span>
          </CategoryPill>
        </div>
        <div className={styles.descriptionSection}>
          <h3 className={styles.descriptionHeading}>DESCRIPTION</h3>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.finalCTA}>
          <span>
            <Error />
          </span>
          <span>Save your spot for this talk by booking a seat for this talk!</span>
        </div>

        <TertiaryButton className={styles.bookASeat}>Book a Seat</TertiaryButton>
      </div>
    </div>
  );
};

export default RSVPTicketDetails;
