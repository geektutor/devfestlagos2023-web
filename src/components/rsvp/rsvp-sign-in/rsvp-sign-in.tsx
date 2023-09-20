import React from // useState
"react";
import Image from "next/image";
import Emoji from "@/images/sign-in-emoji.png";
import Arrow from "@/images/downward-arroww.png";
import styles from "./rsvp-sign-in.module.scss";
import CloseCircle from "@/images/close-circle.svg";
import { SecondaryButton, TertiaryButton } from "@/components/button";
import { classNames } from "@/utils/classNames";

type RSVPSignInProps = {
  onClose: () => void;
  modalIsOpen?: boolean;
};
const RSVPSignIn = ({ onClose, modalIsOpen }: RSVPSignInProps) => {
  // const [email, setEmail] = useState('');
  // const [ticketNumber, setTicketNumber] = useState('');
  // const [emailError, setEmailError] = useState('');
  // const [ticketNumberError, setTicketNumberError] = useState('');

  return (
    <div className={classNames(styles.modal, modalIsOpen && styles.active)}>
      <div className={styles.modalOverlay} onClick={onClose} />
      <div className={styles.modalContent}>
        <button className={styles.modalClose} onClick={onClose}>
          <CloseCircle />
        </button>
        <div className={styles.modalDecorativeAssets}>
          <div className={styles.modalEmojiContainer}>
            <div className={styles.modalEmojiWrapper}>
              <Image className={styles.modalImageInner} src={Emoji} alt='A hijabi emoticon' />
            </div>
          </div>
          <div className={styles.modalArrowWrapper}>
            <Image
              className={styles.modalArrowInner}
              src={Arrow}
              alt='A downward-curved arrow'
              fill
            />
          </div>
        </div>
        <h2 className={styles.modalHeading}>We need your email to save you a spot</h2>
        <p className={styles.modalDescription}>
          Confirm your registration to RSVP and book a seat in your favourite sessions.
        </p>
        <form className={styles.modalFormContainer} onSubmit={() => {}}>
          <div className={styles.modalInputContainer}>
            <input
              type='text'
              id='email'
              placeholder=' '
              aria-placeholder='email input field'
              className={styles.modalInput}
              onChange={() => {}}
            />
            <label htmlFor='email' className={styles.modalInputLabel}>
              Enter Email
            </label>
          </div>
          <div className={styles.modalInputContainer}>
            <input
              type='text'
              id='ticket'
              placeholder=' '
              aria-placeholder='ticket number input field'
              className={styles.modalInput}
              onChange={() => {}}
            />
            <label htmlFor='ticket' className={styles.modalInputLabel}>
              Enter Ticket Number
            </label>
            <div className={styles.modalFormInfo}>
              The Ticket No. is sent to your email when you register
            </div>
          </div>
          <TertiaryButton className={styles.modalProceed}>Proceed</TertiaryButton>
          <SecondaryButton onClick={() => {}} className={styles.modalRegister}>
            Don’t have a ticket? 👉🏽 Register
          </SecondaryButton>
        </form>
      </div>
    </div>
  );
};

export default RSVPSignIn;
