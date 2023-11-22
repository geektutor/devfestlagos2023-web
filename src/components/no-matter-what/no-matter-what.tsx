import React from "react";
import styles from "./no-matter-what.module.scss";
import InviteLogo from "@/images/landing/logo.svg";
import { TertiaryButton } from "@/components/button";
import { ticketsUrl } from "@/utils/urls";

export const NoMatterWhat = () => {
  return (
    <section className={styles.noMatterWhat} data-nmw>
      <h4
        className={styles.title}
        data-animate-sentences
        data-stagger={0.1}
        data-easing='NO_MATTER_WHAT'
      >
        We are looking forward to hosting you again at
      </h4>
      <figure className={styles.logo}>
        <InviteLogo data-animate-y-full data-easing='NO_MATTER_WHAT' data-delay='.167' />
      </figure>
      <p
        className={styles.question}
        data-animate-y-full
        data-add-span
        data-easing='NO_MATTER_WHAT'
        data-delay='.250'
      >
        Will you be there?
      </p>
      <TertiaryButton
        className={styles.button}
        href={ticketsUrl}
        isExternal
        data-animate-button
        data-delay='.7'
      >
        I will be there no matter what
      </TertiaryButton>
    </section>
  );
};
