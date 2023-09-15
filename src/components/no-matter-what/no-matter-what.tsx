import React from "react";
import styles from "./no-matter-what.module.scss";
import InviteLogo from "@/images/landing/logo.svg";
import { TertiaryButton } from "@/components/button";

export const NoMatterWhat = () => {
  return (
    <section className={styles.noMatterWhat}>
      <h4 className={styles.title}>We are looking forward to hosting you again at</h4>
      <InviteLogo className={styles.logo} />
      <p className={styles.question}>Will you be there?</p>
      <TertiaryButton className={styles.button}>I will be there no matter what</TertiaryButton>
    </section>
  );
};
