/* eslint-disable */
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./speaker.module.scss";
import CloseCircle from "@/images/close-circle.svg";
import topImage from "@/images/speaker/top-image.png";
import topImageMobile from "@/images/speaker/top-image-mobile.png";
import ArrowRight from "@/images/arrow-right-bg-light.svg";
import ArrowLeft from "@/images/arrow-left-dark.svg";
// import { PrimaryButton, SecondaryButton } from "@/components/button";
// import { PrimaryButton, SecondaryButton } from "@/components/button";
import { classNames } from "@/utils/classNames";
import CategoryPill from "@/components/category-pill/category-pill";
import { Speaker } from "@/types/Speaker";
import { Session } from "@/types/Session";
// import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

interface SpeakerCardProps {
  modalIsOpen?: boolean;
  onClose: () => void;
  onClickButton: (direction: "next" | "previous") => void;
  hasNext: boolean;
  hasPrevious: boolean;
  onClick: () => void;
  speaker: Speaker;
  session: Session | undefined;
  className?: string;
}

const getDayText = (date: string) => (new Date(date).getDay() === 24 ? "Friday" : "Saturday");

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

export default function SpeakerCard({
  speaker,
  onClick,
  modalIsOpen,
  onClose,
  onClickButton,
  hasNext,
  hasPrevious,
  session,
  className,
}: SpeakerCardProps) {
  const [portalWrapper, setPortalWrapper] = useState<Element | null>();

  //generate random color
  const backgroundColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];

  const { name, role, avatar } = speaker;
  useEffect(() => {
    setPortalWrapper(document.querySelector(".app-wrapper")!);
  }, []);

  const modalContent = (
    <div className={classNames(styles.modal, modalIsOpen && styles.active)}>
      <div className={styles.modalOverlay} onClick={onClose} />
      <div className={styles.modalContent}>
        <button className={styles.modalClose} onClick={onClose}>
          <CloseCircle />
        </button>
        <figure className={styles.modalImage}>
          <Image src={topImage} alt='Modal image' fill />
        </figure>
        <figure className={styles.modalMobileImage}>
          <Image src={topImageMobile} alt='Modal image' fill />
        </figure>
        <div className={styles.modalDetails}>
          <div className={styles.modalSpeakerImage}>
            <Image src={avatar} alt={name} fill style={{ objectFit: "cover" }} />
          </div>
          <div>
            <h3 className={styles.modalSpeakerName}>{name}</h3>
            <p className={styles.modalSpeakerCredits}>{role}</p>
            {/*<p className={styles.modalLinksHeader}>LINKS</p>*/}
            {/*<div className={styles.modalLinks}>*/}
            {/*  <a className={styles.modalLink}>*/}
            {/*    <TwitterIcon />*/}
            {/*  </a>*/}
            {/*  <a className={styles.modalLink}>*/}
            {/*    <LinkedinIcon />*/}
            {/*  </a>*/}
            {/*  <a className={styles.modalLink}>*/}
            {/*    <WebsiteIcon />*/}
            {/*  </a>*/}
            {/*</div>*/}
          </div>
        </div>
        <div className={styles.modalTags}>
          {session && (
            <CategoryPill isSmall isActive activeBgColor='#34a853' activeTextColor='#FFF'>
              {getDayText(session.sessionDate)}, {session.scheduledAt || speaker.scheduledAt}
            </CategoryPill>
          )}
        </div>
        <h3 className={styles.modalTitle}>{session?.title}</h3>
        {/*<div className={styles.modalButtons}>*/}
        {/*  {hasPrevious && (*/}
        {/*    <span className='c-button c-button--secondary c-button--primary'>*/}
        {/*      <ArrowLeft />*/}
        {/*      <span>Previous Speaker</span>*/}
        {/*    </span>*/}
        {/*  )}*/}
        {/*  {hasNext && (*/}
        {/*    <span className={"c-button c-button--primary"}>*/}
        {/*      <span>Next Speaker</span>*/}
        {/*      <ArrowRight />*/}
        {/*    </span>*/}
        {/*  )}*/}
        {/*</div>*/}
      </div>
    </div>
  );

  return (
    <>
      <div className={classNames(styles.speaker, className)} onClick={onClick}>
        <div className={styles.speakerImage}>
          <Image
            className={styles.speakerImageInner}
            onError={(e) => (e.currentTarget.src = "/user.png")}
            src={avatar}
            alt={name}
            fill
          />
        </div>
        <div
          className={styles.speakerTextContainer}
          style={{
            backgroundColor: backgroundColor,
          }}
        >
          <h4 className={styles.speakerFullName}>{name}</h4>
          <p className={styles.speakerCompany}>{role}</p>
        </div>
      </div>
      {modalContent}
    </>
  );
}
