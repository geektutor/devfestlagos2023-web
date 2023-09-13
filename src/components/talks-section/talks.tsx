import React, { FC, useMemo, useState } from "react";
import { classNames } from "@/utils/classNames";
import { Talk } from "@/components/homepage/talk/talk";
import { talks } from "@/mock-data";
import styles from "./talks.module.scss";

const talkCategories = ["All Talks", "Design", "Blockchain", "Mobile Development"] as const;

type Category = (typeof talkCategories)[number];

type Props = {
  hasDayToggle?: boolean;
};

export const Talks: FC<Props> = ({ hasDayToggle = false }) => {
  const [activeCategory, setActiveCategory] = useState<Category>(talkCategories[0]);
  const [activeDay, setActiveDay] = useState<1 | 2>(1);

  const validTalks = useMemo(() => {
    let categoryTalks;
    if (activeCategory === "All Talks") {
      categoryTalks = talks.slice(0, 3);
    } else {
      categoryTalks = talks.filter((talk) => talk.category === activeCategory).slice(0, 3);
    }

    if (!hasDayToggle) return categoryTalks;

    return categoryTalks.filter((talk) => talk.speaker.day === activeDay);
  }, [activeCategory, activeDay, hasDayToggle]);

  return (
    <section className={styles.talks}>
      <div className={styles.talksTop}>
        <div>
          <p className={styles.talksTitle}>Talks across all areas of tech</p>
          <p className={styles.talksDescription}>There is something for everyone</p>
        </div>
        {hasDayToggle && (
          <div className={classNames(styles.talksDayToggle, activeDay === 2 && styles.active)}>
            <span className={styles.talksDayLine} />
            <button
              className={classNames(styles.talksDay, activeDay === 1 && styles.active)}
              onClick={() => setActiveDay(1)}
            >
              Day 1
            </button>
            <button
              className={classNames(styles.talksDay, activeDay === 2 && styles.active)}
              onClick={() => setActiveDay(2)}
            >
              Day 2
            </button>
          </div>
        )}
      </div>
      <div className={styles.talksTags}>
        {talkCategories.map((category) => (
          <p
            key={category}
            className={classNames(
              styles.talksTag,
              activeCategory === category && styles.talksTagActive,
            )}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </p>
        ))}
      </div>
      <div className={styles.talksGrid}>
        {validTalks.map((talk, index) => (
          <>
            <Talk talk={talk} key={index} />
            {index < talks.length - 1 && <hr className={styles.talksDivider} />}
          </>
        ))}
      </div>
    </section>
  );
};
