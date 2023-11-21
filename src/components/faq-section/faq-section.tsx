import React from "react";
import FAQ from "@/components/faq/FAQ";
import styles from "./faq-section.module.scss";
import { faqs } from "@/data/faqs";

const FaqSection = () => {
  return (
    <section className={styles.faq} data-faq-section>
      <h3 className={styles.faqTitle} data-animate-sentences data-easing='FAQ'>
        Lets answer some of your burning questions
      </h3>
      <p className={styles.faqSubtext} data-animate-sentences data-delay={0.167} data-easing='FAQ'>
        Check out our most asked questions here, mfjpm 😑🤚🏾
      </p>
      <div className={styles.faqQuestions}>
        {faqs.map((faq) => (
          <FAQ key={faq.question} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
