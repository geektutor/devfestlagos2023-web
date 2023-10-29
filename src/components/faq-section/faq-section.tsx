import React from "react";
import FAQ from "@/components/faq/FAQ";
import styles from "./faq-section.module.scss";

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
        {Array.from({ length: 4 }).map((_, index) => (
          <FAQ
            question='How can we get TSticks to do giveaway by morning?'
            answer='Threaten him ez'
            key={index}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
