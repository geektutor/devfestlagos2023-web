import React from "react";
import styles from "./no-matter-what.module.scss";
import InviteLogo from "@/images/landing/logo.svg";
import { TertiaryButton } from "@/components/button";

export const NoMatterWhat = () => {
  return (
    <section className={styles.noMatterWhat} data-nmw>
      <h4 className={styles.title} data-animate-sentences data-stagger={0.1}>
        We are looking forward to hosting you again at
      </h4>
      <figure className={styles.logo}>
        <InviteLogo data-animate-y-full />
      </figure>
      <p className={styles.question} data-animate-y-full data-add-span>
        Will you be there?
      </p>
      <TertiaryButton className={styles.button} data-animate-button>
        I will be there no matter what
      </TertiaryButton>
    </section>
  );
};
