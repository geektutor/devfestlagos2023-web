import React, { FC } from "react";
import Image from "next/image";
import styles from "./styles.module.scss";

type Props = {
  portraitUrl: string;
  category: string;
  title: string;
  name: string;
  role: string;
};

export const HomepageTalk: FC<Props> = ({ portraitUrl, category, title, name, role }) => {
  return (
    <article className={styles.talk}>
      <div className={styles.portrait}>
        <Image src={portraitUrl} alt={name} fill />
      </div>
      <div>
        <p className={styles.category}>{category}</p>
        <p className={styles.title}>{title}</p>
        <div className={styles.footer}>
          <span>{name}</span>
          <span className={styles.ellipse}></span>
          <span>{role}</span>
        </div>
      </div>
    </article>
  );
};
