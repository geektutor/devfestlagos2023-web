import React from "react";
import styles from "./styles.module.scss";
import scene from "@/images/landing/scene.png";
import Image from "next/image";

export const HomepageScene = () => {
  return (
    <div className={styles.scene}>
      <Image
        quality={100}
        className={styles.image}
        src={scene}
        alt='DevFest Lagos 2023'
        fill
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};
