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

interface SpeakerCardProps {
  imageSrc: string;
  fullname: string;
  role: string;
  company: string;
  backgroundColor?: string;
}

export default function SpeakerCard({
  imageSrc,
  fullname,
  backgroundColor,
  role,
  company,
}: SpeakerCardProps) {
  const [portalWrapper, setPortalWrapper] = useState<Element | null>();

  useEffect(() => {
    setPortalWrapper(document.querySelector(".app-wrapper")!);
  }, []);

  const modalContent = (
    <div className={styles.modal}>
      <div className={styles.modalOverlay} />
      <div className={styles.modalContent}>
        <button className={styles.modalClose}>
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
            <Image src={imageSrc} alt={fullname} fill style={{ objectFit: "cover" }} />
          </div>
          <div>
            <h3 className={styles.modalSpeakerName}>{fullname}</h3>
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
          <span className={styles.modalCategory}>Product Design</span>
          <span className={styles.modalDay}>Friday, 2:00 PM</span>
        </div>
        <h3 className={styles.modalTitle}>The importance of research and giving designers time</h3>
        <p className={styles.modalDescription}>
          With more than 10 years of design experience under my belt, I’ve been fortunate enough to
          work alongside a bunch of passionate people from around the world, always with a single
          goal in mind: To create awesome interactive experiences. Over the last couple of years,
          many of my projects have been featured on sites like Awwwards, Webby Awards, Applied Art
          and FWA.
        </p>
        <div className={styles.modalButtons}>
          <SecondaryButton>
            <ArrowLeft />
            <span>Previous Speaker</span>
          </SecondaryButton>
          <PrimaryButton className={styles.modalNextButton}>
            <span>Next Speaker</span>
            <ArrowRight />
          </PrimaryButton>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className={styles.speaker}>
        <div className={styles.speakerImage}>
          <Image className={styles.speakerImageInner} src={imageSrc} alt={fullname} fill />
        </div>
        <div
          className={styles.speakerTextContainer}
          style={{
            backgroundColor: backgroundColor,
          }}
        >
          <h4 className={styles.speakerFullName}>{fullname}</h4>
          <p className={styles.speakerCompany}>
            {role}, <span>{company}</span>
          </p>
        </div>
      </div>
      {portalWrapper && createPortal(modalContent, portalWrapper)}
    </>
  );
}
