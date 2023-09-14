import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./speaker.module.scss";
import CloseCircle from "@/images/close-circle.svg";
import topImage from "@/images/speaker/top-image.png";
import topImageMobile from "@/images/speaker/top-image-mobile.png";
import TwitterIcon from "@/images/speaker/twitter.svg";
import LinkedinIcon from "@/images/speaker/linkedin.svg";
import WebsiteIcon from "@/images/speaker/website.svg";
import ArrowRight from "@/images/arrow-right-bg-light.svg";
import ArrowLeft from "@/images/arrow-left-dark.svg";
import { PrimaryButton, SecondaryButton } from "@/components/button";
import { createPortal } from "react-dom";
import { classNames } from "@/utils/classNames";
import { Speaker } from "@/types/Speaker";
import CategoryPill from "@/components/category-pill/category-pill";

interface SpeakerCardProps {
  modalIsOpen?: boolean;
  onClose: () => void;
  onClickButton: (direction: "next" | "previous") => void;
  hasNext: boolean;
  hasPrevious: boolean;
  onClick: () => void;
  speaker: Speaker;
}

const getDayText = (day: 1 | 2) => (day === 1 ? "24th Novemeber" : "25th November");

export default function SpeakerCard({
  speaker,
  onClick,
  modalIsOpen,
  onClose,
  onClickButton,
  hasNext,
  hasPrevious,
}: SpeakerCardProps) {
  const [portalWrapper, setPortalWrapper] = useState<Element | null>();

  const { name, image, role, company, backgroundColor } = speaker;
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
            <Image src={image} alt={name} fill style={{ objectFit: "cover" }} />
          </div>
          <div>
            <h3 className={styles.modalSpeakerName}>{name}</h3>
            <p className={styles.modalSpeakerCredits}>
              {role}, {company}
            </p>
            <p className={styles.modalLinksHeader}>LINKS</p>
            <div className={styles.modalLinks}>
              <a className={styles.modalLink}>
                <TwitterIcon />
              </a>
              <a className={styles.modalLink}>
                <LinkedinIcon />
              </a>
              <a className={styles.modalLink}>
                <WebsiteIcon />
              </a>
            </div>
          </div>
        </div>
        <div className={styles.modalTags}>
          <CategoryPill className={styles.modalCategory} isSmall>
            {speaker.talk.category}
          </CategoryPill>
          <CategoryPill isSmall isActive activeBgColor='#34a853' activeTextColor='#FFF'>
            {getDayText(speaker.day)}, {speaker.talk.date}
          </CategoryPill>
        </div>
        <h3 className={styles.modalTitle}>{speaker.talk.title}</h3>
        <p className={styles.modalDescription}>{speaker.talk.description}</p>
        <div className={styles.modalButtons}>
          {hasPrevious && (
            <SecondaryButton onClick={() => onClickButton("previous")}>
              <ArrowLeft />
              <span>Previous Speaker</span>
            </SecondaryButton>
          )}
          {hasNext && (
            <PrimaryButton className={styles.modalNextButton} onClick={() => onClickButton("next")}>
              <span>Next Speaker</span>
              <ArrowRight />
            </PrimaryButton>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className={styles.speaker} onClick={onClick}>
        <div className={styles.speakerImage}>
          <Image className={styles.speakerImageInner} src={image} alt={name} fill />
        </div>
        <div
          className={styles.speakerTextContainer}
          style={{
            backgroundColor: backgroundColor,
          }}
        >
          <h4 className={styles.speakerFullName}>{name}</h4>
          <p className={styles.speakerCompany}>
            {role}, <span>{company}</span>
          </p>
        </div>
      </div>
      {portalWrapper && createPortal(modalContent, portalWrapper)}
    </>
  );
}
