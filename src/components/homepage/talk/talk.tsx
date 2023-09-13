import React, { FC } from "react";
import Image from "next/image";
import styles from "./styles.module.scss";
import { Talk } from "@/types/Talk";

type Props = {
  talk: Talk;
};

export const HomepageTalk: FC<Props> = ({ talk }) => {
  return (
    <article className={styles.talk}>
      <div className={styles.portrait}>
        <Image
          src={talk.speaker.image}
          alt={talk.speaker.name}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div>
        <p className={styles.category}>{talk.category}</p>
        <p className={styles.title}>{talk.title}</p>
        <div className={styles.footer}>
          <span>{talk.speaker.name}</span>
          <span className={styles.ellipse}></span>
          <span>{talk.speaker.role}</span>
        </div>
      </div>
    </article>
  );
};