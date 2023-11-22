import React, { FC, useMemo, useState } from "react";
import { classNames } from "@/utils/classNames";
import { Talk } from "@/components/homepage/talk/talk";
import styles from "./talks.module.scss";
import { PrimaryButton } from "@/components/button";
import ArrowRightDark from "@/images/arrow-right-dark-bg.svg";
import { Session } from "@/types/Session";
import { Speaker } from "@/types/Speaker";

type Props = {
  hasDayToggle?: boolean;
  sessions: Session[];
  disableAnimation?: boolean;
  speakers: Speaker[];
};

const MAX_VISIBLE_TALKS = 5;

export const Talks: FC<Props> = ({
  hasDayToggle = false,
  sessions,
  disableAnimation,
  speakers,
}) => {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);

  const croppedTalks = sessions
    .filter((session) => session.owner && session.sessionId && session.title)
    .slice(0, MAX_VISIBLE_TALKS);

  const validTalks = useMemo(() => {
    if (!hasDayToggle) return croppedTalks;

    return croppedTalks.filter((talk) => talk.day === activeDay);
  }, [activeDay, hasDayToggle, croppedTalks]);

  const getImageURL = (session: Session) => {
    const speaker = speakers.find((speaker) => speaker.name === session.owner);

    if (speaker) return speaker.avatar;

    return session.speakerImage;
  };

  return (
    <section
      className={classNames(styles.talks, disableAnimation && styles.disableAnimation)}
      data-section-delay='.6'
    >
      <canvas data-animate-canvas className={styles.talkCanvas} />
      <div className={styles.talksTop}>
        <div>
          <p
            className={styles.talksTitle}
            data-animate-sentences
            data-delay='.333'
            data-easing='TALKS'
          >
            Talks across all areas of tech
          </p>
          <p
            className={styles.talksDescription}
            data-animate-y-full
            data-add-span
            data-delay='.5'
            data-easing='TALKS'
          >
            There is something for everyone
          </p>
        </div>
        {hasDayToggle ? (
          <div className={classNames(styles.talksDayToggle, activeDay === 2 && styles.active)}>
            <span className={styles.talksDayLine} />
            <button
              className={classNames(styles.talksDay, activeDay === 1 && styles.active)}
              onClick={() => setActiveDay(1)}
            >
              Friday
            </button>
            <button
              className={classNames(styles.talksDay, activeDay === 2 && styles.active)}
              onClick={() => setActiveDay(2)}
            >
              Saturday
            </button>
          </div>
        ) : (
          <PrimaryButton
            className={styles.talksCtaButton}
            href='/schedule'
            data-animate-button
            data-delay='.25'
            data-hide-for-canvas
          >
            <span>View All Talks</span>
            <ArrowRightDark />
          </PrimaryButton>
        )}
      </div>
      <div className={styles.talksGrid}>
        {validTalks.map((session, index) => (
          <div key={index}>
            <Talk
              image={getImageURL(session)}
              session={session}
              key={index}
              animationDelay={index * 0.084}
            />
            {index < croppedTalks.length - 1 && (
              <hr className={styles.talksDivider} data-fade-in data-delay={0.084 * index} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
