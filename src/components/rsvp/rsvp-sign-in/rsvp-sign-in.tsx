import React, { useState } from "react";
import Image from "next/image";
import Emoji from "@/images/sign-in-emoji.png";
import Arrow from "@/images/downward-arroww.png";
import styles from "./rsvp-sign-in.module.scss";
import CloseCircle from "@/images/close-circle.svg";
import { SecondaryButton, TertiaryButton } from "@/components/button";
import { classNames } from "@/utils/classNames";
import { ticketsUrl } from "@/utils/urls";
import { firebaseAuth } from "@/firebase/app";
import firebase from "firebase/compat/app";

type RSVPSignInProps = {
  onClose: () => void;
  modalIsOpen?: boolean;
  onLogin: (user: firebase.User) => void;
};

const RSVPSignIn = ({ onClose, modalIsOpen, onLogin }: RSVPSignInProps) => {
  const [email, setEmail] = useState<string>("");
  const [ticketNumber, setTicketNumber] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [ticketNumberError, setTicketNumberError] = useState<string>("");
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Not sure what validation for ticket number is yet, but insert here.

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    if (value.trim() === "") {
      setEmailError("Your email address is required");
    } else if (!validateEmail(value)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const handleTicketBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    if (value.trim() === "") {
      setTicketNumberError("Your ticket number is required");
    } else {
      setTicketNumberError("");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    if (value.trim() === "") {
      setEmailError("Your email address is required");
    } else if (!validateEmail(value)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const handleTicketNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTicketNumber(value);
    if (value.trim() === "") {
      setTicketNumberError("Your ticket number is required");
    } else {
      setTicketNumberError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailError || ticketNumberError) {
      return;
    }

    setIsLoggingIn(true);

    try {
      await firebaseAuth.signInWithEmailAndPassword(email, ticketNumber);

      setIsLoggingIn(false);

      if (firebaseAuth.currentUser) {
        onLogin(firebaseAuth.currentUser);
      }
    } catch (e) {
      console.error(e);
      // Todo: Handle errors bleh
    }
  };

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
        <form className={styles.modalFormContainer} onSubmit={handleSubmit}>
          <div className={classNames(styles.modalInputContainer, emailError && styles.error)}>
            <input
              type='text'
              id='email'
              name='email'
              value={email}
              placeholder='&#20;'
              aria-placeholder='email input field'
              className={styles.modalInput}
              onBlur={handleEmailBlur}
              onChange={handleEmailChange}
            />
            <label htmlFor='email' className={styles.modalInputLabel}>
              Enter Email
            </label>
            {emailError && <span className={styles.errorMessage}>{emailError}</span>}
          </div>

          <div
            className={classNames(styles.modalInputContainer, ticketNumberError && styles.error)}
          >
            <input
              type='text'
              id='ticket'
              name='ticket'
              value={ticketNumber}
              placeholder='&#20;'
              aria-placeholder='ticket number input field'
              className={styles.modalInput}
              onBlur={handleTicketBlur}
              onChange={handleTicketNumberChange}
            />
            <label htmlFor='ticket' className={styles.modalInputLabel}>
              Enter Ticket Number
            </label>
            {ticketNumberError && <span className={styles.errorMessage}>{ticketNumberError}</span>}
            <div className={styles.modalFormInfo}>
              The Ticket No. is sent to your email when you register
            </div>
          </div>
          <TertiaryButton isDisabled={isLoggingIn} className={styles.modalProceed} type='submit'>
            {isLoggingIn ? "Logging in..." : "Proceed"}
          </TertiaryButton>
          <SecondaryButton
            isDisabled={isLoggingIn}
            isExternal
            href={ticketsUrl}
            className={styles.modalRegister}
          >
            Don’t have a ticket? 👉🏽 Register
          </SecondaryButton>
        </form>
      </div>
    </div>
  );
};

export default RSVPSignIn;
