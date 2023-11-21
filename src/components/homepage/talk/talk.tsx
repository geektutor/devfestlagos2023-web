import React, { FC } from "react";
import Image from "next/image";
import styles from "./talk.module.scss";
import CategoryPill from "@/components/category-pill/category-pill";
import { Session } from "@/types/Session";

type Props = {
  animationDelay?: number;
  session: Session;
};

const getDayText = (day: 1 | 2) => (day === 1 ? "24th November" : "25th November");

export const Talk: FC<Props> = ({ animationDelay = 0, session }) => {
  return (
    <article className={styles.talk}>
      <div className={styles.portrait}>
        <Image
          src={session.speakerImage}
          alt={session.owner}
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
          <CategoryPill activeBgColor='#FDE293' isActive isSmall>
            {getDayText(session.day)}, {session.scheduledAt}
          </CategoryPill>
        </div>
        <p
          className={styles.title}
          data-animate-sentences
          data-easing='LANDING_TITLE'
          data-delay={0.417 + animationDelay}
        >
          {session.title}
        </p>
        <div
          className={styles.footer}
          data-animate-y-children-full
          data-easing='LANDING_TITLE'
          data-delay={0.583 + animationDelay}
        >
          <span>{session.owner}</span>
          {session.tagLine && (
            <>
              <span className={styles.ellipse}></span>
              <span>{session.tagLine}</span>
            </>
          )}
        </div>
      </div>
    </article>
  );
};
