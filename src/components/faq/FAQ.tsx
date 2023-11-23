import React, { useState } from "react";
import UpArrow from "@/images/up-arrow.svg";
import DownArrow from "@/images/down-arrow.svg";
import styles from "./faq.module.scss";

export interface FAQ {
  question: string;
  answer: React.ReactNode;

  index?: number;
}

export default function FAQ(props: FAQ) {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.faq}>
      <div
        onClick={() => setShow(!show)}
        className={styles.faqQuestion}
        data-animate-y='+100'
        data-delay={(props.index || 0) * 0.084 + 0.333}
        data-easing='FAQ'
      >
        <h4>{props.question}</h4>
        {show ? <UpArrow className={styles.faqSvg} /> : <DownArrow className={styles.faqSvg} />}
      </div>
      {show ? (
        <div className={styles.faqAnswer}>
          <h4>{props.answer}</h4>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
