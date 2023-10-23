import React, { FC } from "react";
import Image from "next/image";
import styles from "./talk.module.scss";
import { TalkType } from "@/types/Talk";
import CategoryPill from "@/components/category-pill/category-pill";

type Props = {
  talk: TalkType;
};

const getDayText = (day: 1 | 2) => (day === 1 ? "24th Novemeber" : "25th November");

export const Talk: FC<Props> = ({ talk }) => {
  return (
    <article className={styles.talk}>
      <div className={styles.portrait}>
        <Image
          src={talk.speaker.image}
          alt={talk.speaker.name}
          fill
          style={{ objectFit: "cover" }}
          data-fade-in
          data-animate-y="+50"
          data-easing="MENU_ITEMS"
        />
      </div>
      <div>
        <div className={styles.pills} data-animate-y-children-full data-easing="MENU_ITEMS">
            <CategoryPill isSmall className={styles.category}>
              {talk.category}
            </CategoryPill>
            <CategoryPill activeBgColor='#FDE293' isActive isSmall>
              {getDayText(talk.speaker.day)}, {talk.date}
            </CategoryPill>
        </div>
        <p className={styles.title} data-animate-sentences data-easing="MENU_ITEMS">{talk.title}</p>
        <div className={styles.footer} data-animate-y-children-full data-easing="MENU_ITEMS">
          <span>{talk.speaker.name}</span>
          <span className={styles.ellipse}></span>
          <span>{talk.speaker.role}</span>
        </div>
      </div>
    </article>
  );
};
