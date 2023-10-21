import React from "react";
import styles from "./no-matter-what.module.scss";
import InviteLogo from "@/images/landing/logo.svg";
import { TertiaryButton } from "@/components/button";

export const NoMatterWhat = () => {
  return (
    <section className={styles.noMatterWhat}>
      <h4 className={styles.title} data-nmw-title>
        We are looking forward to hosting you again at
      </h4>
      <figure className={styles.logo}>
        <InviteLogo data-nmw-logo />
      </figure>
      <p className={styles.question} data-nmw-question>
        Will you be there?
      </p>
      <TertiaryButton className={styles.button} data-nmw-button>
        I will be there no matter what
      </TertiaryButton>
    </section>
  );
};
