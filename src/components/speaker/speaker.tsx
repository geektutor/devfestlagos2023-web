import Image from "next/image";
import React from "react";
import styles from "./speaker.module.scss";

interface SpeakerCardProps {
  imageSrc: string;
  fullname: string;
  role: string;
  company: string;
  backgroundColor?: string;
}

export default function SpeakerCard(props: SpeakerCardProps) {
  return (
    <div className={styles.speaker}>
      <div className={styles.speakerImage}>
        <Image
          className={styles.speakerImageInner}
          src={props.imageSrc}
          alt={props.fullname}
          fill
        />
      </div>
      <div
        className={styles.speakerTextContainer}
        style={{
          backgroundColor: props.backgroundColor,
        }}
      >
        <h3 className={styles.speakerFullName}>{props.fullname}</h3>
        <h4 className={styles.speakerCompany}>
          {props.role}, <span>{props.company}</span>
        </h4>
      </div>
    </div>
  );
}
