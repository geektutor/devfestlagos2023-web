import React, { FC } from "react";
import Image from "next/image";
import styles from "./talk.module.scss";
import { TalkType } from "@/types/Talk";
import CategoryPill from "@/components/category-pill/category-pill";

type Props = {
  talk: TalkType;
  animationDelay?: number;
};

const getDayText = (day: 1 | 2) => (day === 1 ? "24th Novemeber" : "25th November");

export const Talk: FC<Props> = ({ talk, animationDelay = 0 }) => {
  return (
    <article className={styles.talk}>
      <div className={styles.portrait}>
        <Image
          src={talk.speaker.image}
          alt={talk.speaker.name}
          fill
          style={{ objectFit: "cover" }}
          data-fade-in
          data-delay={0.333 + animationDelay}
          data-animate-y='+20'
          data-easing='TALK_IMAGE'
        />
      </div>
      <div>
        <div
          className={styles.pills}
          data-animate-y-children-full
          data-easing='LANDING_TITLE'
          data-delay={0.333 + animationDelay}
        >
          <CategoryPill isSmall className={styles.category}>
            {talk.category}
          </CategoryPill>
          <CategoryPill activeBgColor='#FDE293' isActive isSmall>
            {getDayText(talk.speaker.day)}, {talk.date}
          </CategoryPill>
        </div>
        <p
          className={styles.title}
          data-animate-sentences
          data-easing='LANDING_TITLE'
          data-delay={0.417 + animationDelay}
        >
          {talk.title}
        </p>
        <div
          className={styles.footer}
          data-animate-y-children-full
          data-easing='LANDING_TITLE'
          data-delay={0.583 + animationDelay}
        >
          <span>{talk.speaker.name}</span>
          <span className={styles.ellipse}></span>
          <span>{talk.speaker.role}</span>
        </div>
      </div>
    </article>
  );
};
