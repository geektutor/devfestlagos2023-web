import React, { useState } from "react";
import styles from "./accordion.module.scss";
import { classNames } from "@/utils/classNames";
import { AccordionProps } from "./accordion.types";
import Arrow from "@/images/arrow-circle-down.svg";

const Accordion = ({ children, title }: AccordionProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.accordion}>
      <Arrow
        onClick={() => setShow(!show)}
        className={classNames(styles.icon, !show ? styles.hidden : "")}

      />
      <div className={styles.content}>
        <p
          onClick={() => setShow(!show)}

          className={classNames(styles.title, show ? styles.active : "")}

        >
          {title}
        </p>
        {show ? <div className={styles.children}>{children}</div> : null}
      </div>
    </div>
  );
};

export default Accordion;
