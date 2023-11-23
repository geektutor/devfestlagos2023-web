import React from "react";
import Image from "next/image";
import FAQ from "@/components/faq/FAQ";
import Memojis from "@/images/faqs/memojis.png";
import MenuDoodle from "@/images/faqs/menu-doodle.png";
import MoveDoodle from "@/images/faqs/move-doodle.png";

import Accordion from "@/components/accordion/accordion";
import { faqs, paidDevFestQuestions } from "@/data/faqs";
import CloudDoodle from "@/images/landing/doodles/cloud.png";
import LogicDoodle from "@/images/schedule/logic-doodles.png";
import TransferDoodle from "@/images/faqs/transfer-doodle.png";
import PeopleDoodle from "@/images/schedule/people-doodles.png";
import RefreshDoodle from "@/images/schedule/refresh-doodles.png";
import { NoMatterWhat } from "@/components/no-matter-what/no-matter-what";
import { SEO } from "@/components/seo";

export default function Faqs() {
  return (
    <main className='faq__page'>
      <SEO
        title='Frequently asked questions'
        description='Frequently asked questions about DevFest Lagos 2023.'
      />
      <header className='fq__header'>
        <div className='container'>
          <h1 className='fq__header__title'>
            Top questions about <br /> DevFest Lagos
            <Image
              alt='FAQs'
              quality={100}
              src='/faqs.svg'
              width={158.047}
              height={141.968}
              className='fq__header__title__svg'
            />
          </h1>
          <figure className='fq__header__menu-doodle'>
            <Image src={MenuDoodle} alt='Menu Doodle' fill quality={100} />
          </figure>
          <figure className='fq__header__move-doodle'>
            <Image src={MoveDoodle} alt='Move Doodle' fill quality={100} />
          </figure>
          <figure className='fq__header__logic-doodle'>
            <Image src={LogicDoodle} alt='Logic Doodle' fill quality={100} />
          </figure>
          <figure className='fq__header__people-doodle'>
            <Image src={PeopleDoodle} alt='People Doodle' fill quality={100} />
          </figure>
          <figure className='fq__header__transfer-doodle'>
            <Image src={TransferDoodle} alt='Transfer Doodle' fill quality={100} />
          </figure>
          <figure className='fq__header__cloud-doodle'>
            <Image src={CloudDoodle} alt='Cloud Doodle' fill quality={100} />
          </figure>
          <figure className='fq__header__refresh-doodle'>
            <Image src={RefreshDoodle} alt='Refresh Doodle' fill quality={100} />
          </figure>
        </div>
      </header>
      <div className='fq__list'>
        {faqs.map((faq) => (
          <FAQ key={faq.question} question={faq.question} answer={faq.answer} />
        ))}
      </div>
      <div className='fq__list--dark'>
        <h2 className='fq__list--dark__heading'>Why is DevFest Lagos 2023 a paid event?</h2>
        {paidDevFestQuestions.map((question) => (
          <Accordion key={question.title} title={question.title}>
            {question.children}
          </Accordion>
        ))}
      </div>
      <div className='fq__contact'>
        <Image
          alt=''
          width={250}
          height={100}
          quality={100}
          src={Memojis}
          className='fq__contact__image'
        />
        <p className='fq__contact__title'>Still have some questions?</p>
        <p className='fq__contact__text'>
          Can’t find the answer you’re looking for? Please{" "}
          <a href='mailto:contact@devfestlagos.com' className='fq__contact__text__highlight'>
            contact
          </a>{" "}
          our friendly team.
        </p>
      </div>
      <NoMatterWhat />
    </main>
  );
}
