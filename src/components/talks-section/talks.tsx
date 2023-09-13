import React, { useMemo, useState } from "react";
import { PrimaryButton } from "@/components/button";
import ArrowRightDark from "@/images/arrow-right-dark-bg.svg";
import { classNames } from "@/utils/classNames";
import { HomepageTalk } from "@/components/homepage/talk/talk";
import { talks } from "@/mock-data";
import styles from "./talks.module.scss";

const talkCategories = ["All Talks", "Design", "Blockchain", "Mobile Development"] as const;

type Category = (typeof talkCategories)[number];

export const Talks = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(talkCategories[0]);

  const validTalks = useMemo(() => {
    if (activeCategory === "All Talks") {
      return talks.slice(0, 3);
    }

    return talks.filter((talk) => talk.category === activeCategory).slice(0, 3);
  }, [activeCategory]);

  return (
    <section className={styles.talks}>
      <div className={styles.talksTop}>
        <div>
          <p className={styles.talksTitle}>Talks across all areas of tech</p>
          <p className={styles.talksDescription}>There is something for everyone</p>
        </div>
        <PrimaryButton className={styles.talksCtaButton}>
          <span>View All Talks</span>
          <ArrowRightDark />
        </PrimaryButton>
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
      <div className={styles.talksTalks}>
        {validTalks.map((talk, index) => (
          <>
            <HomepageTalk talk={talk} key={index} />
            {index < talks.length - 1 && <hr className={styles.talksDivider} />}
          </>
        ))}
      </div>
    </section>
  );
};
