import React from "react";
import FAQ from "@/components/faq/FAQ";
import styles from "./faq-section.module.scss";
import { faqs } from "@/data/faqs";
import ArrowRight from "@/images/arrow-right-bg-light.svg";
import { PrimaryButton } from "@/components/button";

const FaqSection = () => {
  return (
    <section className={styles.faq} data-faq-section>
      <h3 className={styles.faqTitle} data-animate-sentences data-easing='FAQ'>
        Let us answer some of your burning questions
      </h3>
      <p className={styles.faqSubtext} data-animate-sentences data-delay={0.167} data-easing='FAQ'>
        Check out our most asked questions here, mfjpm 😑🤚🏾
      </p>
      <div className={styles.faqQuestions}>
        {faqs.slice(0, 3).map((faq) => (
          <FAQ key={faq.question} question={faq.question} answer={faq.answer} />
        ))}
      </div>
      <PrimaryButton href='/faq' data-animate-button data-delay='.1173'>
        <span>View All FAQ</span>
        <ArrowRight />
      </PrimaryButton>
    </section>
  );
};

export default FaqSection;
