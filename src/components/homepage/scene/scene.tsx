import React from "react";
import styles from "./styles.module.scss";
import scene from "@/images/landing/scene.png";
import Image from "next/image";
import kiteDoodle from "@/images/landing/doodles/kite-left.png";
import kiteRightDoodle from "@/images/landing/doodles/kite-right.png";
import arrowDoodle from "@/images/landing/doodles/arrow.png";
import rewindDoodle from "@/images/landing/doodles/repeat.png";

export const HomepageScene = () => {
  return (
    <div className={styles.sceneWrapper}>
      <div className={styles.scene}>
        <Image
          quality={100}
          className={styles.image}
          src={scene}
          alt='DevFest Lagos 2023'
          fill
          style={{ objectFit: "cover" }}
          data-fade-in
        />
      </div>
      <div className={styles.kiteLeft} data-landing-doodle>
        <Image src={kiteDoodle} alt='doodle' />
      </div>
      <div className={styles.kiteRight} data-landing-doodle>
        <Image src={kiteRightDoodle} alt='doodle' />
      </div>
      <div className={styles.rewind} data-landing-doodle>
        <Image src={rewindDoodle} alt='doodle' />
      </div>
      <div className={styles.arrow} data-landing-doodle>
        <Image src={arrowDoodle} alt='doodle' />
      </div>
    </div>
  );
};
