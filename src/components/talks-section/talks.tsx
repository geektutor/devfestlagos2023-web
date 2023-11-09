import React, { FC, useMemo, useState } from "react";
import { classNames } from "@/utils/classNames";
import { Talk } from "@/components/homepage/talk/talk";
import { talks } from "@/mock-data";
import styles from "./talks.module.scss";
import { PrimaryButton } from "@/components/button";
import ArrowRightDark from "@/images/arrow-right-dark-bg.svg";
import CategoryPill from "@/components/category-pill/category-pill";
import { Session } from "@/types/Session";

type Props = {
  hasDayToggle?: boolean;
  sessions: Session[];
  disableAnimation?: boolean;
};

const MAX_VISIBLE_TALKS = 5;

export const Talks: FC<Props> = ({ hasDayToggle = false, sessions, disableAnimation }) => {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);

  const croppedTalks = sessions.slice(0, MAX_VISIBLE_TALKS);

  const talkCategories = ["All Talks"].concat(
    Array.from(new Set(croppedTalks.map((talk) => talk.category))),
  );
  const [activeCategory, setActiveCategory] = useState<string>(talkCategories[0]);

  const validTalks = useMemo(() => {
    let categoryTalks;
    if (activeCategory === "All Talks") {
      categoryTalks = croppedTalks;
    } else {
      categoryTalks = croppedTalks.filter((talk) => talk.category === activeCategory).slice(0, 3);
    }

    if (!hasDayToggle) return categoryTalks;

    return categoryTalks.filter((talk) => talk.day === activeDay);
  }, [activeCategory, activeDay, hasDayToggle, croppedTalks]);

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
      <div className={styles.talksTags}>
        {talkCategories.map((category, index) => (
          <div key={category} style={{ position: "relative", overflow: "hidden", flexShrink: "0" }}>
            <CategoryPill
              className={classNames(
                styles.talksTag,
                activeCategory === category && styles.talksTagActive,
              )}
              isActive={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              data-animate-y-full
              data-easing='SPONSOR_BETTER'
              data-delay={0.667 + 0.084 * index}
            >
              {category}
            </CategoryPill>
          </div>
        ))}
      </div>
      <div className={styles.talksGrid}>
        {validTalks.map((talk, index) => (
          <div key={index}>
            <Talk session={talk} key={index} animationDelay={index * 0.084} />
            {index < talks.length - 1 && (
              <hr className={styles.talksDivider} data-fade-in data-delay={0.084 * index} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
